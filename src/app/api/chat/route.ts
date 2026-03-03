import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// IMPORTANT: API key should be in .env.local
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

export async function POST(req: Request) {
    try {
        const { messages, stage } = await req.json();
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const systemPrompt = `
당신은 초등학생의 글쓰기를 돕는 친절한 글쓰기 코치입니다.
현재 단계: ${stage}

원칙:
1. 절대로 글을 대신 써주지 마십시오.
2. 질문을 통해 학생의 생각을 끌어내십시오.
3. 학년 수준에 맞는 쉬운 말을 사용하십시오.
4. 칭찬을 먼저 하고, 개선점을 부드럽게 제안하십시오.
5. 한 번에 하나의 피드백만 제공하십시오.
6. 만약 사용자가 JSON 형식을 요청하면, 마크다운 코드 블록 없이 순수 JSON만 반환하십시오.
`;

        const result = await model.generateContent([systemPrompt, ...messages.map((m: any) => `${m.role}: ${m.content}`)]);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ text });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "AI 요청 중 오류가 발생했습니다." }, { status: 500 });
    }
}
