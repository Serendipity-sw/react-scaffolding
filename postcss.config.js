module.exports = {
  plugins: [
    require('precss'),
    require('autoprefixer'),
    require('postcss-use'),
    require('postcss-autoreset')({
      reset: {
        margin: 12,
        padding: 0,
        borderRadius: 0,
      },
    }),
    require('postcss-modules'),
    require('postcss-initial'),
    require('postcss-preset-env'),
    require('postcss-utilities'),
    require('postcss-short'),
    require('postcss-assets'),
    require('postcss-font-magician')({}),
  ]
};
