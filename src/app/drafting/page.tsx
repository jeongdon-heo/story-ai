"use client";

import React, { useState } from 'react';
import DraftingEditor from '@/components/drafting/DraftingEditor';
import { ChevronLeft, ChevronRight, BookOpen, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function DraftingPage() {
    const [showOutline, setShowOutline] = useState(true);
    const [content, setContent] = useState('');
    const [messages, setMessages] = useState([
        { role: 'assistant', content: '멋진 제목이네! "우리 동네 탐험기"라니 기대된다. \n\n먼저 동네의 전체적인 분위기를 한 문장으로 시작해볼까?' }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const sendMessage = async (customText?: string) => {
        const textToSend = customText || inputMessage;
        if (!textToSend.trim() || isLoading) return;

        const newMessages = [...messages, { role: 'user', content: textToSend }];
        setMessages(newMessages);
        if (!customText) setInputMessage('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: newMessages, stage: 'drafting' }),
            });
            const data = await response.json();
            if (data.text) {
                setMessages([...newMessages, { role: 'assistant', content: data.text }]);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleHint = (hint: string) => {
        setMessages(prev => [...prev, { role: 'assistant', content: `💡 힌트: ${hint}` }]);
    };

    return (
        <main className="min-h-screen p-6 md:p-12 max-w-7xl mx-auto">
            <header className="flex items-center justify-between mb-8">
                <Link href="/planning" className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors">
                    <ChevronLeft size={20} />
                    <span>계획 단계로</span>
                </Link>

                <div className="flex items-center gap-4 bg-slate-100 p-1 rounded-2xl">
                    <div className="px-6 py-2 text-slate-400 font-bold">1. 계획</div>
                    <div className="px-6 py-2 bg-white shadow-sm text-emerald-600 rounded-xl font-bold">2. 초고</div>
                    <div className="px-6 py-2 text-slate-400 font-bold">3. 수정</div>
                    <div className="px-6 py-2 text-slate-400 font-bold">4. 발표</div>
                </div>

                <Link
                    href="/revising"
                    className="flex items-center gap-2 bg-blue-500 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-600 transition-all shadow-sm"
                >
                    <span>수정하러 가기</span>
                    <ChevronRight size={20} />
                </Link>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Left Sidebar: Outline Peek */}
                <div className={`lg:col-span-1 transition-all ${showOutline ? 'block' : 'hidden'}`}>
                    <div className="glass p-6 rounded-[2rem] bg-amber-50/30 border-amber-100 h-full">
                        <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <BookOpen size={18} className="text-amber-500" />
                            나의 계획 한눈에
                        </h4>
                        <div className="space-y-4">
                            <div>
                                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">제목</p>
                                <p className="text-sm font-bold text-slate-700">우리 동네 탐험기</p>
                            </div>
                            <div className="p-3 bg-white/50 rounded-xl border border-amber-50">
                                <p className="text-[10px] uppercase tracking-wider text-amber-500 font-bold mb-1">처음</p>
                                <p className="text-xs text-slate-600">동네의 재미있는 곳들을 소개한다.</p>
                            </div>
                            <div className="p-3 bg-white/50 rounded-xl border border-amber-50">
                                <p className="text-[10px] uppercase tracking-wider text-emerald-500 font-bold mb-1">가운데</p>
                                <ul className="text-xs text-slate-600 list-disc list-inside space-y-1">
                                    <li>재래시장의 풍경</li>
                                    <li>작은 공원과 고양이들</li>
                                    <li>맛있는 떡볶이 집</li>
                                </ul>
                            </div>
                            <div className="p-3 bg-white/50 rounded-xl border border-amber-50">
                                <p className="text-[10px] uppercase tracking-wider text-purple-500 font-bold mb-1">끝</p>
                                <p className="text-xs text-slate-600">내가 우리 동네를 사랑하는 이유.</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowOutline(false)}
                            className="mt-6 w-full py-2 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            접어두기
                        </button>
                    </div>
                </div>

                {/* Main Editor */}
                <div className={`${showOutline ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
                    <DraftingEditor content={content} setContent={setContent} onHint={handleHint} />
                </div>

                {/* Right Sidebar: AI Coach */}
                <div className="lg:col-span-1">
                    <div className="glass p-8 rounded-[2.5rem] bg-emerald-50/50 sticky top-12 border-emerald-100 flex flex-col h-[calc(100vh-12rem)]">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                                <span className="text-2xl">🤖</span>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800">AI 코치</h4>
                                <p className="text-xs text-slate-500">초고 작성 돕는 중</p>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-4 mb-6 pr-2 custom-scrollbar">
                            {messages.map((m, i) => (
                                <div
                                    key={i}
                                    className={`p-4 rounded-2xl shadow-sm border ${m.role === 'assistant'
                                            ? 'bg-white rounded-tl-none border-emerald-50'
                                            : 'bg-emerald-600 text-white rounded-tr-none border-emerald-500 self-end ml-4'
                                        }`}
                                >
                                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.content}</p>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-emerald-50 w-fit">
                                    <div className="flex gap-1">
                                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" />
                                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="relative mt-auto">
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                                placeholder="코치에게 질문하기..."
                                className="w-full pl-4 pr-12 py-4 rounded-2xl bg-white border border-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-sm"
                            />
                            <button
                                onClick={() => sendMessage()}
                                disabled={isLoading}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 disabled:opacity-50"
                            >
                                <MessageCircle size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
