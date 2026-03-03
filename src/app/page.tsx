import Link from "next/link";
import { BookOpen, PenTool, ClipboardCheck, Share2, Users } from "lucide-react";

export default function Home() {
    const stages = [
        { id: 1, name: "계획하기", icon: BookOpen, color: "bg-amber-100 text-amber-600", description: "아이디어를 모아요" },
        { id: 2, name: "초고 쓰기", icon: PenTool, color: "bg-emerald-100 text-emerald-600", description: "글을 써 내려가요" },
        { id: 3, name: "수정하기", icon: ClipboardCheck, color: "bg-blue-100 text-blue-600", description: "더 멋지게 다듬어요" },
        { id: 4, name: "발표하기", icon: Share2, color: "bg-purple-100 text-purple-600", description: "함께 나누어 읽어요" },
    ];

    return (
        <main className="min-h-screen p-8 max-w-5xl mx-auto">
            <header className="mb-12 text-center relative">
                <div className="absolute top-0 right-0">
                    <Link href="/teacher" className="text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-100 shadow-sm flex items-center gap-2">
                        <Users size={16} />
                        교사 모드
                    </Link>
                </div>
                <h1 className="text-4xl font-bold text-slate-800 mb-4">📝 이야기 함께 짓기</h1>
                <p className="text-lg text-slate-600">AI 코치와 함께 즐거운 글쓰기 여행을 떠나볼까요?</p>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {stages.map((stage) => (
                    <Link
                        key={stage.id}
                        href={stage.id === 1 ? "/planning" : stage.id === 2 ? "/drafting" : stage.id === 3 ? "/revising" : "/publishing"}
                        className="glass p-6 rounded-3xl transition-all hover:scale-105 cursor-pointer"
                    >
                        <div className={`w-12 h-12 ${stage.color} rounded-2xl flex items-center justify-center mb-4`}>
                            <stage.icon size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">{stage.name}</h3>
                        <p className="text-slate-500 text-sm">{stage.description}</p>
                    </Link>
                ))}
            </section>

            <section className="mb-20">
                <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-2">
                    <Share2 className="text-purple-500" size={24} />
                    우리 반 작품 갤러리 🎨
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { title: '숲속의 비밀 친구', author: '박지민', likes: 12, cover: '🌳' },
                        { title: '우주 떡볶이 탐험', author: '이영희', likes: 8, cover: '🚀' },
                        { title: '말하는 강아지 초코', author: '김철수', likes: 15, cover: '🐶' },
                    ].map((story, i) => (
                        <div key={i} className="glass p-6 rounded-[2rem] hover:shadow-lg transition-all border-purple-50">
                            <div className="w-full h-32 bg-purple-50 rounded-2xl mb-4 flex items-center justify-center text-4xl">
                                {story.cover}
                            </div>
                            <h4 className="font-bold text-slate-800 mb-1">{story.title}</h4>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-slate-500">{story.author} 작가님</span>
                                <div className="flex items-center gap-1 text-rose-500 text-xs font-bold">
                                    ❤️ {story.likes}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-8 text-center">
                    <button className="text-sm font-bold text-purple-600 hover:underline">작품 더 보러가기 →</button>
                </div>
            </section>

            <section className="glass p-8 rounded-[2rem] bg-gradient-to-br from-indigo-50 to-white">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-2xl font-bold mb-4">나의 최근 작품</h2>
                        <div className="p-6 bg-white/50 rounded-2xl border border-white/80">
                            <h4 className="font-bold text-lg mb-1">우리 동네 탐험기</h4>
                            <p className="text-emerald-600 text-sm mb-4">현재 단계: 초고 쓰기 (70%)</p>
                            <button className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-indigo-700 transition-colors">
                                이어서 쓰기 →
                            </button>
                        </div>
                    </div>
                    <div className="w-full md:w-1/3 aspect-square bg-white rounded-3xl shadow-sm flex items-center justify-center p-4">
                        {/* Character placeholder */}
                        <div className="text-center">
                            <div className="w-24 h-24 bg-indigo-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <span className="text-4xl">🤖</span>
                            </div>
                            <p className="font-bold text-slate-700">안녕! 나는 너의<br />글쓰기 코치야.</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
