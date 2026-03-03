"use client";

import React, { useState } from 'react';
import { Plus, X, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Node {
    id: string;
    text: string;
    x: number;
    y: number;
}

export default function MindMap() {
    const [nodes, setNodes] = useState<Node[]>([
        { id: '1', text: '여기에 주제를 써보세요!', x: 0, y: 0 }
    ]);
    const [inputValue, setInputValue] = useState('');

    const addNode = () => {
        if (!inputValue.trim()) return;
        const newNode: Node = {
            id: Date.now().toString(),
            text: inputValue,
            x: Math.random() * 200 - 100,
            y: Math.random() * 200 - 100,
        };
        setNodes([...nodes, newNode]);
        setInputValue('');
    };

    const removeNode = (id: string) => {
        if (id === '1') return; // Don't remove the center node
        setNodes(nodes.filter(node => node.id !== id));
    };

    return (
        <div className="glass p-8 rounded-[2.5rem] bg-white/40 min-h-[400px] flex flex-col">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                        <Lightbulb className="text-amber-500" />
                        생각 그물 만들기
                    </h3>
                    <p className="text-slate-500">떠오르는 아이디어를 모두 적어보세요!</p>
                </div>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addNode()}
                        placeholder="새로운 생각..."
                        className="px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white/50"
                    />
                    <button
                        onClick={addNode}
                        className="p-2 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-colors"
                    >
                        <Plus size={24} />
                    </button>
                </div>
            </div>

            <div className="flex-1 relative overflow-hidden flex items-center justify-center">
                <div className="flex flex-wrap gap-4 justify-center items-center max-w-2xl">
                    <AnimatePresence>
                        {nodes.map((node) => (
                            <motion.div
                                key={node.id}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                className={`${node.id === '1'
                                        ? 'bg-amber-500 text-white text-lg px-8 py-4'
                                        : 'bg-white text-slate-700 px-6 py-3 border border-amber-100'
                                    } rounded-[2rem] shadow-sm font-bold flex items-center gap-2 relative group`}
                            >
                                {node.text}
                                {node.id !== '1' && (
                                    <button
                                        onClick={() => removeNode(node.id)}
                                        className="opacity-0 group-hover:opacity-100 transition-opacity ml-1 text-slate-400 hover:text-red-500"
                                    >
                                        <X size={16} />
                                    </button>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
