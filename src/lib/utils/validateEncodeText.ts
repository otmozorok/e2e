import { base64ToArrayBuffer } from './base64ToArrayBuffer';

export function validateEncodeText(key: string) {
	if (!key) return false;
	try {
		base64ToArrayBuffer(key.trim());

		return true;
	} catch {
		return false;
	}
}
