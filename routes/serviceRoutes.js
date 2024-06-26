import express from "express";
import {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from "../controller/serviceController.js";
import isUser from "../middleware/validateTokenHandler.js";
import isAdmin from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", getAllServices);
router.get("/:id", getServiceById);
router.post("/create", isUser, isAdmin, createService);
router.put("/update/:id", isUser, isAdmin, updateService);
router.delete("/delete/:id", isUser, isAdmin, deleteService);

export default router;
