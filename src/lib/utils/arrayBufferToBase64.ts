import { arrayBufferToString } from './arrayBufferToString';

export function arrayBufferToBase64(buffer: ArrayBuffer) {
	return btoa(arrayBufferToString(buffer));
}
