const fetch = require('node-fetch');

async function generateOrder(query, openaiKey) {
  const openaiUrl = 'https://api.openai.com/v1/engines/davinci/completions';
  const payload = {
    prompt: `Generate a restaurant order based on the following request: ${query}`,
    max_tokens: 50,
    temperature: 0.7
  };

  try {
    const response = await fetch(openaiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiKey}`
      },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    if (data.choices && data.choices.length > 0) {
      return data.choices[0].text.trim();
    } else {
      throw new Error('No completion received');
    }
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw error;
  }
}

module.exports = { generateOrder };