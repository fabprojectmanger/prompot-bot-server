import express from "express";
import ChatService from "../services/chat.service.js";
import PrompotUser from "../schemas/user.schema.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const headers = req.headers;
    await PrompotUser.findOneAndUpdate(
      { userId: req.body.userId },
      { headers, $push: { chatQueries: req.body.userPrompt } },
      { new: true, upsert: true }
    );

    await ChatService.createInteraction(req, res);
  } catch (err) {
    res.status(400).send(err);
  }
});

export default router;
