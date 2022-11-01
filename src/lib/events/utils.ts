export function delay(ms: number) {
  new Promise((res) => setTimeout(res, ms));
}
