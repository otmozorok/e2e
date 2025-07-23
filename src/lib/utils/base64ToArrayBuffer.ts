import { stringToArrayBuffer } from './stringToArrayBuffer';

export function base64ToArrayBuffer(base64: string) {
	return stringToArrayBuffer(atob(base64));
}
