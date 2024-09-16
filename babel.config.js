module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          alias: {
            '@components': './src/components',
            '@navigation': './src/navigation',
            '@controls': './src/controls',
            '@screens': './src/screens',
            '@globals': './src/globals',
            '@services': './src/services',
            '@types': './src/types',
            '@styles': './src/styles',
            '@utils': './src/utils',
            '@theme': './src/theme',
            '@authentication': './src/authentication',
            '@assets': './assets',
            '@localization': './src/localization',
            '@icons': './icons',
          },
        },
      ],
    ],
  };
};
