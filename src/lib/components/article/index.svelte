<script lang="ts">
	let { title, description }: { title: string; description: string } = $props();
</script>

<div class="grid place-items-center gap-6 content-start text-balance">
	<h3 class="text-center text-3xl leading-none">{title}</h3>
	<p class="text-center leading-normal">{description}</p>
</div>
