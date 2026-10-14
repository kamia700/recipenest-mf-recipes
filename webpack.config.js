const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'recipenest-mf-recipes',

  exposes: {
    './Routes': './src/app/app.routes.ts',
  },

  // КРИТИЧНО: должно быть согласовано с shared в shell.
  // singleton + strictVersion гарантируют, что remote использует тот же
  // экземпляр Angular, что и shell, а не грузит свою копию.
  // Версии в "dependencies" package.json должны совпадать с shell.
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});
