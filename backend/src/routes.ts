import { Router } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailuserController } from "./controllers/user/DetailUserController";

import { isAuthenticated } from "./middlewares/isAuthenticated";

const router = Router();

//-- ROTAS USER --
router.post("/users", new CreateUserController().handle);
//-- ROTA PARA LOGAR USUÁRIO --
router.post("/session", new AuthUserController().handle);

router.get("/me", isAuthenticated, new DetailuserController().handle);

export { router };