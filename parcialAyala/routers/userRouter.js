import express from "express";
import {
  getUsers,
  postUser,
  getUserById,
  deleteUserById,
  updateUserById,
} from "../controllers/userController.js";

/*
El usuario solo puede crear y actualizar su perfil
---------------------------------------------------
El admin puede crear y actualizar su perfil , eliminar perfil de otros usuarios
Rol solo lo indica el admi
*/
const router = express.Router();
router.get("/", getUsers);
router.post("/", postUser);
router.get("/:id", getUserById);
router.delete("/:id", deleteUserById);
router.put("/:id", updateUserById);

export default router;
