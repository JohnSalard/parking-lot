import * as path from 'path';
const ENV = process.env.NODE_ENV;
require('dotenv').config({ path: path.resolve(`env/${!ENV ? '.env' : `${ENV}.env`}`) });
// require('dotenv');
export const apiConfig = {
  port: parseInt(process.env['API_PORT']),
  baseUrl: process.env['API_BASE_URL'],
  name: process.env['API_NAME'],
  description: process.env['API_DESCRIPTION'],
  version: process.env['API_VERSION']
};
