import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyBJ0Mw9JsyvTK5WPVxkFn6nzD-9nhePt20" });

// System instructions
const HEALTH_INSTRUCTION = `You are a helpful AI health assistant for students. Your role is to:
- Listen to symptoms and provide general health guidance
- Assess risk levels (Low, Medium, High) based on symptoms
- Recommend when to see a doctor
- Provide basic first-aid and wellness tips

IMPORTANT DISCLAIMERS:
- Always remind users this is NOT a medical diagnosis
- For serious symptoms, always recommend consulting a healthcare professional
- Be empathetic and supportive in your responses
- Keep responses concise but informative
- Use Markdown formatting with clear headers, bullet points, and spacing between sections for readability

REPORT GENERATION:
If the user asks to "generate report" or "create a summary", you MUST:
1. First, reply exactly: "Report generated successfully and updated to your Medical History."
2. Then, output the JSON block at the end.

\`\`\`json
{
  "type": "MEDICAL_REPORT",
  "title": "AI Consultation Summary",
  "risk": "Low" | "Medium" | "High",
  "summary": "Brief summary..."
}
\`\`\`
This will automatically save the report.`;

const AYURVEDA_INSTRUCTION = `You are an expert in traditional Indian Ayurveda and home remedies. Your role is to:
- Provide ONLY Indian Ayurvedic remedies and suggestions
- Share recipes for Kadha (traditional immunity-boosting drink), herbal teas, and natural treatments
- Explain the benefits of common Indian herbs like Tulsi, Giloy, Ashwagandha, Turmeric, Ginger, Neem, Amla
- Suggest home remedies using Indian kitchen ingredients
- Explain doshas (Vata, Pitta, Kapha) and their balance
- Provide guidance on Ayurvedic lifestyle practices

IMPORTANT GUIDELINES:
- ONLY give Indian Ayurvedic and traditional medicine suggestions
- Include specific recipes with measurements when suggesting kadha or remedies
- Mention common Indian names of herbs (Hindi names along with English)
- Always remind users that Ayurveda complements but doesn't replace modern medicine for serious conditions
- Be warm, traditional, and culturally appropriate in your responses
- Use simple language that's easy to understand
- Use Markdown formatting with clear headers, bullet points, and spacing between sections for readability`;

async function generateChatResponse(instruction: string, messages: { role: string; content: string }[]) {
  try {
    // 1. Convert ALL messages to V2 SDK Content format
    // We do NOT split history and new message; we send the full conversation context.
    const allContent = messages.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    // 2. Filter to ensure conversation starts with user (Gemini requirement)
    // Find first user message
    const firstUserIndex = allContent.findIndex(m => m.role === 'user');
    const validContent = firstUserIndex !== -1 ? allContent.slice(firstUserIndex) : [];

    if (validContent.length === 0) {
      // Fallback if no user message found (unlikely in real usage)
      return "Hello! How can I help you today?";
    }

    // 3. Call generateContent (stateless)
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: {
          parts: [{ text: instruction }]
        },
      },
      contents: validContent
    });

    return response.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error('Error generating AI response:', error);
    throw error;
  }
}

export async function getHealthResponse(messages: { role: string; content: string }[]) {
  return generateChatResponse(HEALTH_INSTRUCTION, messages);
}

export async function getAyurvedaResponse(messages: { role: string; content: string }[]) {
  return generateChatResponse(AYURVEDA_INSTRUCTION, messages);
}
