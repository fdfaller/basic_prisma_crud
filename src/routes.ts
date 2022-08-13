import express from 'express'
const routes = express.Router();

import CategoryController from './Controllers/CategoryController';
import PersonController from './Controllers/PersonController';
import CashFlowController from './Controllers/CashFlowController';

//Controllers
const categoryController = new CategoryController();
const personController = new PersonController();
const cashFlowController = new CashFlowController();

//---------------------------------------------------------------------
//CATEGORY - crud
routes.post('/category', categoryController.create);
routes.get('/category', categoryController.index);
routes.get('/category/:id', categoryController.show);
routes.put('/category/:id', categoryController.update);
routes.delete('/category/:id', categoryController.delete);

//---------------------------------------------------------------------
//CATEGORY - crud
routes.post('/person', personController.create);
routes.get('/person', personController.index);
routes.get('/person/:id', personController.show);
routes.put('/person/:id', personController.update);
routes.delete('/person/:id', personController.delete);

//---------------------------------------------------------------------
//CATEGORY - crud
routes.post('/cashflow', cashFlowController.create);
routes.get('/cashflow', cashFlowController.index);
routes.get('/cashflow/:id', cashFlowController.show);
routes.put('/cashflow/:id', cashFlowController.update);
routes.delete('/cashflow/:id', cashFlowController.delete);

export default routes;