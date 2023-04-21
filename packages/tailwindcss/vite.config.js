import { defineConfig } from 'vite'
import path from 'path'
import typescript from '@rollup/plugin-typescript'
import { typescriptPaths } from 'rollup-plugin-typescript-paths'

export default defineConfig({
	plugins: [],
	resolve: {
		alias: [
			{
				find: '~',
				replacement: path.resolve(__dirname, './src')
			}
		]
	},
	server: {
		port: 3000
	},
	build: {
		manifest: true,
		minify: true,
		reportCompressedSize: true,
		target: "modules",
		lib: {
			entry: path.resolve(__dirname, 'src/index.ts'),
			fileName: 'frostui',
			name: 'frostui',
			formats: ['umd', 'es', 'cjs'],
		},

		rollupOptions: {
			plugins: [
				typescriptPaths({
					preserveExtensions: true,
				}),
				typescript({
					sourceMap: false,
					declaration: true,
					outDir: 'dist',


				}),
			],

		}
	}
})
