import swaggerJSDoc from 'swagger-jsdoc';
import { API_DOCS_HOST } from '../../config';

const swaggerDefinition = {
  info: {
    title: 'BAMI API Docs V1',
    version: '1.0.0',
    description: 'PUBLIC API DOCS V1',
  },
  host: API_DOCS_HOST,
  basePath: '/v1',
  produces: ['application/json'],
  consumes: ['application/json'],
};

const options = {
  swaggerDefinition,
  apis: [
    'server/components/**/*.route.js',
    'server/components/**/*.model.js',
    'server/api/validatorErrorHandler.js',
    'server/components/main/routers/main.routes.js',
  ],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;

