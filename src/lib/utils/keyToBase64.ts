export function keyToBase64(key: string) {
  const base64 = key.replace(/-{5}[^-]+-{5}/g, '').replace(/\s/g, '');
  return base64;
}