import { arrayBufferToString } from './arrayBufferToString';

export async function exportKey(key: CryptoKey, format: Exclude<KeyFormat, 'jwk'>) {
	const exported = await crypto.subtle.exportKey(format, key);
	const exportedAsString = arrayBufferToString(exported);
	const exportedAsBase64 = btoa(exportedAsString);

	let pemHeader, pemFooter;

	if (format === 'spki') {
		pemHeader = '-----BEGIN PUBLIC KEY-----\n';
		pemFooter = '-----END PUBLIC KEY-----';
	} else {
		pemHeader = '-----BEGIN PRIVATE KEY-----\n';
		pemFooter = '-----END PRIVATE KEY-----';
	}

	return pemHeader + exportedAsBase64.match(/.{1,64}/g)?.join('\n') + '\n' + pemFooter;
}
