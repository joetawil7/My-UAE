module.exports = {
  multipass: true,
  pretty: true,
  quiet: true,
  js2svg: {
    pretty: true,
    indent: 2,
  },
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeUnknownsAndDefaults: {
            keepDataAttrs: false,
          },
        },
      },
    },
    'removeXMLNS',
  ],
};
