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

    const bundleJS = async () => {
        try {
            await esbuild.build({
                entryPoints: ["js/index.js"],
                bundle: true,
                outfile: "_site/js/bundle.js",
                sourcemap: true,
            });
            console.log('Build completed successfully.');
        } catch (error) {
            console.error('Build failed:', error);
            process.exit(1);
        }
    };    
    console.log(process.env.ELEVENTY_ENV   );     
    // Initial build
    eleventyconfig.on("eleventy.before", bundleJS);
 
    // Only watch for changes in serve mode
    if (process.env.ELEVENTY_ENV === 'serve') {
        chokidar.watch('js/**/*.js').on('change', async (path) => {
            console.log(`File ${path} has changed. Rebuilding...`);
            await build();
        });
    }


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
