import * as esbuild from 'esbuild';
import chokidar from 'chokidar';
import yaml from 'js-yaml';

export const config = {
    dir: {
        input: "src",
        data: "../_data",
        includes: "../_includes"
    }
};

export default function (eleventyconfig) {
    // Function to build with esbuild
    const build = async () => {
        await esbuild.build({
            entryPoints: ["js/index.js"],
            bundle: true,
            outfile: "_site/js/bundle.js",
            sourcemap: true,
            // target: ["chrome58", "firefox57", "safari11", "edge16"]
        }).catch(() => process.exit(1));
    };

    // Initial build
    eleventyconfig.on("eleventy.before", build);

    // Watch for changes in the JavaScript files
    chokidar.watch('js/**/*.js').on('change', (path) => {
        console.log(`File ${path} has changed. Rebuilding...`);
        build();
    });

    // Process YAML Files for Data
    eleventyconfig.addDataExtension("yml,yaml", (contents, filePath) => {
        return yaml.load(contents);
    });

    eleventyconfig.addPassthroughCopy({ "./public/" : "/" });
    eleventyconfig.setServerPassthroughCopyBehavior("passthrough");

     // Handle Ctrl+C signal
     process.on('SIGINT', () => {
        console.log('Gracefully shutting down from SIGINT (Ctrl+C)');
        process.exit();
     });
}
