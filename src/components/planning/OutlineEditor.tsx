"use client";

import React, { useState } from 'react';
import { ListTodo, CheckCircle2 } from 'lucide-react';

export default function OutlineEditor() {
    const [outline, setOutline] = useState({
        title: '',
        intro: '',
        body: ['', '', ''],
        conclusion: ''
    });

    const updateBody = (index: number, value: string) => {
        const newBody = [...outline.body];
        newBody[index] = value;
        setOutline({ ...outline, body: newBody });
    };

    return (
        <div className="glass p-8 rounded-[2.5rem] bg-white/40 h-full">
            <div className="mb-8">
                <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                    <ListTodo className="text-indigo-500" />
                    글의 뼈대 세우기
                </h3>
                <p className="text-slate-500">이야기의 순서를 정해볼까요?</p>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-bold text-slate-600 mb-2">제목</label>
                    <input
                        type="text"
                        className="w-full px-4 py-3 rounded-2xl border border-indigo-100 focus:ring-2 focus:ring-indigo-400 focus:outline-none bg-white/50 text-lg"
                        placeholder="글의 제목을 정해주세요"
                        value={outline.title}
                        onChange={(e) => setOutline({ ...outline, title: e.target.value })}
                    />
                </div>

                <div className="grid grid-cols-1 gap-6">
                    <div className="p-6 bg-slate-50/50 rounded-3xl border border-slate-100">
                        <label className="block text-sm font-bold text-indigo-600 mb-3 flex items-center gap-2">
                            <span className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center text-xs">1</span>
                            처음 (도입)
                        </label>
                        <textarea
                            className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-400 focus:outline-none bg-white/70 min-h-[80px]"
                            placeholder="이야기를 어떻게 시작할까요? 배경이나 인물을 소개해요."
                            value={outline.intro}
                            onChange={(e) => setOutline({ ...outline, intro: e.target.value })}
                        />
                    </div>

                    <div className="p-6 bg-slate-50/50 rounded-3xl border border-slate-100">
                        <label className="block text-sm font-bold text-emerald-600 mb-3 flex items-center gap-2">
                            <span className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center text-xs">2</span>
                            가운데 (전개)
                        </label>
                        <div className="space-y-3">
                            {outline.body.map((item, i) => (
                                <input
                                    key={i}
                                    type="text"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-400 focus:outline-none bg-white/70"
                                    placeholder={`${i + 1}번째 이야기 조각`}
                                    value={item}
                                    onChange={(e) => updateBody(i, e.target.value)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="p-6 bg-slate-50/50 rounded-3xl border border-slate-100">
                        <label className="block text-sm font-bold text-purple-600 mb-3 flex items-center gap-2">
                            <span className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-xs">3</span>
                            끝 (마무리)
                        </label>
                        <textarea
                            className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-400 focus:outline-none bg-white/70 min-h-[80px]"
                            placeholder="이야기를 어떻게 마무리할까요? 느낀 점이나 다짐을 적어요."
                            value={outline.conclusion}
                            onChange={(e) => setOutline({ ...outline, conclusion: e.target.value })}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
