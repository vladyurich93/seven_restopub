import { GoogleAnalytics } from "@next/third-parties/google";

const analyticsConfig = {
  googleAnalyticsId: "G-B89HZRMLG5",
  googleTagManagerId: "",
};

export function Analytics() {
  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  return (
    <>
      <GoogleAnalytics gaId={analyticsConfig.googleAnalyticsId} />
      {analyticsConfig.googleTagManagerId ? null : null}
    </>
  );
}
