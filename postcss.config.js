module.exports = {
  plugins: [
    require('postcss-nested'),
    require('postcss-import'),
    require('postcss-atroot'),
    require('postcss-property-lookup'),
    require('autoprefixer'),
    require('postcss-use'),
    require('cssnano')({
      preset: 'default',
    }),
    require('postcss-advanced-variables'),
    require('postcss-autoreset')({
      reset: {
      },
    }),
    require('postcss-initial'),
    require('postcss-preset-env'),
    require('postcss-utilities')({
      centerMethod: 'flexbox'
    }),
    require('postcss-short'),
    require('postcss-assets')
  ]
};
