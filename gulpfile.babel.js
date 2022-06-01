const Taskerify = require('taskerify');

Taskerify.config.sourcemaps = false;
Taskerify.config.srcPath = './src/assets'; // Src Path
Taskerify.config.distPath = './dist/assets'; // Dist Path
Taskerify.config.srcViewsPath = './src'; // Views Src Path
Taskerify.config.distViewsPath = './dist'; // Compiled Views Dist Path (HTML)

const SRC = Taskerify.config.srcPath;
const DIST = Taskerify.config.distPath;
const ARCHIVES = './dist/arquivos';

const storeName = 'enext';
const commomFiles = [/* 'product', */ 'globals'];

Taskerify((mix) => {
  
  // Common Files
  commomFiles.map((file) =>
    mix
      .browserify(`${SRC}/common/js/${storeName}-common-${file}.js`, ARCHIVES)
      .sass(`${SRC}/common/scss/${storeName}-common-${file}.scss`, ARCHIVES)
  );

  // CSS Critical Rendering Path
  mix
    .sass(
      `${SRC}/common/scss/${storeName}-common-critical.scss`,
      `${DIST}/common/css/critical`
    )
    .criticalCss(
      `${DIST}/common/css/critical/${storeName}-common-critical.css`, // Compiled CSS file (.css)
      './dist/html/common/html-templates/sub-templates', // Folder to receive a file with inline CSS
      `${storeName}-ThemeStyles.html` // Name of a file with inline CSS (with extension name)
    );

  mix.vtex('enext');
});
