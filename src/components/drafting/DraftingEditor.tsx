"use client";

import React, { useState } from 'react';
import { Sparkles, Save, Undo2, Redo2 } from 'lucide-react';

interface DraftingEditorProps {
    content: string;
    setContent: (content: string) => void;
    onHint: (hint: string) => void;
}

export default function DraftingEditor({ content, setContent, onHint }: DraftingEditorProps) {
    const [isHintLoading, setIsHintLoading] = useState(false);

    const handleHint = async () => {
        if (isHintLoading) return;
        setIsHintLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [
                        { role: 'user', content: `현재 내가 쓴 글이야: "${content}"\n이 다음에 무엇을 쓰면 좋을지 힌트를 한 문장으로 친절하게 알려줘. 절대 글을 대신 써주지는 마.` }
                    ],
                    stage: 'drafting'
                }),
            });
            const data = await response.json();
            if (data.text) {
                onHint(data.text);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsHintLoading(false);
        }
    };

    return (
        <div className="glass p-8 rounded-[2.5rem] bg-white/40 flex flex-col h-full min-h-[500px]">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <button className="p-2 text-slate-400 hover:text-slate-800 transition-colors">
                        <Undo2 size={20} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-slate-800 transition-colors">
                        <Redo2 size={20} />
                    </button>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-slate-600 font-bold hover:bg-white/50 transition-all">
                        <Save size={18} />
                        임시 저장
                    </button>
                </div>
            </div>

            <div className="flex-1 relative">
                <textarea
                    className="w-full h-full p-8 rounded-3xl bg-white/60 border border-emerald-100 focus:outline-none focus:ring-4 focus:ring-emerald-400/20 text-xl leading-relaxed resize-none custom-scrollbar"
                    placeholder="여기에 이야기를 자유롭게 써보세요. 막히면 아래의 힌트 버튼을 눌러보세요!"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <button
                    onClick={handleHint}
                    disabled={isHintLoading}
                    className={`absolute bottom-6 right-6 flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all shadow-lg ${isHintLoading
                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-emerald-400 to-teal-500 text-white hover:scale-105 active:scale-95'
                        }`}
                >
                    <Sparkles size={18} className={isHintLoading ? 'animate-pulse' : ''} />
                    {isHintLoading ? '생각하는 중...' : '💡 힌트가 필요해요'}
                </button>
            </div>

            <div className="mt-6 flex items-center justify-between text-sm text-slate-500 font-medium">
                <div className="flex gap-4">
                    <span>글자 수: <strong className="text-slate-800">{content.length}</strong>자</span>
                    <span>문단: <strong className="text-slate-800">{content.split('\n').filter(p => p.trim()).length}</strong>개</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span>자동 저장됨</span>
                </div>
            </div>
        </div>
    );
}
