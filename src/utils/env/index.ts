import * as dotenv from 'dotenv';

dotenv.config();
const DB_USER_SCHEMA = process.env.DB_USER_SCHEMA || '';
const DB_UPLOAD_SCHEMA = process.env.DB_UPLOAD_SCHEMA || '';
const DB_PORT = +process.env.DB_PORT || 5432;
const DB_HOST = process.env.DB_HOST || '';
const DB_USER = process.env.DB_USERNAME || '';
const DB_DB = process.env.DB_DATABASE || '';
const DB_PASS = process.env.DB_PASSWORD || '';

const DB_NEWS_SCHEMA = process.env.DB_NEWS_SCHEMA || '';
const DB_LIKES_SCHEMA = process.env.DB_LIKES_SCHEMA || '';

export {
  DB_NEWS_SCHEMA,
  DB_LIKES_SCHEMA,
  DB_UPLOAD_SCHEMA,
  DB_USER_SCHEMA,
  DB_PORT,
  DB_HOST,
  DB_USER,
  DB_DB,
  DB_PASS,
};
