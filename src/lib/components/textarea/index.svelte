<script lang="ts">
	let { value = $bindable(), ...props } = $props();
</script>

<textarea
	bind:value
	{...props}
	class={[
		'field-sizing-content min-h-24 w-full resize-none rounded-xl p-4 outline-0 bg-stone-950',
		props.class
	]}
></textarea>
