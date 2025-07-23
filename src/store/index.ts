import {
	type StoreonDispatch,
	type StoreonEvents,
	type StoreonStore,
	createStoreon
} from 'storeon';
import { getContext, setContext } from 'svelte';
import { storeLogger } from '$lib/utils';
import { scene, type SceneEvents, type SceneState } from './scene';
import { folder, type FolderEvents, type FolderState } from './folder';
import { publicKey, type PublicKeyEvents, type PublicKeyState } from './publicKey';
import { keyPair, type KeyPairEvents, type KeyPairState } from './keyPair';

const DEV = import.meta.env.MODE === 'development';
const STORE = typeof Symbol !== 'undefined' ? Symbol('gs') : '@@gs';

type Subscriber<T> = (value: T) => void;

type Subscribable<State> = {
	[K in keyof State]: {
		subscribe: (run: Subscriber<State[K]>) => VoidFunction;
	};
};

export function provideStoreon(store: StoreonStore) {
	setContext(STORE, store);
}

export type State = SceneState & FolderState & PublicKeyState & KeyPairState;
export type Events = SceneEvents & FolderEvents & PublicKeyEvents & KeyPairEvents;

export function useStoreon<S = State, E = Events>(
	...keys: (keyof S)[]
): Partial<Subscribable<S>> & {
	dispatch: StoreonDispatch<E & createStoreon.DispatchableEvents<S>>;
} {
	let store: StoreonStore<S, E> = getContext(STORE);
	if (process.env.NODE_ENV !== 'production' && !store) {
		throw new Error(
			'Could not find storeon context value.' +
				'Please ensure you provide store using "provideStoreon" function'
		);
	}

	let subscribers: {
		[K in keyof S]?: (state: (E & StoreonEvents<S, E>)['@changed'][keyof S]) => void;
	} = {};

	let makeSubscribable = (key: keyof S) => {
		let subscribe = (run: Subscriber<S[typeof key]>) => {
			let state = store.get();

			subscribers[key] = run;
			run(state[key]);

			return () => {
				delete subscribers[key];
			};
		};

		return { subscribe };
	};

	store.on('@changed', (_, changed) => {
		keys.forEach((key) => {
			if (key in (changed as object) && subscribers[key]) {
				subscribers[key](changed[key]);
			}
		});
	});

	let data: Partial<Subscribable<S>> = {};
	keys.forEach((key) => {
		data[key] = makeSubscribable(key);
	});
	return { ...data, dispatch: store.dispatch };
}

export const store = createStoreon<State, Events>([
	scene,
	folder,
	publicKey,
	keyPair,
	storeLogger(!DEV)
]);
