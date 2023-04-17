module.exports = {
  // ...
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  resolve: {
    alias: {
      'react-toastify$': 'react-toastify/dist/react-toastify.cjs.js'
    }
  },
  experiments: {
    outputModule: true
  }
};
