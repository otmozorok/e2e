<script lang="ts">
	import { Article, Button, Textarea } from '$lib';
	import i18n from '$lib/locales';
	import { arrayBufferToBase64, importKey, validatePublicKey } from '$lib/utils';
	import { onMount } from 'svelte';

	let value = $state('');
	let otherPublickKey = $state<CryptoKey | null>(null);

	async function saveKey() {
		if (validatePublicKey(value)) {
			otherPublickKey = await importKey(value, 'spki', ['encrypt']);
			value = '';
		}
	}

	async function onEncode() {
		if (!otherPublickKey || !value) return;
		try {
			const encoder = new TextEncoder();
			const data = encoder.encode(value);

			const encrypted = await crypto.subtle.encrypt({ name: 'RSA-OAEP' }, otherPublickKey, data);

			const base64String = arrayBufferToBase64(encrypted);

			value = base64String;
		} catch (error) {}
	}

	onMount(() => {
		navigator.clipboard.readText().then((res) => validatePublicKey(res) && (value = res));
	});
</script>

<div class="grid grid-rows-[auto_max-content] gap-10">
	<Textarea
		bind:value
		placeholder={otherPublickKey ? 'Текст для шифрования' : 'Введите публичный ключ'}
		class="max-h-80"
	/>

	<Article
		title={otherPublickKey ? 'Шифрование текста' : 'Загрузка ключа'}
		description={otherPublickKey
			? 'Вставьте текст в поле выше для шифрования'
			: 'Вставьте публичный ключ получателя в поле выше'}
	/>
</div>
<div class="grid auto-cols-fr grid-flow-col gap-4">
	{#if otherPublickKey}
		<Button onclick={onEncode}>
			{i18n.t('common.encode')}
		</Button>
	{:else}
		<Button onclick={saveKey}>
			{i18n.t('common.save')}
		</Button>
	{/if}
</div>
