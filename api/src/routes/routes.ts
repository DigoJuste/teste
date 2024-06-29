import { Router } from 'express';
import carrinhoController from '../controllers/cart.controller';
import productController from '../controllers/product.controller';

const api = Router()
.use(carrinhoController)
.use(productController);

export default Router().use('/', api);