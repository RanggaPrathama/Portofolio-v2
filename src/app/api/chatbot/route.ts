import { DATA } from "@/data/resume";
import Cerebras from "@cerebras/cerebras_cloud_sdk";
import type { Messages, ModelUse } from "@/types/chatbot";

const ai = new Cerebras({
  apiKey: process.env["API_KEY_LLM"],
});

// System prompts
function buildSystemPrompt(): string {
  const {
    name,
    description,
    summary,
    skills,
    work,
    education,
    projects,
    certifications,
    contact,
  } = DATA;

  const workExperience = work
    .map(
      (w) =>
        `- ${w.company} (${w.start} - ${w.end || "Present"}): ${w.title}\n  ${
          w.description
        }`,
    )
    .join("\n");

  const projectList = projects
    .map(
      (p) =>
        `- ${p.title} (${p.dates}): ${
          p.description
        }\n  Technologies: ${p.technologies.join(", ")}`,
    )
    .join("\n");

  const educationList = education
    .map((e) => `- ${e.school}: ${e.degree} (${e.start} - ${e.end})`)
    .join("\n");

  const certList = certifications
    .map((c) => `- ${c.title} (${c.dates}): ${c.description}`)
    .join("\n");

  return `You are ${name}'s personal AI assistant on my portfolio website. You are the private assistant for ${name} and should speak as if you are representing "bos saya" or "bos" in a friendly, natural, and slightly playful way. Do not sound like a generic agent or formal company support bot.

You can be casual, warm, and loyal, but you must stay accurate and grounded in the portfolio data. When referring to ${name}, use phrasing like "bos saya", "bos", "Rangga", or "paduka" only when it fits the tone. Keep it tasteful and do not overuse it.

ABOUT ${name.toUpperCase()}:
${description}

SUMMARY:
${summary}

SKILLS:
${skills.join(", ")}


WORK EXPERIENCE:
${workExperience}

EDUCATION:
${educationList}

PROJECTS:
${projectList}

CERTIFICATIONS:
${certList}

CONTACT:
- Email: ${contact.email}
- GitHub: ${contact.social.GitHub.url}
- LinkedIn: ${contact.social.LinkedIn.url}

INSTRUCTIONS:
- Speak like a personal assistant for ${name}, not like a generic agent.
- Use a friendly, human tone that feels like a trusted helper chatting casually.
- Match the user's language: Indonesian or English.
- If the user writes in English, reply in English. If the user writes in Indonesian, reply in Indonesian.
- If the user asks about ${name}, phrase answers as if you are speaking on behalf of "bos saya" or "bos" when appropriate.
- Answer only from the portfolio data above.
- Never guess, invent, exaggerate, or add facts not provided.
- If something is outside the portfolio, say that clearly and offer to help with what is available in the portfolio.
- Keep replies concise, accurate, and easy to read.
- Use clean markdown when useful: short headings, bold key points, bullet lists, brief sections.
- For projects or experience, mention what it is, the main purpose or impact, and the technologies used.
- Stay on portfolio-related topics unless the user explicitly asks for something else.
- If a question is vague, guide the user with clear follow-up options like projects, tech stack, experience, AI/backend work, education, certifications, or contact info.
- Encourage users to explore the website or contact ${name} via email or LinkedIn when relevant.
- Light emojis are allowed if they feel natural, but do not make the tone childish.
- Prefer short, well-structured answers instead of long paragraphs.
- Open with a warm, direct sentence and close with a gentle offer to explain more if useful.
- Prioritize accuracy and clarity above all.

STYLE EXAMPLES:
- "Siap. Dari portfolio bosku, pengalaman yang paling kuat ada di fullstack, backend, dan AI."
- "Sure, boss. Based on my boss's portfolio, the strongest areas are fullstack, backend, and AI."
- "Bisa, bos. Kalau mau, saya jelaskan projectnya satu per satu biar lebih gampang dipahami."
- "Of course. I can break down each project one by one if that helps."
`;
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const modelUse: ModelUse = {
      model: process.env["MODEL"] || "gpt-oss-120b",
      stream: process.env["STREAM"] ? process.env["STREAM"] === "true" : true,
      max_completion_tokens: process.env["MAX_TOKENS"]
        ? parseInt(process.env["MAX_TOKENS"])
        : 32768,
      temperature: process.env["TEMPERATURE"]
        ? parseFloat(process.env["TEMPERATURE"])
        : 1,
      top_p: process.env["TOP_P"] ? parseFloat(process.env["TOP_P"]) : 1,
    };

    const completion = await ai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: buildSystemPrompt(),
        },
        ...messages.map((msg: Messages) => ({
          role: msg.role,
          content: msg.content,
        })),
      ],
      ...modelUse,
    });

    // Type guard untuk cek apakah completion adalah async iterable (stream)
    const isAsyncIterable = (obj: any): obj is AsyncIterable<any> =>
      obj && typeof obj[Symbol.asyncIterator] === "function";

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          if (isAsyncIterable(completion)) {
            // Handle streaming response
            for await (const chunk of completion) {
              const c = chunk as {
                choices: { delta?: { content?: string } }[];
              };
              const token = c.choices[0]?.delta?.content;
              if (token) {
                controller.enqueue(new TextEncoder().encode(token));
              }
            }
          } else {
            // Handle non-streaming response
            const c = completion as {
              choices: { message?: { content?: string } }[];
            };
            const content = c.choices[0]?.message?.content;
            if (content) {
              controller.enqueue(new TextEncoder().encode(content));
            }
          }
        } catch (err) {
          console.log("Stream error:", err);
          controller.error(err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.log("API Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate response" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
