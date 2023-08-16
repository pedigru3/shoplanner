module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          'moduleName': '@env',
          'allowUndefined': false,
        }
      ],
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@libs': './src/libs',
            '@assets': './src/assets',
            '@components': './src/components',
            '@screens': './src/screens',
            '@storage': './src/storage',
            '@utils': './src/utils',
            '@services': './src/services',
            '@hooks': './src/hooks',
            '@contexts': './src/contexts',
            '@routes': './src/routes',
            '@theme': './src/theme',
            '@repositories': './src/repositories'
          }
        },
      ],
    ],
  };
};
