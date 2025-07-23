<script lang="ts">
	import { FolderFilled, FolderOutline, KeysFilled, KeysOutline } from '$lib';
	import { useStoreon } from '$store';
	import { SceneEvent } from '$store/scene';

	let { folder, keyPair, dispatch } = useStoreon('folder', 'keyPair');

	function openFolder() {
		dispatch(SceneEvent.ChangeScene, 'folder');
	}
</script>

<header class="z-50 grid h-10 place-items-center">
	<div class="flex gap-4" onclick={!$folder ? openFolder : undefined}>
		{#if $folder}
			<span><FolderFilled class="size-6 text-green-500" /></span>
		{:else}
			<span><FolderOutline class="size-6 cursor-pointer" /></span>
		{/if}

		{#if $keyPair}
			<span><KeysFilled class="size-6 text-green-500" /></span>
		{:else}
			<span><KeysOutline class="size-6 cursor-pointer" /></span>
		{/if}
	</div>
</header>
