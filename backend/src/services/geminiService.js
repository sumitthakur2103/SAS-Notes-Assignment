const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-3-flash-preview",
});

exports.summarize = async ({ title, content }) => {
  try {
    const prompt = `
    Summarize this note:

    Title: ${title}

    Content:
    ${content}
    `;

    const result = await model.generateContent(prompt);

    return result.response.text();
  } catch (error) {
    console.error("Gemini Summary Error:", error);
    throw new Error("Failed to generate summary");
  }
};

exports.generateTitle = async (content) => {
  try {
    const result = await model.generateContent(
      `Generate a short title:\n${content}`
    );

    return result.response.text();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to generate title");
  }
};

exports.extractActions = async (content) => {
  try {
    const result = await model.generateContent(
      `Extract action items:\n${content}`
    );

    return result.response.text();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to extract actions");
  }
};