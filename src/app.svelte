<script lang="ts">
	import { provideStoreon, store } from './store';
	import { HomePage } from '$lib/pages';
	import i18n from '$lib/locales';

	provideStoreon(store);

	// @todo #1a1a1a цвет сверху при открытие, при ошибке #160403
	$effect(() => {
		document.documentElement.setAttribute('lang', i18n.locale);
	});
</script>

<HomePage />
