document.addEventListener("DOMContentLoaded", function () {
  const rewriteBtn = document.getElementById('rewriteBtn');
  const proofreadBtn = document.getElementById('proofreadBtn');
  const generateBtn = document.getElementById('generateBtn');
  const inputText = document.getElementById('inputText');
  const outputText = document.getElementById('outputText');

  // Function to interact with the backend server
  async function fetchAPI(endpoint, data) {
    try {
      const response = await fetch('http://localhost:3000/fetch-completion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Check if the response is OK
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error with API request:", error);
      outputText.value = "An error occurred while fetching the result. Please try again.";
    }
  }

  // Rewrite Button Click Event
  rewriteBtn.addEventListener("click", async () => {
    const input = inputText.value;
    const data = {
      model: "gpt-3.5-turbo", // or gpt-4
      messages: [
        { role: "system", content: "You are an AI writing assistant." },
        { role: "user", content: `Rewrite the following content to improve its clarity: "${input}"` }
      ],
      max_tokens: 100
    };

    try {
      const response = await fetchAPI("http://localhost:3000/fetch-completion", data);
      if (response && response.choices) {
        outputText.value = response.choices[0].message.content;
      } else {
        outputText.value = "No response from the server. Please try again.";
      }
    } catch (error) {
      outputText.value = "An error occurred while processing the rewrite request. Please try again.";
    }
  });

  // Proofread Button Click Event
  proofreadBtn.addEventListener("click", async () => {
    const input = inputText.value;
    const data = {
      model: "gpt-3.5-turbo", // or gpt-4
      messages: [
        { role: "system", content: "You are an AI writing assistant." },
        { role: "user", content: `Proofread and correct the following content: "${input}"` }
      ],
      max_tokens: 100
    };

    try {
      const response = await fetchAPI("http://localhost:3000/fetch-completion", data);
      if (response && response.choices) {
        outputText.value = response.choices[0].message.content;
      } else {
        outputText.value = "No response from the server. Please try again.";
      }
    } catch (error) {
      outputText.value = "An error occurred while processing the proofreading request. Please try again.";
    }
  });

  // Generate Button Click Event
  generateBtn.addEventListener("click", async () => {
    const input = inputText.value;
    const data = {
      model: "gpt-3.5-turbo", // or gpt-4
      messages: [
        { role: "system", content: "You are an AI writing assistant." },
        { role: "user", content: `Generate content on the following topic: "${input}"` }
      ],
      max_tokens: 200
    };

    try {
      const response = await fetchAPI("http://localhost:3000/fetch-completion", data);
      if (response && response.choices) {
        outputText.value = response.choices[0].message.content;
      } else {
        outputText.value = "No response from the server. Please try again.";
      }
    } catch (error) {
      outputText.value = "An error occurred while processing the content generation request. Please try again.";
    }
  });
});
