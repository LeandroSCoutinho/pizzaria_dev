import { Router } from "express";

import multer from "multer";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailuserController } from "./controllers/user/DetailUserController";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController"
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { CreateProductController } from "./controllers/product/CreateProductController";

import { isAuthenticated } from "./middlewares/isAuthenticated";

import uploadConfig from "./config/multer";
import { ListByCategoryController } from "./controllers/product/ListByCategoryController";
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { RemoveOrderController } from "./controllers/order/RemoveOrderController";
import { AddItemController } from "./controllers/order/AddItemController";
import { RemoveItemController } from "./controllers/order/RemoveItemController";
import { SendOrderController } from "./controllers/order/SendOrderController";

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

//-- ROTAS USER --
router.post("/users", new CreateUserController().handle);

router.post("/session", new AuthUserController().handle);

router.get("/me", isAuthenticated, new DetailuserController().handle);
//-- ROTAS CATEGORY
router.post('/category', isAuthenticated, new CreateCategoryController().handle );

router.get("/category", isAuthenticated, new ListCategoryController().handle);
//-- ROTA PRODUCT
router.post("/product", isAuthenticated, upload.single("file"), new CreateProductController().handle );

router.get("/category/product", isAuthenticated, new ListByCategoryController().handle);
//-- ROTA ORDER
router.post("/order", isAuthenticated, new CreateOrderController().handle);

router.delete("/order", isAuthenticated, new RemoveOrderController().handle);
//-- OREDER ITEM
router.post("/order/add", isAuthenticated, new AddItemController().handle);
 
router.delete("/order/remove", isAuthenticated, new RemoveItemController().handle );

router.put("/order/send", isAuthenticated, new SendOrderController().handle);

export { router };