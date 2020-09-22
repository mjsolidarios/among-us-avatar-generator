const POSTCSS_LOADER = "postcss-loader";
const isPostCssLoader = ({ loader } = {}) => loader === POSTCSS_LOADER;
const getOneOf = ({ oneOf } = {}) => {
  if (oneOf) {
    return oneOf;
  }

  return false;
};

const defaultOptions = {
  autoPrefixer: true,
  cssInJs: false,
  purgecss: false
}

export default (options = {}) => ({
  webpack: config => {
    const opts = { ...defaultOptions, ...options };
    const { rules } = config.module;
    const { oneOf } = rules.find(getOneOf);

    for (const item of oneOf) {
      const postcssLoader =
        item && item.loader && item.loader.find(isPostCssLoader);

      if (
        postcssLoader &&
        postcssLoader.options &&
        postcssLoader.options.plugins
      ) {
        const plugins = postcssLoader.options.plugins;
        const tailwindDefault = [
          require("postcss-import")(),
          require("tailwindcss")('./tailwind.js'),
          require("postcss-nested"),
          require("postcss-custom-properties"),
        ]
        
        if(opts.purgecss){
          tailwindDefault.push(
            require("@fullhuman/postcss-purgecss")({
              content: ['./src/**/*.html', './src/**/*.tsx', './src/**/*.ts'],
            })
          )
        }

        if (opts.autoPrefixer) {
          tailwindDefault.push(require('autoprefixer'))
        }

        Object.assign(postcssLoader.options, {
          plugins: [
            ...tailwindDefault, ...(plugins.length ? plugins : [])
          ]
        });

        break;
      }
    }

    if (opts.cssInJs) {
      config.node = {
        fs: 'empty'
      }
    }

    return config;
  }
});