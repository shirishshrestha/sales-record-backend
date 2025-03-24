import express from "express";
import {
  addSale,
  getSales,
  updateSale,
  deleteSale,
  getSaleById,
} from "../controllers/salesController.js";
import {
  authMiddleware,
  adminMiddleware,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, adminMiddleware, addSale);
router.get("/", authMiddleware, adminMiddleware, getSales);
router.get("/:id", authMiddleware, adminMiddleware, getSaleById);
router.put("/:id", authMiddleware, adminMiddleware, updateSale);
router.delete("/:id", authMiddleware, adminMiddleware, deleteSale);

export default router;
