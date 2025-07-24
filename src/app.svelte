<script lang="ts">
	import { provideStoreon, store } from './store';
	import { HomePage } from '$lib/pages';
	import i18n from '$lib/locales';

	provideStoreon(store);

	$effect(() => {
		document.documentElement.setAttribute('lang', i18n.locale);
	});
</script>

<HomePage />
