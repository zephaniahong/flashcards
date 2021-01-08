// dev imports
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack_conf/webpack.dev.js';

// express imports
import express from 'express';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';

import routes from './routes.mjs';

const app = express();

app.use(cookieParser());

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static('public'));
app.use(express.static('dist'));

app.use(methodOverride('_method'));


const env = process.env.NODE_ENV || 'development';

if( env === 'development' ){
  const compiler = webpack(config)

  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    // html only
    writeToDisk: filePath => /\.html$/.test(filePath),
  }));
  app.use(webpackHotMiddleware(compiler, {
    log: false,
    path: `/__webpack_hmr`,
    heartbeat: 10 * 1000,
  }));
}

// set the routes
routes(app);

const PORT = process.env.PORT || 3004;

app.listen(PORT);
