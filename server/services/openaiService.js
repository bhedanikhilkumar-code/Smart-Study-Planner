import OpenAI from 'openai';
import { env } from '../utils/env.js';

const client = env.OPENAI_API_KEY ? new OpenAI({ apiKey: env.OPENAI_API_KEY }) : null;

export const generateStudyPlan = async (payload) => {
  if (!client) {
    return {
      weeklyPlan: [],
      prioritySubjects: payload.weakSubjects,
      revisionTips: ['Set 25-minute focused sessions', 'Use active recall and spaced repetition'],
      focusAdvice: 'Add OPENAI_API_KEY to enable AI-generated dynamic plans.'
    };
  }

  const prompt = `You are an academic productivity assistant. Return STRICT JSON only with shape:
{
  "weeklyPlan": [],
  "prioritySubjects": [],
  "revisionTips": [],
  "focusAdvice": ""
}

Input:
${JSON.stringify(payload, null, 2)}
`;

  const completion = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: 'Always return strict JSON without markdown.' },
      { role: 'user', content: prompt }
    ]
  });

  return JSON.parse(completion.choices[0].message.content);
};
