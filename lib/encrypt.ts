// ============================================================
// 《今天谁干嘛》 - URL 数据编码/解码
// Base64 就是我们的"加密"，防君子不防小人 😎
// ============================================================

import type { SharePayload } from "./types";
import { SHARE_VERSION } from "./constants";

/**
 * 将 SharePayload 编码为 Base64 URL 安全字符串
 */
export function encodeShareData(payload: SharePayload): string {
  try {
    const json = JSON.stringify(payload);
    // 使用 btoa + encodeURIComponent 处理中文
    const base64 = btoa(encodeURIComponent(json).replace(/%([0-9A-F]{2})/g, (_match, p1) =>
      String.fromCharCode(parseInt(p1, 16))
    ));
    // 转为 URL-safe base64
    return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  } catch (e) {
    console.error("❌ 编码失败:", e);
    return "";
  }
}

/**
 * 从 Base64 URL 安全字符串解码为 SharePayload
 */
export function decodeShareData(encoded: string): SharePayload | null {
  try {
    // 还原标准 base64
    let base64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
    // 补齐 padding
    while (base64.length % 4) base64 += "=";
    // 解码
    const json = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    const parsed = JSON.parse(json) as SharePayload;
    // 校验版本
    if (parsed.v !== SHARE_VERSION) {
      console.warn("⚠️ 分享数据版本不匹配，但尽力解析");
    }
    if (!parsed.type) return null;
    return parsed;
  } catch (e) {
    console.error("❌ 解码失败:", e);
    return null;
  }
}

/**
 * 生成完整的分享链接
 */
export function generateShareUrl(payload: SharePayload): string {
  const encoded = encodeShareData(payload);
  if (!encoded) return "";
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  return `${origin}/game?data=${encoded}`;
}
