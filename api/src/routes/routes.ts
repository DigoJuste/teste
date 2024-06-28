import { Router } from 'express';
import carrinhoController from '../controllers/carrinho.controller';

const api = Router()
.use(carrinhoController);

export default Router().use('/', api);