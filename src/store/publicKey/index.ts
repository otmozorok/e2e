import { type StoreonModule } from 'storeon';

export enum PublicKeyEvent {
	SetPublicKey = 'publicKey:set_public_key'
}

export interface PublicKeyState {
	publicKey: string | null;
}

export interface PublicKeyEvents {
	[PublicKeyEvent.SetPublicKey]: string;
}

export const publicKey: StoreonModule<PublicKeyState, PublicKeyEvents> = (store) => {
	store.on('@init', () => ({
		publicKey: null
	}));

	store.on(PublicKeyEvent.SetPublicKey, (_, publicKey) => ({ publicKey }));
};
