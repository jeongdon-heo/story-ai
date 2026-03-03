"use client";

import React from 'react';
import { CheckCircle2, AlertCircle, Info, Sparkles } from 'lucide-react';

interface FeedbackItem {
    type: 'good' | 'check' | 'info';
    title: string;
    desc: string;
}

interface FeedbackReportProps {
    feedbacks: FeedbackItem[];
    isLoading: boolean;
}

export default function FeedbackReport({ feedbacks, isLoading }: FeedbackReportProps) {
    const icons = {
        good: { icon: CheckCircle2, color: 'text-emerald-500' },
        check: { icon: AlertCircle, color: 'text-amber-500' },
        info: { icon: Info, color: 'text-blue-500' },
    };

    return (
        <div className="glass p-8 rounded-[2.5rem] bg-indigo-50/30 border-indigo-100 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-8">
                <Sparkles className="text-indigo-500" size={24} />
                <h3 className="text-2xl font-bold text-slate-800">AI 피드백 리포트</h3>
            </div>

            <div className="space-y-4 flex-1">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center h-40 space-y-4">
                        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                        <p className="text-sm text-slate-500 font-medium text-center">AI 코치가 글을 꼼꼼하게<br />읽어보고 있어요...</p>
                    </div>
                ) : feedbacks.length > 0 ? (
                    feedbacks.map((f, i) => {
                        const IconConfig = icons[f.type];
                        return (
                            <div key={i} className="bg-white/80 p-5 rounded-3xl border border-indigo-50 shadow-sm flex gap-4">
                                <div className={`mt-1 ${IconConfig.color}`}>
                                    <IconConfig.icon size={20} />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-800 mb-1">{f.title}</p>
                                    <p className="text-sm text-slate-600 leading-relaxed">{f.desc}</p>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="text-center p-8 bg-white/50 rounded-3xl border border-dashed border-slate-200">
                        <p className="text-sm text-slate-400">아직 피드백이 없어요.<br />분석 버튼을 눌러보세요!</p>
                    </div>
                )}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl text-white">
                <h4 className="font-bold mb-2">💡 수정 팁</h4>
                <p className="text-xs opacity-90 leading-relaxed">
                    글을 소리 내어 읽어보세요. 어색하게 느껴지는 부분이 있다면 그 부분을 먼저 고쳐보는 것이 좋아요!
                </p>
            </div>
        </div>
    );
}
