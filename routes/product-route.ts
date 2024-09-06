import express from "express";
import { auth } from "../middlewares/auth";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProductByUser,
  updateProduct,
} from "../controllers/product.controller";

const router = express.Router();

router.get("/", auth, getProductByUser);
router.get("/:id", auth, getProductById);
router.post("/", auth, createProduct);
router.put("/:id", auth, updateProduct);
router.delete("/:id", auth, deleteProduct);

export default router;
