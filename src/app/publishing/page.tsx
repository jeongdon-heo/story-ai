"use client";

import React from 'react';
import { ChevronLeft, Share2, Download, Printer, Heart, MessageCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function PublishingPage() {
    const content = `우리 동네에는 재미있는 곳이 많습니다. 시장에는 활기찬 소리와 맛있는 냄새가 가득합니다. 북적북적한 사람들의 웃음소리가 시장을 채웁니다. 공원에는 귀여운 고양이들이 따뜻한 햇볕을 쬐며 살고 있습니다. 나는 우리 동네가 참 좋습니다. 이곳은 나의 소중한 보물창고와 같습니다.`;

    return (
        <main className="min-h-screen p-6 md:p-12 max-w-5xl mx-auto">
            <header className="flex items-center justify-between mb-12">
                <Link href="/revising" className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors">
                    <ChevronLeft size={20} />
                    <span>수정 단계로</span>
                </Link>

                <div className="flex items-center gap-4 bg-slate-100 p-1 rounded-2xl">
                    <div className="px-6 py-2 text-slate-400 font-bold">1. 계획</div>
                    <div className="px-6 py-2 text-slate-400 font-bold">2. 초고</div>
                    <div className="px-6 py-2 text-slate-400 font-bold">3. 수정</div>
                    <div className="px-6 py-2 bg-white shadow-sm text-purple-600 rounded-xl font-bold">4. 발표</div>
                </div>

                <button className="flex items-center gap-2 bg-purple-500 text-white px-6 py-2 rounded-xl font-bold hover:bg-purple-600 transition-all shadow-sm">
                    <Share2 size={18} />
                    공유하기
                </button>
            </header>

            <div className="glass p-12 md:p-20 rounded-[3rem] bg-white border-purple-100 shadow-xl mb-12 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-bl-[5rem] -z-10" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-50 rounded-tr-[7rem] -z-10" />

                <article className="max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-8 border-b-4 border-purple-200 pb-4 inline-block">
                        우리 동네 탐험기
                    </h1>
                    <div className="flex items-center gap-3 mb-12">
                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                            <span className="text-xl">👩‍🎨</span>
                        </div>
                        <div>
                            <p className="font-bold text-slate-700">심청이 고슴도치</p>
                            <p className="text-xs text-slate-400">2026년 3월 2일 작성</p>
                        </div>
                    </div>

                    <div className="text-xl md:text-2xl text-slate-700 leading-relaxed font-medium space-y-6 whitespace-pre-wrap">
                        {content}
                    </div>
                </article>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <button className="flex items-center justify-center gap-3 p-6 bg-white border border-slate-100 rounded-3xl hover:bg-slate-50 transition-all font-bold text-slate-600 shadow-sm">
                    <Download size={20} className="text-blue-500" />
                    PDF로 저장하기
                </button>
                <button className="flex items-center justify-center gap-3 p-6 bg-white border border-slate-100 rounded-3xl hover:bg-slate-50 transition-all font-bold text-slate-600 shadow-sm">
                    <Printer size={20} className="text-slate-500" />
                    인쇄하기
                </button>
                <button className="flex items-center justify-center gap-3 p-6 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-3xl hover:bg-emerald-100 transition-all font-bold shadow-sm">
                    <Share2 size={20} />
                    작품 갤러리에 올리기
                </button>
            </div>

            <section className="glass p-8 rounded-[2.5rem] bg-slate-50/50 border-slate-200">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <MessageCircle size={20} className="text-indigo-500" />
                    작품 후기 및 댓글
                </h3>
                <div className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center shrink-0">
                        <span className="text-2xl">🤖</span>
                    </div>
                    <p className="text-sm text-slate-600 leading-normal flex-1">
                        <strong className="text-slate-800 block mb-1">코치의 축하 인사</strong>
                        정말 멋진 이야기가 완성되었어! 계획부터 수정까지 스스로 해낸 네가 대견해. <br />
                        너의 이야기가 더 많은 친구들에게 즐거움을 줄 수 있기를 바랄게. 👏✨
                    </p>
                </div>
            </section>

            <div className="mt-12 text-center">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 bg-slate-800 text-white px-8 py-3 rounded-2xl font-bold hover:bg-slate-900 transition-all"
                >
                    장소 선택 화면으로 돌아가기
                    <ArrowRight size={20} />
                </Link>
            </div>
        </main>
    );
}
