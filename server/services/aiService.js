const { GoogleGenerativeAI } = require('@google/generative-ai');

/**
 * Helper to check if AI features are enabled and the API key is configured.
 */
const checkConfig = () => {
  if (process.env.ENABLE_AI_FEATURES !== 'true') {
    throw new Error('AI features are currently disabled by the administrator.');
  }
  if (!process.env.GOOGLE_GEMINI_API_KEY) {
    throw new Error('AI service configuration error. GOOGLE_GEMINI_API_KEY is not set.');
  }
};

/**
 * Helper to sanitize and parse JSON response from the AI model
 * @param {string} text - Response text from the model
 * @returns {Object} parsed JSON object
 */
const cleanAndParseJSON = (text) => {
  if (!text) {
    throw new Error('Empty response from AI service.');
  }

  let cleaned = text.trim();
  // Remove markdown JSON code blocks if present
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(json)?/i, '');
  }
  if (cleaned.endsWith('```')) {
    cleaned = cleaned.replace(/```$/, '');
  }
  cleaned = cleaned.trim();

  try {
    return JSON.parse(cleaned);
  } catch (error) {
    console.error('Failed to parse AI response as JSON. Original response:', text);
    throw new Error('Could not process request. Try simpler description or check inputs.');
  }
};

/**
 * Generate 5-10 subtasks from a goal description
 * @param {string} description - The user's goal description
 * @param {Array} userHistory - Contextual list of user's past tasks
 * @returns {Promise<Object>} Object containing mainTask, subtasks, totalDays, and motivation
 */
const generateTasksFromDescription = async (description, userHistory = []) => {
  checkConfig();

  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
  // ✅ FIXED: Changed from gemini-1.5-flash to gemini-pro
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

  const historyContext = userHistory && userHistory.length > 0
    ? userHistory.map(t => `- ${t.title} (${t.category}, priority: ${t.priority}, completed: ${t.completed})`).join('\n')
    : 'None';

  const prompt = `You are a productivity expert. The user wants to break down their goal description into actionable subtasks:
Goal Description: "${description}"

Their past tasks for context (to align with their workflow or categories):
${historyContext}

Generate detailed actionable subtasks in this exact JSON format:
{
  "mainTask": "An optimized title representing the main goal",
  "subtasks": [
    {
      "title": "Actionable, specific subtask title (max 100 characters)",
      "priority": "high" or "medium" or "low",
      "category": "study" or "work" or "personal" or "health",
      "estimatedHours": number,
      "description": "Clear instruction detailing how to perform this subtask (max 500 characters)"
    }
  ],
  "totalDays": number,
  "motivation": "A brief, highly encouraging and motivational sentence to get the user started (max 200 characters)"
}

Ensure you generate between 5 to 10 subtasks. Return ONLY the raw JSON object. Do not wrap it in markdown, and do not add any comments or extra text.`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return cleanAndParseJSON(text);
  } catch (error) {
    console.error('Gemini generateTasks error:', error);
    if (error.message.includes('API_KEY')) {
      throw new Error('AI service configuration error. Contact support.');
    }
    throw error;
  }
};

/**
 * Suggest next focus task from user's current todos
 * @param {Array} todos - List of user's pending/completed todos
 * @returns {Promise<Object>} Recommendation string and emoji
 */
const getSmartFocusRecommendation = async (todos = []) => {
  checkConfig();

  const pendingTodos = todos.filter(t => !t.completed);
  if (pendingTodos.length === 0) {
    return {
      recommendation: 'All tasks are complete! Take a break or create a new task.',
      emoji: '🎉'
    };
  }

  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
  // ✅ FIXED: Changed from gemini-1.5-flash to gemini-pro
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

  // Map pending todos to a clean structure for the prompt
  const listContext = pendingTodos
    .slice(0, 15) // send top 15 pending to prevent hitting token limits or confusing the AI
    .map(t => `- Title: "${t.title}", Priority: "${t.priority}", Category: "${t.category}", Due: ${t.dueDate ? new Date(t.dueDate).toISOString().split('T')[0] : 'None'}`)
    .join('\n');

  const prompt = `You are a focus coach. Given the following pending tasks:
${listContext}

Select the single best task for the user to work on right now. Make your choice based on:
1. High priority tasks
2. Tasks that have upcoming or overdue dates
3. Diversity of categories to avoid burnout

Provide a brief, motivational reason (under 100 characters) for why they should focus on this task.
Return ONLY JSON in this format:
{
  "recommendation": "Focus on '<task title>' because <reason>",
  "emoji": "<emoji>"
}

Do not return any other text, markdown, or code blocks.`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return cleanAndParseJSON(text);
  } catch (error) {
    console.error('Gemini focusRecommendation error:', error);
    // Return a logical fallback based on priority if the API fails
    const highPriority = pendingTodos.find(t => t.priority === 'high');
    const fallbackTodo = highPriority || pendingTodos[0];
    return {
      recommendation: `Focus on '${fallbackTodo.title}' because it has high priority on your list.`,
      emoji: '🎯'
    };
  }
};

/**
 * Improve vague task titles to make them specific and actionable
 * @param {string} title - Vague task title
 * @returns {Promise<string>} The improved title
 */
const improveTitle = async (title) => {
  checkConfig();

  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
  // ✅ FIXED: Changed from gemini-1.5-flash to gemini-pro
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

  const prompt = `You are a productivity expert. The user has a vague task title: "${title}".
Make this task title more specific, actionable, and clear. Keep it concise (under 50 characters).
Return ONLY JSON in this format:
{
  "improved": "improved actionable title"
}

Do not return any other text or explanation.`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const parsed = cleanAndParseJSON(text);
    return parsed.improved || title;
  } catch (error) {
    console.error('Gemini improveTitle error:', error);
    return `Complete ${title} details`; // Simple fallback
  }
};

/**
 * Estimate completion time for a task
 * @param {string} title - Task title
 * @param {string} description - Task description
 * @returns {Promise<Object>} Estimated hours and reasoning
 */
const estimateTime = async (title, description = '') => {
  checkConfig();

  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
  // ✅ FIXED: Changed from gemini-1.5-flash to gemini-pro
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro-latest' });

  const prompt = `You are a time management expert. Estimate the number of hours required to complete this task:
Task Title: "${title}"
Task Description: "${description || 'No description provided'}"

Estimate the hours required. Provide a brief one-sentence reasoning.
Return ONLY JSON in this exact format:
{
  "estimatedHours": number,
  "reasoning": "reasoning statement (max 120 characters)"
}

Do not return any other text.`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return cleanAndParseJSON(text);
  } catch (error) {
    console.error('Gemini estimateTime error:', error);
    return {
      estimatedHours: 2, // Standard default fallback
      reasoning: 'Standard default estimate for typical task requirements.'
    };
  }
};

module.exports = {
  generateTasksFromDescription,
  getSmartFocusRecommendation,
  improveTitle,
  estimateTime
};