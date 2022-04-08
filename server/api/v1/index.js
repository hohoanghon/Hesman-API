import morgan from 'morgan';
import swaggerUI from 'swagger-ui-express';
import { Router } from 'express';
import { MORGAN_FORMAT } from '../../constants';
import swaggerSpecV1 from './docs';
import MainApi from "../../components/main/routers/main.routes";

const router = new Router();
router.use('', [MainApi])

// Docs
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'staging') {
  router.use(morgan(MORGAN_FORMAT, {
    skip: (req, res) => {
      if (req.originalUrl.includes('api-docs')) {
        return true;
      }
      return res.statusCode < 400;
    },
    stream: process.stderr,
  }));
  router.use(morgan(MORGAN_FORMAT, {
    skip: (req, res) => {
      if (req.originalUrl.includes('api-docs')) {
        return true;
      }
      return res.statusCode >= 400;
    },
    stream: process.stdout,
  }));
  router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecV1));
} else {
  router.use(morgan(MORGAN_FORMAT, {
    skip: (req, res) => res.statusCode < 400,
    stream: process.stderr,
  }));
  router.use(morgan(MORGAN_FORMAT, {
    skip: (req, res) => res.statusCode >= 400,
    stream: process.stdout,
  }));
}

export default router;
