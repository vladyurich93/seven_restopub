import { NextResponse } from "next/server";
import { getSevenAssistantContext } from "@/lib/sevenData";

const OPENAI_RESPONSES_URL = "https://api.openai.com/v1/responses";
const ASSISTANT_MODEL = process.env.OPENAI_ASSISTANT_MODEL || "gpt-5.5-mini";

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
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error: "OpenAI key is not configured.",
          reply: "Помічник Seven зараз недоступний. Спробуйте, будь ласка, трохи пізніше.",
        },
        { status: 503 },
      );
    }

    const body = (await request.json()) as AssistantRequest;
    const messages = sanitizeMessages(body.messages);
    const directMessage = typeof body.message === "string" ? body.message.trim() : "";
    const conversation = directMessage ? [...messages, { role: "user" as const, content: directMessage }] : messages;

    if (!conversation.length || conversation[conversation.length - 1]?.role !== "user") {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    const instructions = [
      "Ти компактний AI-помічник сайту Seven Restopub.",
      "Відповідай українською, коротко, дружньо і корисно.",
      "Відповідай тільки про Seven Restopub: локації, адреси, години роботи, меню, крафтове пиво, кальян, банкети, дитячу кімнату, події, вакансії, HR-анкету, контакти, Instagram/TikTok, бронювання, дзвінки та маршрути.",
      "Якщо питання не стосується Seven Restopub, відповідай тільки: Я допомагаю тільки з питаннями про Seven Restopub.",
      "Використовуй тільки дані з контексту нижче. Не вигадуй ціни, акції, деталі меню або умови.",
      "Якщо точної інформації немає, скажи: Точної інформації зараз немає, краще уточнити у закладі.",
      "Не приймай платежі, не збирай чутливі персональні дані.",
      "Для бронювання столу, банкету або гри направляй гостя телефонувати у вибрану локацію.",
      `Дані Seven Restopub:\n${getSevenAssistantContext()}`,
    ].join("\n\n");

    const response = await fetch(OPENAI_RESPONSES_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: ASSISTANT_MODEL,
        instructions,
        input: buildTranscript(conversation),
        max_output_tokens: 360,
      }),
    });

    const payload = (await response.json()) as OpenAIResponsesPayload;

    if (!response.ok) {
      console.error("Seven assistant OpenAI error:", payload);
      return NextResponse.json(
        {
          error: payload.error?.message || "OpenAI request failed.",
          reply: "Помічник Seven зараз не відповідає. Спробуйте, будь ласка, ще раз або зателефонуйте у потрібний заклад.",
        },
        { status: response.status },
      );
    }

    return NextResponse.json({ reply: extractReply(payload) });
  } catch (error) {
    console.error("Seven assistant route error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown assistant error.",
        reply: "Помічник Seven зараз недоступний. Спробуйте, будь ласка, трохи пізніше.",
      },
      { status: 500 },
    );
  }
}
