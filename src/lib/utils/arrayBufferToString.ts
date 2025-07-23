export function arrayBufferToString(buffer: ArrayBuffer) {
	return String.fromCharCode.apply(null, new Uint8Array(buffer) as unknown as number[]);
}
