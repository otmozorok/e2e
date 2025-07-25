<script lang="ts">
	import { ClipboardCheck, FolderFilled, FolderOutline, KeysFilled, KeysOutline } from '$lib';
	import { useStoreon } from '$store';
	import { SceneEvent } from '$store/scene';

	let form = $state<'default' | 'cube' | 'notifycation'>('default');
	let { folder, keyPair, dispatch } = useStoreon('keyPair', 'folder');

	function openFolder() {
		dispatch(SceneEvent.ChangeScene, 'folder');
	}

	function openProfile() {
		dispatch(SceneEvent.ChangeScene, 'profile');
	}

	function close(e: Event) {
		e.preventDefault();
		if (!$folder || !$keyPair) return;
		dispatch(SceneEvent.ChangeScene, null);
	}
</script>

<header class="z-50 grid h-10 place-items-center">
	<div
		class={[
			'rounded-2xl mt-1 drop-shadow-2xl transition-all',
			form === 'default' && 'flex gap-4 px-4 py-1 h-auto w-auto bg-black',
			form === 'cube' && 'h-20 w-20 p-2 bg-green-500 place-items-center grid'
		]}
		oncontextmenu={close}
		onclick={!$folder ? openFolder : $keyPair ? openProfile : undefined}
	>
		{#if form === 'default'}
			{#if $folder}
				<span><FolderFilled class="size-6 text-green-500 cursor-pointer" /></span>
			{:else}
				<span><FolderOutline class="size-6 cursor-pointer" /></span>
			{/if}

			{#if $keyPair}
				<span><KeysFilled class="size-6 text-green-500 cursor-pointer" /></span>
			{:else}
				<span><KeysOutline class="size-6 cursor-pointer" /></span>
			{/if}
		{/if}

		{#if form === 'cube'}
			<ClipboardCheck class="size-10 text-green-800" />
		{/if}
	</div>
</header>
