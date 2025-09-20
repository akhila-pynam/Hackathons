// popup.js
document.addEventListener("DOMContentLoaded", function () {
  const rewriteBtn = document.getElementById('rewriteBtn');
  const proofreadBtn = document.getElementById('proofreadBtn');
  const generateBtn = document.getElementById('generateBtn');
  const inputText = document.getElementById('inputText');
  const outputText = document.getElementById('outputText');

  const apiKey = "YOUR_API_KEY";  // Replace with your API key for OpenAI or other AI model

  async function fetchAPI(endpoint, data) {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  }

  rewriteBtn.addEventListener("click", async () => {
    const input = inputText.value;
    const data = {
      prompt: `Rewrite the following content to improve its clarity: "${input}"`,
      max_tokens: 100,
    };
    const response = await fetchAPI("https://api.openai.com/v1/completions", data);
    outputText.value = response.choices[0].text;
  });

  proofreadBtn.addEventListener("click", async () => {
    const input = inputText.value;
    const data = {
      prompt: `Proofread and correct the following content: "${input}"`,
      max_tokens: 100,
    };
    const response = await fetchAPI("https://api.openai.com/v1/completions", data);
    outputText.value = response.choices[0].text;
  });

  generateBtn.addEventListener("click", async () => {
    const input = inputText.value;
    const data = {
      prompt: `Generate content on the following topic: "${input}"`,
      max_tokens: 200,
    };
    const response = await fetchAPI("https://api.openai.com/v1/completions", data);
    outputText.value = response.choices[0].text;
  });
});
