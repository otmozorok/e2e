<script lang="ts">
	import { Button, Lottie } from '$lib';
	import i18n from '$lib/locales';
	import { useStoreon } from '$store';
	import { FolderEvent } from '$store/folder';
	import folderSticker from '$lib/stickers/folder.json';
	import { SceneEvent } from '$store/scene';

	let { dispatch } = useStoreon();

	let isLoaded = $state(false);

	async function onOpenDir() {
		const openDir = await window.showDirectoryPicker({
			id: 'cryptoKeysFolder',
			startIn: 'documents',
			mode: 'readwrite'
		});

		dispatch(FolderEvent.SetFolder, openDir);
		dispatch(SceneEvent.ChangeScene, 'keys');
	}
</script>

<div class="grid place-items-center">
	<Lottie data={folderSticker} size={200}></Lottie>
	<div class="grid place-items-center gap-6">
		<h3 class="text-center text-2xl leading-none">Нужно подключить папку для ключей</h3>
		<p class="text-center leading-normal">
			Предоставьте приложению доступ к папке с ключами или к той где вы хотите их создать
		</p>
	</div>
</div>

<div class="grid auto-cols-fr grid-flow-col gap-4">
	<Button onclick={onOpenDir} loading={isLoaded}>
		{i18n.t('common.folderperm')}
	</Button>
</div>
