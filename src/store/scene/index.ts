import { type StoreonModule } from 'storeon';

type Scene = null | 'folder' | 'keys' | 'profile' | 'encode' | 'decode';

export enum SceneEvent {
	ChangeScene = 'scene:change'
}

export interface SceneState {
	scene: Scene;
}

export interface SceneEvents {
	[SceneEvent.ChangeScene]: Scene;
}

export const scene: StoreonModule<SceneState, SceneEvents> = (store) => {
	store.on('@init', () => ({
		scene: null
	}));

	store.on(SceneEvent.ChangeScene, (_, scene) => ({ scene }));
};
