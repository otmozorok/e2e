export async function saveFile(
	fileName: string,
	content: FileSystemWriteChunkType,
	dir: FileSystemDirectoryHandle
) {
	const fileHandle = await dir.getFileHandle(fileName, { create: true });
	const writable = await fileHandle.createWritable();
	await writable.write(content);
	await writable.close();
}
