import * as dotenv from "dotenv";
import { createError } from "../error.js";
import fetch from "node-fetch";

dotenv.config();

const hf_token = process.env.HF_TOKEN;

export const generateImage = async (req, res, next) => {
  try {
    const { prompt } = req.body;
    const response = await fetch(
      "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev",
      {
        headers: {
          Authorization: `Bearer ${hf_token}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ inputs: `${prompt}` }),
      }
    );
    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    let contentType = response.headers.get("content-type");
    let buffer = await response.buffer();
    const generatedImageBase64 = buffer.toString("base64");
    // Send the generated image Base64 URL string in the response
    return res.status(200).json({ photo: generatedImageBase64 });
  } catch (error) {
    console.log(error);
    next(
      createError(
        error.status,
        error?.response?.data?.error.message || error?.message
      )
    );
  }
};
// generateImage({ prompt: "car" }).then((r) => {
//   console.log(r);
// });
