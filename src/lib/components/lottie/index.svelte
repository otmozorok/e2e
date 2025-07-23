<script lang="ts">
	import { DotLottie } from '@lottiefiles/dotlottie-web';

	let { data, size = 300 } = $props();

	let canvas: HTMLCanvasElement;

	$effect(() => {
		new DotLottie({
			autoplay: true,
			loop: true,
			canvas,
			data
		});
	});
</script>

<canvas bind:this={canvas} width={size} height={size} style="width: {size}px; height: {size}px"
></canvas>
