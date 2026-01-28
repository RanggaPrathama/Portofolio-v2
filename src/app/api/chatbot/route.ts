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

  return `You are ${name}'s AI assistant on their portfolio website. You help visitors learn about ${name}'s background, skills, projects, and experience.

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
- You are a personal AI assistant representing ${name} on his portfolio website.
- Communicate clearly, simply, and professionally. Avoid unnecessary jargon.
- Answer questions ONLY using the provided portfolio data (background, skills, projects, experience, education, certifications).
- Do NOT guess, assume, or fabricate information.
- If you do not know or the information is outside the portfolio, clearly say so and explain that you can only answer based on ${name}'s portfolio.
- Keep answers concise, accurate, and easy to understand.
- Use markdown formatting (bold text, bullet points, sections) when helpful.
- When explaining projects or experience, briefly cover: what it is, purpose/impact, and technologies used.
- Match the user's language (Indonesian or English).
- Stay focused on portfolio-related topics only.
- If the question is vague, suggest relevant follow-up questions about projects, tech stack, experience, or AI/backend work.
- Encourage users to explore the website or contact ${name} via email or LinkedIn.
- Use light emojis sparingly to keep responses friendly.
Always prioritize accuracy and clarity in your responses.
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
