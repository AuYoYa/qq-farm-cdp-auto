export function formatClock(dateLike) {
  const date = dateLike ? new Date(dateLike) : new Date();
  if (Number.isNaN(date.getTime())) return String(dateLike || "");
  const time = date.toLocaleTimeString("zh-CN", { hour12: false });
  const ms = String(date.getMilliseconds()).padStart(3, "0");
  return time + "." + ms;
}

export function formatDateTime(dateLike) {
  if (!dateLike) return "";
  const date = new Date(dateLike);
  if (Number.isNaN(date.getTime())) return String(dateLike);
  return date.toLocaleString("zh-CN", { hour12: false });
}

export function formatRuntimeTargetLabel(target) {
  if (target === "qq_ws") return "QQ WS";
  if (target === "cdp") return "微信 CDP";
  if (target === "auto") return "自动选择";
  return target ? String(target) : "未知";
}

export function getGatewayState(payload) {
  return payload && payload.gateway && typeof payload.gateway === "object" ? payload.gateway : {};
}

export function getConfiguredRuntimeTarget(payload) {
  const gateway = getGatewayState(payload);
  return gateway.runtimeTarget || "unknown";
}

export function getResolvedRuntimeTarget(payload) {
  const gateway = getGatewayState(payload);
  return gateway.resolvedRuntimeTarget || getConfiguredRuntimeTarget(payload);
}

export function isQqRuntimeResolved(payload) {
  return getResolvedRuntimeTarget(payload) === "qq_ws";
}

export function isPreviewSupported(payload) {
  return getConfiguredRuntimeTarget(payload) !== "qq_ws";
}

export function getQqBundleState(payload) {
  return payload && payload.qqBundle && typeof payload.qqBundle === "object" ? payload.qqBundle : null;
}

export function normalizeText(value) {
  return String(value == null ? "" : value).trim();
}

export function isQqAppId(value) {
  return /^\d+$/.test(String(value || ""));
}

export function shortenMiddle(text, head, tail) {
  const value = String(text || "");
  if (!value) return "";
  const keepHead = head == null ? 34 : head;
  const keepTail = tail == null ? 42 : tail;
  if (value.length <= keepHead + keepTail + 5) return value;
  return value.slice(0, keepHead) + " ... " + value.slice(-keepTail);
}

export function setDotState(el, state) {
  if (!el) return;
  el.className = "dot" + (state ? " " + state : "");
}

export function clamp(num, min, max) {
  return Math.min(max, Math.max(min, num));
}
