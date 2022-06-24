import path from 'path';

const IS_DEV = process.env.NODE_ENV !== 'production';
const SRC_DIR = path.join(__dirname, '../src');
const DIST_DIR = path.join(__dirname, '../dist');
const ENV_PATH = IS_DEV ? './.env' : './.env';

export {IS_DEV, SRC_DIR, DIST_DIR, ENV_PATH};
