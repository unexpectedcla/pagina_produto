const Taskerify = require('taskerify');

Taskerify.config.sourcemaps    = false;
Taskerify.config.srcPath       = './src/assets';  // Src Path
Taskerify.config.distPath      = './dist/assets'; // Dist Path
Taskerify.config.srcViewsPath  = './src';         // Views Src Path
Taskerify.config.distViewsPath = './dist';        // Compiled Views Dist Path (HTML)

const SRC = Taskerify.config.srcPath;
const DIST = Taskerify.config.distPath;
const ARCHIVES = './dist/arquivos';
const FILES = './dist/files';

const storeName    = 'enext';
const checkoutFiles = [
    `${storeName}-common-checkout`,
];

const orderplacedFiles = [
    `${storeName}-common-orderplaced`,
];
const commomFiles  = ['product', 'globals'];

Taskerify((mix) => {

    // Image Minifier
    checkoutFiles.map((file) =>
        mix.browserify(`${SRC}/common/js/${file}.js`, FILES)
        .sass(`${SRC}/common/scss/${file}.scss`, FILES));

    orderplacedFiles.map((file) =>
        mix.browserify(`${SRC}/common/js/${file}.js`, FILES)
        .sass(`${SRC}/common/scss/${file}.scss`, FILES));

    // Image Minifier
    mix.imagemin(`${SRC}/common/images`, ARCHIVES);

    // Common Files
    commomFiles.map((file) =>
        mix.browserify(`${SRC}/common/js/${storeName}-common-${file}.js`, ARCHIVES)
        .sass(`${SRC}/common/scss/${storeName}-common-${file}.scss`, ARCHIVES));


    // CSS Critical Rendering Path
    mix.sass(`${SRC}/common/scss/${storeName}-common-critical.scss`, `${DIST}/common/css/critical`)
        .criticalCss(
            `${DIST}/common/css/critical/${storeName}-common-critical.css`, // Compiled CSS file (.css)
            './dist/html/common/html-templates/sub-templates',              // Folder to receive a file with inline CSS
            `${ storeName }-ThemeStyles.html`                                  // Name of a file with inline CSS (with extension name)
        );

    // SVG to Iconfonts
    mix.iconfont({
        /** Plugin options - Default Values */
        normalize: true,
        fontHeight: 1001,
        centerHorizontally: true,

        /** Fonts / CSS options */
        iconsPath: `${SRC}/common/iconfont/`,
        sassPath: `${SRC}/common/scss/01-settings/`,
        fontPath: '/arquivos/',
        outputFontPath: ARCHIVES,
        className: 'iconfont',
        iconFontName: `iconfont-${storeName}`,
        template: './node_modules/taskerify/storage/iconfont-template.scss',
        sassFileName: `_iconfont-${storeName}`,
        customExtension: '.css',
    });

    mix.vtex('enext');
});
