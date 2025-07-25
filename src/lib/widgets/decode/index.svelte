<script lang="ts">
	import { Article, Button, Textarea } from '$lib';
	import i18n from '$lib/locales';
	import { base64ToArrayBuffer, validateEncodeText } from '$lib/utils';
	import { useStoreon } from '$store';
	import { onMount } from 'svelte';

	let { keyPair } = useStoreon('keyPair');

	let value = $state('');

	async function onDecode() {
		if (!$keyPair || !value) return;
		try {
			// Конвертация из Base64
			const encryptedData = base64ToArrayBuffer(value.trim());

			const decrypted = await crypto.subtle.decrypt(
				{ name: 'RSA-OAEP' },
				$keyPair.privateKey,
				encryptedData
			);

			const decoder = new TextDecoder();
			const decryptedText = decoder.decode(decrypted);

			value = decryptedText;
		} catch (error) {}
	}

	onMount(() => {
		navigator.clipboard.readText().then((res) => validateEncodeText(res) && (value = res));
	});
</script>

<div class="grid grid-rows-[auto_max-content] gap-10">
	<Textarea bind:value placeholder="Текст для расшифровки" class="max-h-80" />
	<Article
		title="Расшифровка вашим приватным ключем"
		description="Вставьте зашифрованный текст в поле сверху"
	/>
</div>
<div class="grid auto-cols-fr grid-flow-col gap-4">
	<Button onclick={onDecode}>
		{i18n.t('common.decode')}
	</Button>
</div>
