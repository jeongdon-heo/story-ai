"use client";

import React, { useState } from 'react';
import MindMap from '@/components/planning/MindMap';
import OutlineEditor from '@/components/planning/OutlineEditor';
import { ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function PlanningPage() {
    const [activeTab, setActiveTab] = useState<'mindmap' | 'outline'>('mindmap');

    const [messages, setMessages] = useState([
        { role: 'assistant', content: '반가워! 어떤 이야기를 써보고 싶니? 생각 그물에 네가 좋아하는 단어들을 하나씩 적어보자. 🌟' }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const sendMessage = async () => {
        if (!inputMessage.trim() || isLoading) return;

        const newMessages = [...messages, { role: 'user', content: inputMessage }];
        setMessages(newMessages);
        setInputMessage('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: newMessages, stage: 'planning' }),
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

    return (
        <main className="min-h-screen p-6 md:p-12 max-w-7xl mx-auto">
            <header className="flex items-center justify-between mb-12">
                <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors">
                    <ChevronLeft size={20} />
                    <span>목록으로</span>
                </Link>
                <div className="flex bg-slate-100 p-1 rounded-2xl">
                    <button
                        onClick={() => setActiveTab('mindmap')}
                        className={`px-8 py-2 rounded-xl font-bold transition-all ${activeTab === 'mindmap' ? 'bg-white shadow-sm text-amber-600' : 'text-slate-500'
                            }`}
                    >
                        이미지 맵
                    </button>
                    <button
                        onClick={() => setActiveTab('outline')}
                        className={`px-8 py-2 rounded-xl font-bold transition-all ${activeTab === 'outline' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'
                            }`}
                    >
                        이야기 뼈대
                    </button>
                </div>
                <Link
                    href="/drafting"
                    className="flex items-center gap-2 bg-emerald-500 text-white px-6 py-2 rounded-xl font-bold hover:bg-emerald-600 transition-all shadow-sm"
                >
                    <span>글 쓰러 가기</span>
                    <ChevronRight size={20} />
                </Link>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    {activeTab === 'mindmap' ? <MindMap /> : <OutlineEditor />}
                </div>

                <div className="lg:col-span-1">
                    <div className="glass p-8 rounded-[2.5rem] bg-indigo-50/50 sticky top-12 border-indigo-100 flex flex-col h-[calc(100vh-12rem)]">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                                <span className="text-2xl">🤖</span>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800">AI 코치</h4>
                                <p className="text-xs text-slate-500">글쓰기 도우미</p>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-4 mb-6 pr-2 custom-scrollbar">
                            {messages.map((m, i) => (
                                <div
                                    key={i}
                                    className={`p-4 rounded-2xl shadow-sm border ${m.role === 'assistant'
                                            ? 'bg-white rounded-tl-none border-indigo-50'
                                            : 'bg-indigo-600 text-white rounded-tr-none border-indigo-500 self-end ml-4'
                                        }`}
                                >
                                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.content}</p>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-indigo-50 w-fit">
                                    <div className="flex gap-1">
                                        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" />
                                        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                                        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.4s]" />
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
                                className="w-full pl-4 pr-12 py-4 rounded-2xl bg-white border border-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
                            />
                            <button
                                onClick={sendMessage}
                                disabled={isLoading}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 disabled:opacity-50"
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
