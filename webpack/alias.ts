import path from 'path';
import {SRC_DIR} from './env';

const ALIAS = {
  '~': path.join(SRC_DIR),
  'Pages': path.join(SRC_DIR, 'pages'),
  'Constants': path.join(SRC_DIR, 'constants'),
  'Components': path.join(SRC_DIR, 'components'),
  'Utils': path.join(SRC_DIR, 'utils'),
  'Static': path.join(SRC_DIR, 'static'),
  'Api': path.join(SRC_DIR, 'api'),
  'Controllers': path.join(SRC_DIR, 'controllers'),
  'Store': path.join(SRC_DIR, 'store'),
  'Server': path.join(SRC_DIR, 'server'),
  'Webpack': path.join(SRC_DIR, 'webpack'),
  'Hooks': path.join(SRC_DIR, 'hooks'),
};

export default ALIAS;
