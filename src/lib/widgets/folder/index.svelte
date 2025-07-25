<script lang="ts">
	import { Article, Button, Lottie } from '$lib';
	import { showDirectoryPicker } from 'file-system-access';
	import i18n from '$lib/locales';
	import { useStoreon } from '$store';
	import { FolderEvent } from '$store/folder';
	import folderSticker from '$lib/stickers/folder.json';
	import { SceneEvent } from '$store/scene';

	let { dispatch } = useStoreon();

	let isLoaded = $state(false);

	async function onOpenDir() {
		const openDir = await showDirectoryPicker();

		dispatch(FolderEvent.SetFolder, openDir);
		dispatch(SceneEvent.ChangeScene, 'keys');
	}
</script>

<div class="grid place-items-center">
	<Lottie data={folderSticker} size={280}></Lottie>
	<Article title={i18n.t('folder.title')} description={i18n.t('folder.description')} />
</div>

<div class="grid auto-cols-fr grid-flow-col gap-4">
	<Button onclick={onOpenDir} loading={isLoaded}>
		{i18n.t('common.folderperm')}
	</Button>
</div>
