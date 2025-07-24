<script lang="ts">
	import { DocumentText, QrCode } from '$lib';
	import i18n from '$lib/locales';
	import QRCodeStyling from 'qr-code-styling';

	let { url = 'е2е.рф', size = 250 } = $props();

	let qr: HTMLDivElement;
	let qrCode: QRCodeStyling;

	async function onShareImage() {
		const blob = await qrCode.getRawData('png');
		const file = new File([blob!], 'qrcode.png', { type: 'image/png' });
		const data: ShareData = {
			title: 'My public key',
			files: [file]
		};

		if (navigator?.share && navigator?.canShare?.(data)) {
			await navigator.share(data);
		}
	}

	async function onShareText() {
		const blob = await qrCode.getRawData('png');
		const file = new File([blob!], 'qrcode.png', { type: 'image/png' });
		const data: ShareData = {
			title: 'My public key',
			text: url
		};

		if (navigator?.share && navigator?.canShare?.(data)) {
			await navigator.share(data);
		}
	}

	$effect(() => {
		qrCode = new QRCodeStyling({
			width: size,
			height: size,
			margin: 0,
			type: 'canvas',
			qrOptions: {
				errorCorrectionLevel: 'L'
			},
			backgroundOptions: {
				color: 'transparent'
			},
			imageOptions: {
				margin: 3,
				hideBackgroundDots: true,
				imageSize: 0.4
			},
			dotsOptions: {
				type: 'extra-rounded',
				color: '#fff'
			},
			cornersSquareOptions: {
				type: 'extra-rounded',
				color: '#fff'
			},
			cornersDotOptions: {
				type: 'dot',
				color: '#fff'
			}
		});
		qrCode.append(qr);
		qrCode.update({ data: url });
	});
</script>

<div class="grid place-items-center">
	<div bind:this={qr}></div>
	<div class="grid gap-2">
		<span class="font-light text-sm text-center">{i18n.t('common.share')}</span>
		<div class="flex gap-8">
			<DocumentText class="size-8 cursor-pointer" onclick={onShareText} />
			<QrCode class="size-8 cursor-pointer" onclick={onShareImage} />
		</div>
	</div>
</div>
