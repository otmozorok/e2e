<script lang="ts">
	import { useStoreon } from '$store';
	import { SceneEvent } from '$store/scene';
	import { scale } from 'svelte/transition';

	let { scene, folder, dispatch } = useStoreon('scene', 'folder');

	let open = $derived(!!$folder || !!$scene);

	function openFolder() {
		dispatch(SceneEvent.ChangeScene, 'folder');
	}
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
			class="absolute z-20 cursor-pointer transition-all duration-300 drop-shadow-2xl"
			alt=""
			transition:scale={{ duration: 100 }}
			onclick={openFolder}
		/>
	{/if}

	<div
		class={[
			'absolute inset-0 z-10  transition-all duration-300',
			open ? 'bg-black/90 backdrop-blur-3xl' : 'bg-black/70 backdrop-blur-xs'
		]}
	></div>
</div>
