<script lang="ts">
	import { Article, Button, Qr } from '$lib';
	import i18n from '$lib/locales';
	import { useStoreon } from '$store';
	import { SceneEvent } from '$store/scene';

	let { publicKey, dispatch } = useStoreon('publicKey');

	function openEncode() {
		dispatch(SceneEvent.ChangeScene, 'encode');
	}

	function openDecode() {
		dispatch(SceneEvent.ChangeScene, 'decode');
	}
</script>

<div class="grid place-items-center">
	<Qr url={$publicKey!} />
	<Article title={i18n.t('profile.title')} description={i18n.t('profile.description')} />
</div>
<div class="grid auto-cols-fr grid-flow-col gap-4">
	<Button onclick={openEncode}>
		{i18n.t('common.encode')}
	</Button>
	<Button onclick={openDecode}>
		{i18n.t('common.decode')}
	</Button>
</div>
