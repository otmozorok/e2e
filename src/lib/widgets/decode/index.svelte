<script lang="ts">
	import { Article, Button, Textarea } from '$lib';
	import i18n from '$lib/locales';
	import { useStoreon } from '$store';
	import { SceneEvent } from '$store/scene';
	import { onMount } from 'svelte';

	let { dispatch } = useStoreon();

	let value = $state('');

	function back() {
		dispatch(SceneEvent.ChangeScene, 'profile');
	}

	onMount(() => {
		navigator.clipboard
			.readText()
			.then((res) => {
				value = res;
			})
			.catch()
			.finally();
	});
</script>

<div class="grid grid-rows-[auto_max-content] gap-10">
	<Textarea bind:value placeholder="Текст для расшифровки" autofocus class="max-h-80" />
	<Article
		title="Расшифровка вашим приватным ключем"
		description="Вставьте зашифрованный текст в поле сверху"
	/>
</div>
<div class="grid auto-cols-fr grid-flow-col gap-4">
	<Button onclick={back}>
		{i18n.t('common.back')}
	</Button>
	<Button onclick={back}>
		{i18n.t('common.back')}
	</Button>
</div>
