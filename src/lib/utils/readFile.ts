export async function readFile(fileName: string, dir: FileSystemDirectoryHandle) {
	const fileHandle = await dir.getFileHandle(fileName);
	const file = await fileHandle.getFile();
	return await file.text();
}
