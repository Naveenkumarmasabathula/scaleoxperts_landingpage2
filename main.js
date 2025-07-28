// Extracted from land1.html
// --- Gemini API Call Function ---
const callGemini = async (prompt) => {
    const apiKey = "${GEMINI_API_KEY}"; // API key is now handled by environment
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    const payload = {
        contents: [{
            role: "user",
            parts: [{ text: prompt }]
        }]
    };
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            throw new Error(`API call failed with status: ${response.status}`);
        }
        const result = await response.json();
        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
            return result.candidates[0].content.parts[0].text;
        } else {
            console.error("Unexpected API response structure:", result);
            return "Sorry, we couldn't generate a response right now.";
        }
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return "An error occurred. Please try again later.";
    }
};
// --- ✨ AI Headline Generator ---
// ... (rest of the JavaScript from land1.html) ... 