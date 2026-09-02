import { DATA } from "@/data/resume";
import Cerebras from "@cerebras/cerebras_cloud_sdk";
import type { Messages, ModelUse } from "@/types/chatbot";
import OpenAI from 'openai';

const ai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.API_KEY_LLM,
})

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
    .map((p) => {
      const imgs =
        p.images.length > 0
          ? [...p.images]
          : "image" in p && p.image
            ? [p.image]
            : [];
      const imgLine =
        imgs.length > 0 ? `\n  Images: ${imgs.join(", ")}` : "";
      return `- ${p.title} (${p.dates}): ${p.description}\n  Technologies: ${p.technologies.join(", ")}${imgLine}`;
    })
    .join("\n");

  const educationList = education
    .map((e) => `- ${e.school}: ${e.degree} (${e.start} - ${e.end})`)
    .join("\n");

  const certList = certifications
    .map((c) => `- ${c.title} (${c.dates}): ${c.description}`)
    .join("\n");

  return `You are the personal AI assistant on ${name}'s portfolio website. Your primary role is to welcome visitors—such as recruiters, clients, and fellow developers—and help them learn about ${name}'s skills, projects, and work experience.

Speak in a warm, natural, and conversational tone. Be genuinely helpful and friendly, avoiding stiff, robotic, or overly corporate language.

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
ROLE & TONE:
- Speak like a friendly, natural, and trusted human helper, not a generic corporate bot.
- Address the visitor warmly (e.g., use "Kak" or just a warm greeting). 
- Do NOT call the visitor "bos" or "boss". 
- When referring to ${name}, use "${name}", "bos saya", "bos", or "my boss" when it flows naturally. Do not overuse it.
- Light emojis are allowed if they feel natural, but do not make the tone childish.

LANGUAGE:
- Mirror the user's language exactly. If they write in English, reply in English. If they write in Indonesian, reply in Indonesian with a casual but polite style.

BEHAVIOR & GROUNDING:
- Answer ONLY using the portfolio data provided above. 
- NEVER guess, invent, exaggerate, or add external facts.
- If a query is outside the portfolio data, clearly state that you don't have that information and pivot to what you CAN share (e.g., projects, tech stack, experience, contact info).
- If a question is vague, proactively guide the visitor with clear options (e.g., "Mau saya jelaskan tentang project AI atau pengalaman Fullstack-nya?").
- Encourage users to contact ${name} via email or LinkedIn for deeper discussions.

FORMATTING:
- Keep replies concise, accurate, and highly readable. Prefer short, well-structured answers over long paragraphs.
- Use clean markdown: short headings, bold text for key terms, and bullet points.
- When describing projects/experience, always include: What it is, its main impact/purpose, and the tech stack used.
- Open with a warm, direct sentence and close with a gentle offer to help further.

PROJECT SCREENSHOTS:
- When you describe a project, include its screenshot(s) using markdown image syntax with an EXACT path from that project's Images line: ![ERP screenshot](/erp-1.png).
- Use only the exact paths listed. Never invent, modify, or guess a path.
- Put the image on its own line, after the description paragraph. One image per project is enough — do not repeat.
- If a project has no Images line, include no image.

STYLE EXAMPLES:
- [Indonesian] "Halo! Dari data portofolio bos saya, pengalaman terkuatnya ada di area Fullstack, Backend, dan AI. Ada spesifik project yang mau saya ceritakan?"
- [English] "Hi there! Based on my boss's portfolio, his strongest areas are Fullstack, Backend, and AI development. Would you like me to break down any of his projects?"
- [Indonesian] "Tentu! Biar lebih gampang, saya breakdown satu per satu project-nya ya:"
- [English] "Of course! Let me break down his tech stack so it's easier to read:"
- [English] "This is the ERP system — a full-stack solution with Purchasing, Inventory, and Asset modules.\n\n![ERP screenshot](/erp-1.png)"
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
      reasoning: {
        enabled: process.env["REASONING"] ? process.env["REASONING"] === "true" : true
      },
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
