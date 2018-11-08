module.exports = {
  presets: [
    [
      '@vue/app',
      {
        module: false,
      },
    ],
  ],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk',
      },
    ],
  ],
}
