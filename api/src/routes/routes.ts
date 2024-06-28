import { Router } from 'express';
import carrinhoController from '../controllers/cart.controller';

const api = Router()
.use(carrinhoController);

export default Router().use('/', api);