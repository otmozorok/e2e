<script lang="ts">
	import { Button, Qr } from '$lib';
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
	<div class="grid place-items-center gap-6">
		<h3 class="text-center text-2xl leading-none">Ваш публичный ключ</h3>
		<p class="text-center leading-normal">
			Поделитесь публичным ключем с собеседником и попросите его публичный ключ
		</p>
	</div>
</div>
<div class="grid auto-cols-fr grid-flow-col gap-4">
	<Button onclick={openEncode}>
		{i18n.t('common.encode')}
	</Button>
	<Button onclick={openDecode}>
		{i18n.t('common.decode')}
	</Button>
</div>
