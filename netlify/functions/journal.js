
const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  try {
    const { entry } = JSON.parse(event.body);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.VITE_OPENAI_API_key}`
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { role: "system", content: "You are a mindful journaling assistant." },
          { role: "user", content: `Reflect on this journal entry: ${entry}` }
        ]
      })
    });

    const data = await response.json();

    if (!data || !data.choices || !data.choices[0]) {
      console.error("OpenAI response error:", data);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Invalid response from OpenAI." })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        insight: data.choices[0].message.content
      })
    };
  } catch (error) {
    console.error("Journal API error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to process journal entry." })
    };
  }
};
