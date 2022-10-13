import express from "express";
import {
  getDomainsList,
  createNewDomains,
  updateDomains,
  deleteDomains,
} from "../controllers/domains.js";
import { verifyUser } from "../controllers/verifyToken.js";
const router = express.Router();

router.get("/domains", verifyUser, getDomainsList);
router.post("/domains", verifyUser, createNewDomains);
router.put("/domains/:id", verifyUser, updateDomains);
router.delete("/domains/:id", verifyUser, deleteDomains);
export default router;
