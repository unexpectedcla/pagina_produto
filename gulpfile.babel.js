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

  mix.vtex('enext');
});
