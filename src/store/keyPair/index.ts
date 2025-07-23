import { type StoreonModule } from 'storeon';

export enum KeyPairEvent {
	SetKeyPair = 'keyPair:set_key_pair'
}

export interface KeyPairState {
	keyPair: CryptoKeyPair | null;
}

export interface KeyPairEvents {
	[KeyPairEvent.SetKeyPair]: CryptoKeyPair;
}

export const keyPair: StoreonModule<KeyPairState, KeyPairEvents> = (store) => {
	store.on('@init', () => ({
		keyPair: null
	}));

	store.on(KeyPairEvent.SetKeyPair, (_, keyPair) => ({ keyPair }));
};
