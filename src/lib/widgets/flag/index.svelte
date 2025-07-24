<script lang="ts">
	import { useStoreon } from '$store';
	import { SceneEvent } from '$store/scene';
	import { fade, scale } from 'svelte/transition';

	let { scene, folder, dispatch } = useStoreon('scene', 'folder');

	let show = $state(false);
	let clickCount = $state(0);
	let timer = $state<NodeJS.Timeout | null>(null);
	let open = $derived(!!$folder || !!$scene);

	function openFolder() {
		dispatch(SceneEvent.ChangeScene, 'folder');
	}

	function secretAction() {
		clickCount++;

		if (clickCount === 1) {
			timer = setTimeout(() => {
				if (clickCount === 1) {
					openFolder();
				}
				clickCount = 0;
			}, 1000 * 1.5);
		}

		if (clickCount === 10) {
			clearTimeout(timer as unknown as number);

			show = !show;

			clickCount = 0;
		}
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

	{#if show}
		<div
			class="bg-[url(./bg.png)] bg-no-repeat bg-cover bg-center absolute inset-0 opacity-50"
			transition:fade
		></div>
	{/if}

	{#if !open}
		<img
			src="./gerb.svg"
			width="300px"
			class="absolute z-20 cursor-pointer transition-all duration-300 drop-shadow-2xl active:scale-110"
			alt=""
			transition:scale={{ duration: 100 }}
			onclick={secretAction}
		/>
	{/if}

	<div
		class={[
			'absolute inset-0 z-10  transition-all duration-300',
			open ? 'bg-black/90 backdrop-blur-3xl' : 'bg-black/70 backdrop-blur-xs'
		]}
	></div>
</div>
