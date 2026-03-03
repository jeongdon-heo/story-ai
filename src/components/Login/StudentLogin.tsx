"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Key, Hash, ChevronRight } from 'lucide-react';

interface StudentLoginProps {
    onLogin: (data: { name: string; number: number; code: string }) => void;
}

export default function StudentLogin({ onLogin }: StudentLoginProps) {
    const [step, setStep] = useState(1);
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [number, setNumber] = useState<number | null>(null);
    const [error, setError] = useState('');

    const handleNext = () => {
        if (step === 1) {
            if (code === '123456') { // Mock activity code
                setStep(2);
                setError('');
            } else {
                setError('올바른 활동 코드를 입력하세요.');
            }
        } else if (step === 2) {
            if (name.trim()) {
                setStep(3);
                setError('');
            } else {
                setError('이름을 입력하세요.');
            }
        }
    };

    const handleFinish = (n: number) => {
        setNumber(n);
        onLogin({ name, number: n, code });
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
    };

    return (
        <div className="fixed inset-0 bg-slate-100 flex items-center justify-center p-6 z-[100]">
            <div className="w-full max-w-md">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-3xl shadow-xl mb-4 text-indigo-600">
                        {step === 1 ? <Key size={32} /> : step === 2 ? <User size={32} /> : <Hash size={32} />}
                    </div>
                    <h1 className="text-3xl font-black text-slate-800">이야기 함께 짓기</h1>
                    <p className="text-slate-500 mt-2">오늘의 작가님, 환영합니다! ✨</p>
                </div>

                <div className="glass p-8 rounded-[2.5rem] bg-white shadow-2xl relative overflow-hidden">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">활동 코드 입력</label>
                                <input
                                    type="text"
                                    placeholder="6자리 코드 (123456)"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    className="w-full px-6 py-4 rounded-2xl border-none bg-slate-50 text-xl font-bold focus:ring-2 focus:ring-indigo-400 transition-all outline-none"
                                />
                                {error && <p className="text-rose-500 text-xs mt-3 font-bold">{error}</p>}
                                <button
                                    onClick={handleNext}
                                    className="w-full mt-8 bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
                                >
                                    다음 단계 <ChevronRight size={20} />
                                </button>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">이름 입력</label>
                                <input
                                    type="text"
                                    placeholder="예: 홍길동"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-6 py-4 rounded-2xl border-none bg-slate-50 text-xl font-bold focus:ring-2 focus:ring-indigo-400 transition-all outline-none"
                                />
                                {error && <p className="text-rose-500 text-xs mt-3 font-bold">{error}</p>}
                                <button
                                    onClick={handleNext}
                                    className="w-full mt-8 bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
                                >
                                    다음 단계 <ChevronRight size={20} />
                                </button>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">내 번호 선택</label>
                                <div className="grid grid-cols-5 gap-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                    {Array.from({ length: 30 }, (_, i) => i + 1).map((n) => (
                                        <button
                                            key={n}
                                            onClick={() => handleFinish(n)}
                                            className="aspect-square rounded-xl bg-slate-50 text-slate-600 font-bold hover:bg-indigo-600 hover:text-white transition-all border border-slate-100"
                                        >
                                            {n}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="mt-8 flex justify-center gap-2">
                    {[1, 2, 3].map((s) => (
                        <div
                            key={s}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${step === s ? 'w-8 bg-indigo-600' : 'bg-slate-300'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
