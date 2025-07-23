import { type StoreonModule } from 'storeon';

export enum FolderEvent {
	SetFolder = 'folder:set'
}

export interface FolderState {
	folder: FileSystemDirectoryHandle | null;
}

export interface FolderEvents {
	[FolderEvent.SetFolder]: FileSystemDirectoryHandle;
}

export const folder: StoreonModule<FolderState, FolderEvents> = (store) => {
	store.on('@init', () => ({
		folder: null
	}));

	store.on(FolderEvent.SetFolder, (_, folder) => ({ folder }));
};
