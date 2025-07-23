export function stringToArrayBuffer(str: string) {
	const buffer = new ArrayBuffer(str.length);
	const bufferView = new Uint8Array(buffer);
	for (let i = 0; i < str.length; i++) {
		bufferView[i] = str.charCodeAt(i);
	}
	return buffer;
}
