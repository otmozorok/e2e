<script lang="ts">
	import {
		DecodeWidget,
		EncodeWidget,
		FlagWidget,
		FolderWidget,
		KeysWidget,
		ProfileWidget,
		StatusWidget
	} from '$lib';
	import { fly } from 'svelte/transition';
	import { useStoreon } from '$store';

	let { scene } = useStoreon('scene');
</script>

<main class="grid overflow-hidden grid-rows-[max-content_auto]">
	<StatusWidget />

	{#key $scene}
		<div class="grid grid-rows-[auto_max-content] gap-4 p-6 pt-8" in:fly={{ y: 200 }}>
			{#if $scene === 'folder'}
				<FolderWidget />
			{/if}
			{#if $scene === 'keys'}
				<KeysWidget />
			{/if}
			{#if $scene === 'profile'}
				<ProfileWidget />
			{/if}
			{#if $scene === 'decode'}
				<DecodeWidget />
			{/if}
			{#if $scene === 'encode'}
				<EncodeWidget />
			{/if}
		</div>
	{/key}
</main>

<FlagWidget />
