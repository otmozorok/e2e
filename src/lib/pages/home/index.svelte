<script lang="ts">
	import {
		DecodeWidget,
		EncodeWidget,
		FlagWidget,
		FolderWidget,
		KeysWidget,
		ProfileWidget,
		StatusWidget
	} from '$lib';
	import { fly } from 'svelte/transition';
	import { useStoreon } from '$store';
	import { SceneEvent } from '$store/scene';

	let { scene, folder, dispatch } = useStoreon('scene', 'folder');

	/** @todo Удалить */
	$effect(() => {
		document.addEventListener('keydown', (e) => {
			e.key === 'Escape' && dispatch(SceneEvent.ChangeScene, null);
		});
	});

	// @todo #1a1a1a цвет сверху при открытие, при ошибке #160403
	$effect(() => {
		const main = '#4d4d4d';
		const secondary = '#1a1a1a';
		const negative = '#160403';
		const meta = document.head.querySelector('meta[name="theme-color"]');

		if ($scene === null) {
			meta?.setAttribute('content', main);
		} else {
			meta?.setAttribute('content', secondary);
		}
	});
</script>

<main class="grid grid-rows-[max-content_auto] overflow-hidden">
	<StatusWidget />

	{#key $scene}
		<div class="grid h-full grid-rows-[auto_max-content] gap-4 p-6 pt-8" in:fly={{ y: 200 }}>
			{#if $scene === 'folder'}
				<FolderWidget />
			{/if}
			{#if $scene === 'keys'}
				<KeysWidget />
			{/if}
			{#if $scene === 'profile'}
				<ProfileWidget />
			{/if}
			{#if $scene === 'decode'}
				<DecodeWidget />
			{/if}
			{#if $scene === 'encode'}
				<EncodeWidget />
			{/if}
		</div>
	{/key}
</main>
<FlagWidget />
