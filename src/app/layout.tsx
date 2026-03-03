import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "이야기 함께 짓기 - AI 글쓰기 코치",
    description: "AI와 함께하는 초등학생 단계별 글쓰기 학습",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <body className="antialiased">
                {children}
            </body>
        </html>
    );
}
