"use client";

import React from 'react';
import { ChevronLeft, Users, Settings, BarChart3, Clock, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function TeacherDashboard() {
    const students = [
        { name: '김철수', stage: '초고 쓰기', progress: 70, lastActive: '10분 전', level: 'Level 2' },
        { name: '이영희', stage: '계획하기', progress: 30, lastActive: '방금 전', level: 'Level 3' },
        { name: '박지민', stage: '발표하기', progress: 100, lastActive: '1시간 전', level: 'Level 1' },
        { name: '최다은', stage: '수정하기', progress: 85, lastActive: '5분 전', level: 'Level 2' },
    ];

    const [showAssignModal, setShowAssignModal] = React.useState(false);

    return (
        <main className="min-h-screen bg-slate-50 p-6 md:p-12">
            {showAssignModal && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-6">
                    <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-xl p-10 relative animate-in fade-in zoom-in duration-300">
                        <h2 className="text-2xl font-black text-slate-800 mb-2">📝 새 과제 출제하기</h2>
                        <p className="text-slate-500 mb-8 text-sm">학생들에게 새로운 글쓰기 주제를 전달합니다.</p>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">글쓰기 주제</label>
                                <input type="text" placeholder="예: 우리 동네 탐험기" className="w-full px-4 py-3 rounded-2xl border border-slate-100 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">장르 선택</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {['생활문', '동화', '일기', '설명하는 글'].map(g => (
                                        <button key={g} className="py-3 rounded-2xl border border-slate-100 bg-slate-50 text-sm font-bold text-slate-600 hover:bg-white hover:border-indigo-400 hover:text-indigo-600 transition-all">
                                            {g}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button onClick={() => setShowAssignModal(false)} className="flex-1 py-4 rounded-2xl font-bold text-slate-400 hover:bg-slate-50">취소</button>
                                <button onClick={() => setShowAssignModal(false)} className="flex-1 py-4 bg-indigo-600 rounded-2xl font-bold text-white shadow-lg hover:bg-indigo-700">과제 보내기</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-4">
                            <ChevronLeft size={20} />
                            <span>메인으로</span>
                        </Link>
                        <h1 className="text-3xl font-black text-slate-800">🏫 교사 대시보드</h1>
                        <p className="text-slate-500">3학년 2반 글쓰기 수업 현황</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="flex items-center gap-2 bg-white px-6 py-3 rounded-2xl font-bold text-slate-600 shadow-sm border border-slate-100 hover:bg-slate-50 transition-all">
                            <Settings size={20} />
                            장르 설정
                        </button>
                        <button
                            onClick={() => setShowAssignModal(true)}
                            className="flex items-center gap-2 bg-indigo-600 px-6 py-3 rounded-2xl font-bold text-white shadow-lg hover:bg-indigo-700 transition-all"
                        >
                            <BarChart3 size={20} />
                            과제 출제하기
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    {[
                        { label: '전체 학생', value: '24명', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
                        { label: '진행 중', value: '18명', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' },
                        { label: '완료', value: '6명', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                        { label: 'AI 도움 요청', value: '3건', icon: BarChart3, color: 'text-rose-500', bg: 'bg-rose-50' },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
                            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-4`}>
                                <stat.icon size={24} />
                            </div>
                            <p className="text-sm font-medium text-slate-500 mb-1">{stat.label}</p>
                            <p className="text-2xl font-black text-slate-800">{stat.value}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                        <h3 className="text-xl font-bold text-slate-800">학생별 진행 현황</h3>
                        <div className="flex bg-slate-100 p-1 rounded-xl text-sm">
                            <button className="px-4 py-2 bg-white rounded-lg shadow-sm font-bold text-indigo-600">전체</button>
                            <button className="px-4 py-2 text-slate-500">진행 중</button>
                            <button className="px-4 py-2 text-slate-500">완료</button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">학생 이름</th>
                                    <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">현재 단계</th>
                                    <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">진행도</th>
                                    <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">AI 개입 수준</th>
                                    <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">최근 활동</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {students.map((student, i) => (
                                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 font-bold">
                                                    {student.name[0]}
                                                </div>
                                                <span className="font-bold text-slate-700">{student.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${student.stage === '발표하기' ? 'bg-emerald-100 text-emerald-600' :
                                                student.stage === '계획하기' ? 'bg-amber-100 text-amber-600' :
                                                    'bg-blue-100 text-blue-600'
                                                }`}>
                                                {student.stage}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="w-full max-w-[100px] bg-slate-100 h-2 rounded-full overflow-hidden">
                                                <div
                                                    className="bg-indigo-500 h-full rounded-full transition-all duration-1000"
                                                    style={{ width: `${student.progress}%` }}
                                                />
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <select
                                                defaultValue={student.level}
                                                className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                            >
                                                <option value="Level 1">Level 1</option>
                                                <option value="Level 2">Level 2</option>
                                                <option value="Level 3">Level 3</option>
                                                <option value="Level 4">Level 4</option>
                                            </select>
                                        </td>
                                        <td className="px-8 py-6 text-sm text-slate-400">
                                            {student.lastActive}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    );
}
