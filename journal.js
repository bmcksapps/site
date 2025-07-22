
const { Configuration, OpenAIApi } = require("openai");

exports.handler = async (event) => {
  try {
    const { entry } = JSON.parse(event.body || "{}");

    const configuration = new Configuration({
      apiKey: process.env.VITE_OPENAI_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a helpful and calm journaling assistant." },
        { role: "user", content: `Reflect on this journal entry: ${entry}` },
      ],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        insight: completion.data.choices[0].message.content,
      }),
    };
  } catch (err) {
    console.error("AI Journal Error:", err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to process journal entry" }),
    };
  }
};
