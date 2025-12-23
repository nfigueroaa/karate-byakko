import React, { useEffect, useState } from 'react';
import { cn } from '../../utils/cn';

const KumiteProjection = () => {
    const [state, setState] = useState({
        matchTime: 0,
        isRunning: false,
        aka: { name: '', score: 0, penalties: { C1: 0, C2: 0 }, senshu: false },
        ao: { name: '', score: 0, penalties: { C1: 0, C2: 0 }, senshu: false },
        backgroundImage: null
    });

    useEffect(() => {
        const channel = new BroadcastChannel('kumite_channel');
        channel.onmessage = (event) => {
            setState(event.data);
        };
        return () => channel.close();
    }, []);

    // Force no scrollbars on body/html for this view
    useEffect(() => {
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
        return () => {
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
        };
    }, []);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    return (
        <div
            className="fixed inset-0 flex flex-col overflow-hidden bg-gray-900"
            style={{
                backgroundImage: state.backgroundImage ? `url(${state.backgroundImage})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            {/* Overlay */}
            {state.backgroundImage && <div className="absolute inset-0 bg-black/50 z-0" />}

            {/* Content */}
            <div className="relative z-10 grid grid-cols-2 h-full">
                {/* Aka Side */}
                <div className="bg-red-600/90 text-white flex flex-col items-center justify-center relative p-8">
                    <h2 className="text-6xl font-bold mb-8 uppercase text-center font-zen">{state.aka.name}</h2>
                    <div className="text-[25vw] font-bold leading-none">{state.aka.score}</div>
                    {state.aka.senshu && (
                        <div className="absolute top-10 right-10 bg-yellow-400 text-black text-4xl px-6 py-2 rounded-full font-bold shadow-xl animate-pulse">
                            SENSHU
                        </div>
                    )}
                    <div className="absolute bottom-10 left-10 flex gap-4">
                        <div className="flex flex-col gap-2">
                            <div className="text-2xl font-bold">C1: {state.aka.penalties.C1}</div>
                            <div className="text-2xl font-bold">C2: {state.aka.penalties.C2}</div>
                        </div>
                    </div>

                    {/* Winner Overlay Aka */}
                    {state.winner === 'aka' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-20 backdrop-blur-[2px]">
                            <div className="bg-yellow-400 text-black text-8xl font-black px-12 py-6 rounded-3xl shadow-2xl border-8 border-white animate-bounce uppercase">
                                🏆 Ganador
                            </div>
                        </div>
                    )}
                </div>

                {/* Ao Side */}
                <div className="bg-blue-600/90 text-white flex flex-col items-center justify-center relative p-8">
                    <h2 className="text-6xl font-bold mb-8 uppercase text-center font-zen">{state.ao.name}</h2>
                    <div className="text-[25vw] font-bold leading-none">{state.ao.score}</div>
                    {state.ao.senshu && (
                        <div className="absolute top-10 left-10 bg-yellow-400 text-black text-4xl px-6 py-2 rounded-full font-bold shadow-xl animate-pulse">
                            SENSHU
                        </div>
                    )}
                    <div className="absolute bottom-10 right-10 flex gap-4 text-right">
                        <div className="flex flex-col gap-2">
                            <div className="text-2xl font-bold">C1: {state.ao.penalties.C1}</div>
                            <div className="text-2xl font-bold">C2: {state.ao.penalties.C2}</div>
                        </div>
                    </div>

                    {/* Winner Overlay Ao */}
                    {state.winner === 'ao' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-20 backdrop-blur-[2px]">
                            <div className="bg-yellow-400 text-black text-8xl font-black px-12 py-6 rounded-3xl shadow-2xl border-8 border-white animate-bounce uppercase">
                                🏆 Ganador
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Timer Overlay */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-black/80 text-white px-12 py-6 rounded-2xl border-4 border-white/20 backdrop-blur-md shadow-2xl">
                <div className={cn(
                    "text-[8rem] font-mono font-bold leading-none tabular-nums",
                    state.matchTime === 0 ? "text-red-500 animate-pulse" : "text-white"
                )}>
                    {formatTime(state.matchTime)}
                </div>
            </div>

            {/* Hantei Overlay */}
            {state.winner === 'hantei' && (
                <div className="absolute inset-0 bg-black/60 z-50 flex items-center justify-center backdrop-blur-sm">
                    <div className="bg-white text-black px-20 py-10 rounded-3xl shadow-2xl animate-pulse">
                        <h1 className="text-9xl font-black uppercase tracking-widest font-zen">HANTEI</h1>
                        <p className="text-4xl text-center mt-4 font-bold text-gray-600">DECISIÓN DE ÁRBITROS</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default KumiteProjection;
