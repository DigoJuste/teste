import express from 'express'
import routes from './routes/routes';
import cors from 'cors';
import { cronRemoveInativeCart } from './services/cron.service';

const app = express();

app.use([
    cors(),
    express.json(),
    routes,
  ]);

app.listen(3333, () => console.log("Runnig on 3333"));

cronRemoveInativeCart;

export default app;

