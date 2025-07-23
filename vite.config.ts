import path from 'node:path';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [tailwindcss(), svelte()],
	base: './',
	resolve: {
		alias: {
			$lib: path.resolve(__dirname, './src/lib'),
			'$lib/*': path.resolve(__dirname, './src/lib/*'),
			$store: path.resolve(__dirname, './src/store'),
			'$store/*': path.resolve(__dirname, './src/store/*')
		}
	}
});
