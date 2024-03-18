import { getStreamingCompletion } from "../utils/openai.js";

const service = {
  createInteraction,
};

async function createInteraction(req, res) {
  try {
    const { userPrompt } = req.body;
    const stream = await getStreamingCompletion({ userPrompt });
    for await (const part of stream) {
      res.write(part.choices[0]?.delta?.content || "");
    }

    res.end();
  } catch (err) {
    throw err;
  }
}

export default service;
