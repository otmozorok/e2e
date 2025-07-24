export function validatePublicKey(pemContent: string) {
	// Проверка наличия обязательных заголовков
	const BEGIN_MARKER = '-----BEGIN PUBLIC KEY-----';
	const END_MARKER = '-----END PUBLIC KEY-----';

	if (!pemContent.includes(BEGIN_MARKER) || !pemContent.includes(END_MARKER)) {
		return false;
	}

	// Извлечение base64-данных
	const base64Data = pemContent.split(BEGIN_MARKER)[1].split(END_MARKER)[0].replace(/\s+/g, ''); // Удаление пробелов и переносов

	// Проверка длины base64 (должна быть кратна 4)
	if (base64Data.length === 0 || base64Data.length % 4 !== 0) {
		return false;
	}

	// Проверка валидности base64
	if (!/^[A-Za-z0-9+/]+={0,2}$/.test(base64Data)) {
		return false;
	}

	try {
		// Декодирование из base64 в бинарный формат
		const binaryData = atob(base64Data);
		const bytes = new Uint8Array(binaryData.length);

		for (let i = 0; i < binaryData.length; i++) {
			bytes[i] = binaryData.charCodeAt(i);
		}

		// Проверка формата DER (должен начинаться с 0x30)
		if (bytes[0] !== 0x30) {
			return false;
		}

		// Проверка длины данных (второй байт указывает длину)
		const length = bytes[1];
		if (length > 127) {
			// Длинная форма (первый байт длины содержит флаг)
			const lengthBytes = length & 0x7f;
			if (lengthBytes > 4 || 2 + lengthBytes >= bytes.length) {
				return false;
			}
		}

		return true;
	} catch {
		return false; // Ошибка декодирования base64
	}
}
