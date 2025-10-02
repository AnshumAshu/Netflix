import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI({
  apiKey: import.meta.env.VITE_GOOGLE_GENAI_API_KEY, // ✅ must be object
});

const config = {
  responseMimeType: "text/plain",
};

const model = ai.getGenerativeModel({ model: "gemini-1.5-flash-latest" }); // ✅ use latest

export async function getAIRecommendation(prompt) {
  try {
    const response = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: config,
    });

    return response.response.text(); // ✅ correct way to get text
  } catch (error) {
    console.error("Error sending message: ", error);
    return null;
  }
}
