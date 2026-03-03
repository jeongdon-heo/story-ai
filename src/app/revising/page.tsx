"use client";

import React, { useState } from 'react';
import FeedbackReport from '@/components/revising/FeedbackReport';
import { ChevronLeft, ChevronRight, PenTool, MessageCircle, Undo2, Redo2, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function RevisingPage() {
    const [content, setContent] = useState('우리 동네에는 재미있는 곳이 많음니다. 시장에는 생선도 있고 과일도 있습니다. 공원에는 귀여운 고양이들이 살고 있습니다. 나는 우리 동네가 참 좋슴니다.');
    const [feedbacks, setFeedbacks] = useState<any[]>([]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [coachMessage, setCoachMessage] = useState('"시장" 부분을 고칠 때는 시장에서 들렸던 활기찬 소리들을 문장으로 표현해보면 어떨까? "북적북적", "왁자지껄" 같은 말을 써봐!');

    const analyzeContent = async () => {
        if (isAnalyzing) return;
        setIsAnalyzing(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [
                        {
                            role: 'user', content: `다음 초등학생이 쓴 글을 분석해서 3가지 피드백을 JSON 형식으로 줘. 
                형식: { "feedbacks": [{ "type": "good" | "check" | "info", "title": "제목", "desc": "설명" }], "coachHighlight": "코치가 해줄 핵심 조언 한문장" }
                글: "${content}"`
                        }
                    ],
                    stage: 'revising'
                }),
            });
            const data = await response.json();
            // Simple parsing of JSON from text if needed, but for MVP let's assume valid JSON start/end
            const jsonStart = data.text.indexOf('{');
            const jsonEnd = data.text.lastIndexOf('}') + 1;
            const result = JSON.parse(data.text.substring(jsonStart, jsonEnd));

            setFeedbacks(result.feedbacks);
            setCoachMessage(result.coachHighlight);
        } catch (error) {
            console.error(error);
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <main className="min-h-screen p-6 md:p-12 max-w-7xl mx-auto">
            <header className="flex items-center justify-between mb-8">
                <Link href="/drafting" className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors">
                    <ChevronLeft size={20} />
                    <span>초고 단계로</span>
                </Link>

                <div className="flex items-center gap-4 bg-slate-100 p-1 rounded-2xl">
                    <div className="px-6 py-2 text-slate-400 font-bold">1. 계획</div>
                    <div className="px-6 py-2 text-slate-400 font-bold">2. 초고</div>
                    <div className="px-6 py-2 bg-white shadow-sm text-blue-600 rounded-xl font-bold">3. 수정</div>
                    <div className="px-6 py-2 text-slate-400 font-bold">4. 발표</div>
                </div>

                <Link
                    href="/publishing"
                    className="flex items-center gap-2 bg-purple-500 text-white px-6 py-2 rounded-xl font-bold hover:bg-purple-600 transition-all shadow-sm"
                >
                    <span>완성하러 가기</span>
                    <ChevronRight size={20} />
                </Link>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-slate-800">
                <div className="lg:col-span-2">
                    <div className="glass p-8 rounded-[2.5rem] bg-white/40 flex flex-col h-full min-h-[500px]">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-xl font-bold text-sm">
                                <PenTool size={16} />
                                더 멋지게 다듬어보자!
                            </div>
                            <button
                                onClick={analyzeContent}
                                disabled={isAnalyzing}
                                className="bg-blue-500 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-600 shadow-sm disabled:opacity-50 flex items-center gap-2"
                            >
                                <Sparkles size={16} />
                                {isAnalyzing ? '분석 중...' : 'AI 분석하기'}
                            </button>
                        </div>
                        <textarea
                            className="w-full h-full p-8 rounded-3xl bg-white/60 border border-blue-100 focus:outline-none focus:ring-4 focus:ring-blue-400/20 text-xl leading-relaxed resize-none custom-scrollbar"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <FeedbackReport feedbacks={feedbacks} isLoading={isAnalyzing} />
                </div>
            </div>

            {/* AI Coach Floating chat or fixed bottom section */}
            <div className="mt-8 flex justify-center">
                <div className="glass px-8 py-4 rounded-[3rem] bg-white border-blue-100 shadow-xl flex items-center gap-6 max-w-2xl w-full">
                    <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center shrink-0">
                        <span className="text-2xl">🤖</span>
                    </div>
                    <p className="text-sm text-slate-600 leading-normal flex-1">
                        <strong className="text-slate-800 block mb-1">코치의 생각</strong>
                        {coachMessage}
                    </p>
                    <button className="p-3 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 transition-all">
                        <MessageCircle size={20} />
                    </button>
                </div>
            </div>
        </main>
    );
}
