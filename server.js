/**
 * Entry Script
 */
const path = require('path');
const express = require('express');
const app = express();
const DIR = './uploads';

const dotEnvConfigs = {
  path: path.resolve(process.cwd(), '.env'),
};
app.use(express.static(DIR));
require('@babel/register');
require('@babel/polyfill');
require('dotenv').config(dotEnvConfigs);
require('./server/server');
