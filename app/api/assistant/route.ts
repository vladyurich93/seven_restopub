import { NextResponse } from "next/server";
import { sevenKnowledgeBase } from "@/lib/sevenData";

const OPENAI_RESPONSES_URL = "https://api.openai.com/v1/responses";
const DEFAULT_ASSISTANT_MODEL = "gpt-5-mini";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type AssistantRequest = {
  messages?: ChatMessage[];
  message?: string;
};

type OpenAIResponsesPayload = {
  output_text?: string;
  output?: Array<{
    content?: Array<{
      text?: string;
    }>;
  }>;
  error?: {
    message?: string;
  };
};

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

function logStep(step: string, details?: Record<string, unknown>) {
  console.log(`[Seven assistant] ${step}`, details ?? {});
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  return "Unknown assistant route error.";
}

function parseJsonSafely(text: string): JsonValue | null {
  try {
    return JSON.parse(text) as JsonValue;
  } catch {
    return null;
  }
}

function sanitizeMessages(messages: ChatMessage[] = []) {
  return messages
    .filter((message) => (message.role === "user" || message.role === "assistant") && typeof message.content === "string")
    .slice(-10)
    .map((message) => ({
      role: message.role,
      content: message.content.slice(0, 1200),
    }));
}

function buildTranscript(messages: ChatMessage[]) {
  return messages
    .map((message) => `${message.role === "assistant" ? "Асистент" : "Гість"}: ${message.content}`)
    .join("\n");
}

function extractReply(payload: OpenAIResponsesPayload) {
  if (payload.output_text) {
    return payload.output_text.trim();
  }

  const text = payload.output
    ?.flatMap((item) => item.content ?? [])
    .map((content) => content.text)
    .filter(Boolean)
    .join("\n")
    .trim();

  return text || "Точної інформації зараз немає, краще уточнити у закладі.";
}

