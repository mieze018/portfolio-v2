import type { IncomingMessage } from "http";

export const getUserAgent = (req?: IncomingMessage) => {
  if (!req) return null;
  const userAgentStr = req.headers["user-agent"] || "";
  const userAgent = /Android/.test(userAgentStr)
    ? "Android"
    : /(iPhone|iPad|iPad)/.test(userAgentStr)
      ? "iOS"
      : userAgentStr;
  return userAgent
}
