/* config-overrides.js */
const { override } = require('customize-cra');
const webpack = require('webpack');
const addLessLoader = require("customize-cra-less-loader");

module.exports = override(
  addLessLoader({
    // If you are using less-loader@5 or older version, please spread the lessOptions to options directly.\
    lessLoaderOptions: {
      lessOptions: {
        javascriptEnabled: true,
        modifyVars: { '@base-color': '#2a343d' }
      }
    }
  }),
  (config) => {
    const fallback = config.resolve.fallback || {};
    Object.assign(fallback, {
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      assert: require.resolve('assert'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      os: require.resolve('os-browserify'),
      url: require.resolve('url'),
    });
    config.resolve.fallback = fallback;
    config.plugins = (config.plugins || []).concat([
      new webpack.ProvidePlugin({
        process: 'process/browser',
        Buffer: ['buffer', 'Buffer'],
      }),
    ]);
    config.ignoreWarnings = [/Failed to parse source map/];
    return config;
  }
);