<script lang="ts">
	import { useStoreon } from '$store';
	import { SceneEvent } from '$store/scene';
	import { onMount } from 'svelte';
	import { fade, scale } from 'svelte/transition';

	let { scene, folder, keyPair, dispatch } = useStoreon('scene', 'folder', 'keyPair');

	let show = $state(false);
	let open = $derived(!!$scene);

	function openFolder() {
		dispatch(SceneEvent.ChangeScene, 'folder');
	}

	function openProfile() {
		dispatch(SceneEvent.ChangeScene, 'profile');
	}

	function secretAction(e: Event) {
		e.preventDefault();
		show = !show;
	}

	$effect(() => {
		const main = show ? '#3e3e3e' : '#4d4d4d';
		const secondary = show ? '#151515' : '#1a1a1a';
		const meta = document.head.querySelector('meta[name="theme-color"]');

		meta?.setAttribute('content', $scene === null ? main : secondary);
	});

	onMount(() => {
		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape' && $folder && $keyPair) dispatch(SceneEvent.ChangeScene, null);
		});
	});
</script>

<div
	class={[
		'absolute inset-0 grid grid-rows-3 items-center justify-items-center overflow-hidden',
		open && '-z-20'
	]}
>
	<div class="h-full w-full translate-x-1/2 scale-250 rotate-x-60 animate-wave bg-white"></div>
	<div class="h-full w-full translate-x-1/2 scale-250 rotate-x-60 animate-wave bg-[#0039A6]"></div>
	<div class="h-full w-full translate-x-1/2 scale-250 rotate-x-60 animate-wave bg-[#D52B1E]"></div>

	{#if !open}
		<img
			src="./gerb.svg"
			width="300px"
			class="absolute z-30 cursor-pointer transition-all duration-300 drop-shadow-2xl active:scale-105"
			alt=""
			transition:scale={{ duration: 100 }}
			onclick={$folder && $keyPair ? openProfile : openFolder}
			oncontextmenu={secretAction}
		/>
	{/if}

	<div
		class={[
			'absolute inset-0 z-10  transition-all duration-300',
			open ? 'bg-black/90 backdrop-blur-3xl' : 'bg-black/70 backdrop-blur-xs'
		]}
	></div>

	{#if show}
		<div
			style="background-image: url('./bg.png');"
			class="z-20 bg-no-repeat bg-cover bg-center absolute inset-0 opacity-20"
			transition:fade
		></div>
	{/if}
</div>
