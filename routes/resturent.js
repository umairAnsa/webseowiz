import express from "express";
import {
  getResturentList,
  createNewResturent,
  updateResturant,
  deleteResturant
} from "../controllers/resturent.js";
import { verifyUser } from "../controllers/verifyToken.js";
const router = express.Router();

router.get("/resturent", verifyUser, getResturentList);
router.post("/resturent", verifyUser, createNewResturent);
router.put("/resturent/:id", verifyUser, updateResturant);
router.delete("/resturent/:id", verifyUser, deleteResturant);
export default router;
