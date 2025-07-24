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

	async function onCopy() {
		await navigator.clipboard.writeText(url);
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
				round: 0,
				gradient: {
					type: 'linear',
					rotation: 180,
					colorStops: [
						{
							offset: 0,
							color: '#D52B1E'
						},
						{
							offset: 1,
							color: '#0039A6'
						}
					]
				}
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

<div class="grid place-items-center relative gap-3">
	<div class="qr-wrapper absolute top-0 left-0">
		<img src="./ramka.png" class="w-full h-full" />
	</div>
	<div bind:this={qr} onclick={onCopy} class="cursor-pointer"></div>
	<div class="grid gap-2">
		<span class="text-sm text-center text-gray-600">{i18n.t('common.share')}</span>
		<div class="flex gap-8 drop-shadow-black drop-shadow-lg animate-pulse">
			<DocumentText class="size-8 cursor-pointer" onclick={onShareText} />
			<QrCode class="size-8 cursor-pointer" onclick={onShareImage} />
		</div>
	</div>
</div>
