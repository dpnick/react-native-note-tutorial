module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'babel-plugin-styled-components',
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@components': './src/components',
            '@navigation': './src/navigation',
            '@contexts': './src/contexts',
            '@models': './src/models',
            '@hooks': './src/hooks',
            '@pages': './src/pages',
          },
        },
      ],
    ],
  };
};
