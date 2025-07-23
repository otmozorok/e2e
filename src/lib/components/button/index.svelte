<script lang="ts">
	import { Loader } from '$lib';

	let { onclick, children, loading = false, ...props } = $props();
</script>

<button
	{onclick}
	{...props}
	class="relative grid h-12 cursor-pointer grid-flow-col items-center justify-center gap-2 rounded-xl bg-blue-500 px-4 font-semibold text-white select-none"
>
	<span class={[loading && 'opacity-0']}>{@render children?.()}</span>
	{#if loading}
		<div class="absolute inset-0 grid place-items-center">
			<Loader className="size-6" />
		</div>
	{/if}
</button>
