<script lang="ts">
	import { Article, Button, Lottie } from '$lib';
	import { exportKey, importKey, readFile, saveFile } from '$lib/utils';
	import { useStoreon } from '$store';
	import i18n from '$lib/locales';
	import { SceneEvent } from '$store/scene';
	import fireSticker from '$lib/stickers/fire.json';
	import { PublicKeyEvent } from '$store/publicKey';
	import { KeyPairEvent } from '$store/keyPair';

	let { folder, dispatch } = useStoreon('folder');

	let isLoaded = $state(false);
	let isGenerated = $state(false);

	async function onLoadkeys() {
		if (!$folder) return;
		try {
			isLoaded = true;
			const publicKeyContent = await readFile('publicKey.pem', $folder);
			const privateKeyContent = await readFile('privateKey.pem', $folder);

			const newKeyPair = {
				publicKey: await importKey(publicKeyContent, 'spki', ['encrypt']),
				privateKey: await importKey(privateKeyContent, 'pkcs8', ['decrypt'])
			};

			dispatch(PublicKeyEvent.SetPublicKey, publicKeyContent);
			dispatch(KeyPairEvent.SetKeyPair, newKeyPair);
			dispatch(SceneEvent.ChangeScene, 'profile');
		} catch (error) {
		} finally {
			isLoaded = false;
		}
	}

	async function onKeysGenerate() {
		if (!$folder) return;
		try {
			isGenerated = true;
			const newKeyPair = await crypto.subtle.generateKey(
				{
					name: 'RSA-OAEP',
					modulusLength: 2048,
					publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
					hash: 'SHA-256'
				},
				true,
				['encrypt', 'decrypt']
			);

			const exportedPublic = await exportKey(newKeyPair.publicKey, 'spki');
			const exportedPrivate = await exportKey(newKeyPair.privateKey, 'pkcs8');

			dispatch(PublicKeyEvent.SetPublicKey, exportedPublic);
			dispatch(KeyPairEvent.SetKeyPair, newKeyPair);
			dispatch(SceneEvent.ChangeScene, 'profile');

			await saveFile('publicKey.pem', exportedPublic, $folder);
			await saveFile('privateKey.pem', exportedPrivate, $folder);
		} catch (error) {
		} finally {
			isGenerated = false;
		}
	}
</script>

<div class="grid place-items-center">
	<Lottie data={fireSticker} size={280}></Lottie>
	<Article title={i18n.t('keys.title')} description={i18n.t('keys.description')} />
</div>
<div class="grid auto-cols-fr grid-flow-col gap-4">
	<Button onclick={onLoadkeys} loading={isLoaded}>
		{i18n.t('common.loadkeys')}
	</Button>
	<Button onclick={onKeysGenerate} loading={isGenerated}>
		{i18n.t('common.generatkeys')}
	</Button>
</div>