export async function POST(request: Request) {
  logStep("POST invoked");

  try {
    logStep("Reading environment");
    const apiKey = process.env.OPENAI_API_KEY;
    const model = process.env.OPENAI_ASSISTANT_MODEL || DEFAULT_ASSISTANT_MODEL;

    logStep("Environment status", {
      openaiApiKeyExists: Boolean(apiKey),
      openaiApiKeyLength: apiKey?.length ?? 0,
      assistantModel: model,
    });

    if (!apiKey) {
      const errorMessage = "OPENAI_API_KEY is missing at runtime. Check Vercel Environment Variables for the active deployment and redeploy.";
      console.error("[Seven assistant] Missing OPENAI_API_KEY");

      return NextResponse.json(
        {
          error: errorMessage,
          reply: "Помічник Seven зараз недоступний. Спробуйте, будь ласка, трохи пізніше.",
        },
        { status: 500 },
      );
    }

    logStep("Parsing request body");
    const body = (await request.json()) as AssistantRequest;
    logStep("Request body parsed", {
      hasMessages: Array.isArray(body.messages),
      messagesCount: Array.isArray(body.messages) ? body.messages.length : 0,
      hasDirectMessage: typeof body.message === "string" && body.message.trim().length > 0,
    });

    logStep("Sanitizing messages");
    const messages = sanitizeMessages(body.messages);
    const directMessage = typeof body.message === "string" ? body.message.trim() : "";
    const conversation = directMessage ? [...messages, { role: "user" as const, content: directMessage }] : messages;
    logStep("Conversation prepared", {
      messagesCount: conversation.length,
      lastRole: conversation[conversation.length - 1]?.role,
    });

    if (!conversation.length || conversation[conversation.length - 1]?.role !== "user") {
      console.error("[Seven assistant] Invalid request: last message is not user");
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    const knowledgeBaseText = JSON.stringify(sevenKnowledgeBase, null, 2);
    const knowledgeSections = Object.keys(sevenKnowledgeBase);

    logStep("Complete knowledge base selected", {
      sections: knowledgeSections,
      contextLength: knowledgeBaseText.length,
    });

    logStep("Building instructions");
    const instructions = [
      "Ти компактний AI-помічник сайту Seven Restopub.",
      "Відповідай українською, коротко, дружньо і корисно.",
      "Відповідай тільки про Seven Restopub: локації, адреси, години роботи, меню, крафтове пиво, кальян, банкети, дитячу кімнату, події, вакансії, HR-анкету, контакти, Instagram/TikTok, бронювання, дзвінки та маршрути.",
      "Якщо питання не стосується Seven Restopub, відповідай тільки: Я допомагаю тільки з питаннями про Seven Restopub.",
      "Використовуй тільки structured knowledge base нижче. Не вигадуй ціни, акції, деталі меню або умови.",
      "Якщо відповідь існує в knowledge base, НІКОЛИ не відповідай: Точної інформації зараз немає.",
      "Якщо інформація є в розділах company, locations, menu, banquets, children, hookah, faq, contacts, events або vacancies — відповідай впевнено і конкретно.",
      "Якщо бракує лише конкретної ціни, дати або позиції меню, скажи що точної інформації немає тільки для цієї деталі, але все одно дай корисну відповідь з наявних даних.",
      "Фразу Точної інформації зараз немає, краще уточнити у закладі використовуй тільки якщо запитувана інформація відсутня в knowledge base.",
      "Не приймай платежі, не збирай чутливі персональні дані.",
      "Завжди пропонуй корисну наступну дію: зателефонувати у вибрану локацію, відкрити меню, заповнити HR-форму, написати HR або обрати локацію.",
      "Для бронювання столу, банкету або гри направляй гостя телефонувати у вибрану локацію.",
      "Говори українською за замовчуванням. Відповіді мають бути короткі й практичні.",
      `Complete Seven knowledge base sections: ${knowledgeSections.join(", ")}`,
      `Complete Seven knowledge base:\n${knowledgeBaseText}`,
    ].join("\n\n");

    const transcript = buildTranscript(conversation);
    const openAiBody = {
      model,
      instructions,
      input: transcript,
      max_output_tokens: 360,
    };

    logStep("Calling OpenAI Responses API", {
      url: OPENAI_RESPONSES_URL,
      model,
      transcriptLength: transcript.length,
      instructionsLength: instructions.length,
    });

    const response = await fetch(OPENAI_RESPONSES_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(openAiBody),
    });

    logStep("OpenAI response received", {
      status: response.status,
      ok: response.ok,
      contentType: response.headers.get("content-type"),
    });

    const responseBody = await response.text();
    const parsedResponse = parseJsonSafely(responseBody);

    if (!response.ok) {
      console.error("[Seven assistant] OpenAI non-OK response", {
        endpoint: OPENAI_RESPONSES_URL,
        model,
        status: response.status,
        body: responseBody,
      });

      if (parsedResponse) {
        return NextResponse.json(parsedResponse, { status: response.status });
      }

      return NextResponse.json(
        {
          error: {
            message: responseBody || `OpenAI request failed with status ${response.status}`,
          },
        },
        { status: response.status },
      );
    }

    if (!parsedResponse) {
      console.error("[Seven assistant] OpenAI returned non-JSON success response", {
        endpoint: OPENAI_RESPONSES_URL,
        model,
        status: response.status,
        body: responseBody,
      });

      return NextResponse.json(
        {
          error: {
            message: "OpenAI returned a non-JSON response.",
            body: responseBody,
          },
        },
        { status: 502 },
      );
    }

    const payload = parsedResponse as OpenAIResponsesPayload;
    logStep("OpenAI response parsed", {
      hasOutputText: Boolean(payload.output_text),
      outputItems: payload.output?.length ?? 0,
      errorMessage: payload.error?.message,
    });

    const reply = extractReply(payload);
    logStep("Reply extracted", { replyLength: reply.length });

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Seven assistant route error:", error);
    const errorMessage = getErrorMessage(error);

    return NextResponse.json(
      {
        error: errorMessage,
        reply: "Помічник Seven зараз недоступний. Спробуйте, будь ласка, трохи пізніше.",
      },
      { status: 500 },
    );
  }
}
