<script lang="ts">
	export const ssr = false;
	import { Button } from '$lib';
	import i18n from '$lib/locales';
	import QRCodeStyling from 'qr-code-styling';

	let { url = 'е2е.рф', size = 250 } = $props();

	let qr: HTMLDivElement;
	let qrCode: QRCodeStyling;

	async function onClick() {
		const blob = await qrCode.getRawData('png');
		const file = new File([blob!], 'qrcode.png', { type: 'image/png' });
		const data = {
			title: 'Scan this QR Code',
			files: [file]
		};

		if (navigator?.share && navigator?.canShare?.(data)) {
			console.log(file);

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

<div class="grid place-items-center gap-4">
	<div bind:this={qr}></div>
	<Button onclick={onClick}>{i18n.t('common.share')}</Button>
</div>
