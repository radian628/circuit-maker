import esbuild from "esbuild";
import sveltePlugin from "esbuild-svelte";
import sveltePreprocess from "svelte-preprocess";
import { copy } from "esbuild-plugin-copy";

const ctx = await esbuild.context({
    entryPoints: ["./frontend/src/index.ts"],
    plugins: [
        sveltePlugin({
            preprocess: sveltePreprocess()
        }),
        copy({
            resolveFrom: "cwd",
            assets: {
                from: ["./frontend/assets/*"],
                to: ["./frontend/build"]
            },
            watch: true
        })
    ],
    outdir: "./frontend/build",
    bundle: true 
});

console.log("Build started!");
await ctx.watch();
console.log("Build ended!");
