import express from "express";
import {
  createDraft,
  getDrafts,
  deleteDraft,
} from "../controllers/draftController.js";

const dreaftRouter = express.Router();

// Creating a new order
dreaftRouter.post("/createDraft", createDraft);

// Getting all orders
dreaftRouter.get("/getDrafts", getDrafts);

// Updating an order by ID
dreaftRouter.post("/deleteDraft", deleteDraft);

export default dreaftRouter;
