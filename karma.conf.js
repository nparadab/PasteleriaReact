const webpack = require('webpack');

module.exports = function(config) {
  config.set({
    // Frameworks de prueba
    frameworks: ['jasmine', 'webpack'],

    // Archivos de prueba
    files: ['tests/**/*.test.js'],

    // Preprocesamiento con Webpack
    preprocessors: {
      'tests/**/*.test.js': ['webpack']
    },

    // Configuración de Webpack
    webpack: {
      mode: 'development',
      resolve: {
        extensions: ['.js', '.jsx'] // Reconoce archivos .jsx sin necesidad de especificar la extensión
      },
      module: {
        rules: [
          {
            test: /\.jsx?$/, // Acepta .js y .jsx
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/preset-env',    // Transpila JS moderno
                  '@babel/preset-react'   // Transpila JSX
                ]
              }
            }
          },
          {
            test: /\.css$/, // Acepta archivos .css
            use: ['style-loader', 'css-loader'] // Permite importar estilos en componentes
          }
        ]
      },
      plugins: [
        // ✅ Define process.env para que no explote en pruebas
        new webpack.DefinePlugin({
          'process.env': {
            REACT_APP_API_URL: JSON.stringify('http://localhost:8080/api')
          }
        })
      ]
    },

    // Navegador para ejecutar las pruebas
    browsers: ['Chrome'],

    // Reportes
    reporters: ['progress', 'kjhtml'],

    // Mantener ejecución activa
    singleRun: false
  });
};
