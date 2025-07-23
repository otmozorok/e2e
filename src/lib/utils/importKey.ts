import { base64ToArrayBuffer } from './base64ToArrayBuffer';

export async function importKey(
	pem: string,
	format: Exclude<KeyFormat, 'jwk'>,
	keyUsages: Iterable<KeyUsage>
) {
	const headerFooterRegex = /-----(BEGIN|END) (PUBLIC|PRIVATE) KEY-----/g;
	const keyBase64 = pem.replace(headerFooterRegex, '').replace(/\s/g, '');
	const keyBuffer = base64ToArrayBuffer(keyBase64);

	return await crypto.subtle.importKey(
		format,
		keyBuffer,
		{ name: 'RSA-OAEP', hash: 'SHA-256' },
		true,
		keyUsages
	);
}
