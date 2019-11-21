const presets = ['module:metro-react-native-babel-preset'];

const env = {
  production: {
    plugins: ['react-native-paper/babel'],
  },
};

const plugins = [
  [
    'babel-plugin-relative-path-import',
    {
      paths: [
        {
          rootPathPrefix: '#screens',
          rootPathSuffix: './src/screens',
        },
        {
          rootPathPrefix: '#lib',
          rootPathSuffix: './src/lib/',
        },
        {
          rootPathPrefix: '#store',
          rootPathSuffix: './src/lib/store',
        },
        {
          rootPathPrefix: '#theme',
          rootPathSuffix: './src/res',
        },
      ],
    },

  ],

];


module.exports = {
  presets,
  env,
  plugins,
};