<script lang="ts">
	let { value = $bindable(), ...props } = $props();
</script>

<textarea
	bind:value
	class="field-sizing-content min-h-24 w-full resize-none rounded-md border border-gray-300 p-2"
></textarea>
