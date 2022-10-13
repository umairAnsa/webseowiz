import express from "express";
import {
  getCardsList,
  createNewCard,
  deleteCard,
  updateCard,
} from "../controllers/cards.js";
import { verifyUser } from "../controllers/verifyToken.js";

const router = express.Router();

router.get("/cards", verifyUser, getCardsList);
router.post("/cards", verifyUser, createNewCard);
router.delete("/cards/:id", verifyUser, deleteCard);
router.put("/cards/:id", verifyUser, updateCard);
export default router;
