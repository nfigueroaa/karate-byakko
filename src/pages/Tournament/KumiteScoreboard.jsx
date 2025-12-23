import React, { useEffect, useState } from 'react';
import { useTournament } from '../../context/TournamentContext';
import { cn } from '../../utils/cn';
import { Button } from '../../components/ui/Button';

// Subcomponent: Competitor Panel
const CompetitorPanel = ({ side, data, dispatch }) => {
    const isAka = side === 'aka';
    const baseColor = isAka ? 'text-red-600' : 'text-blue-600';
    const bgColor = isAka ? 'bg-red-50 dark:bg-red-900/10' : 'bg-blue-50 dark:bg-blue-900/10';
    const borderColor = isAka ? 'border-red-200' : 'border-blue-200';

    // Check if this side is the winner (logic could be in parent or data)
    // We didn't pass 'winner' to CompetitorPanel directly, but we can access it via data or parent context.
    // wait, 'isAka' is local. 'state.winner' is in the parent. Let's look at the parent. 
    // Actually, let's just use the 'data.winner' if we passed it? No, we passed 'state.aka'.
    // Better to check context or pass a prop 'isWinner'.
    // Let's modify the call site in KumiteScoreboard.
    return (
        <div className={cn("flex flex-col p-6 rounded-2xl border-4 h-full relative transition-all duration-500", bgColor, borderColor, data.isWinner && "ring-8 ring-yellow-400 ring-offset-4 scale-105 z-10")}>
            {data.isWinner && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-yellow-400 text-black font-black text-2xl px-8 py-2 rounded-full shadow-lg z-20 animate-bounce uppercase tracking-widest border-4 border-white">
                    🏆 Ganador
                </div>
            )}
            {/* Senshu Indicator */}
            {data.senshu && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-black font-bold px-3 py-1 rounded-full text-xs shadow-md animate-bounce">
                    SENSHU 👑
                </div>
            )}

            {/* Name Input */}
            <input
                value={data.name}
                onChange={(e) => dispatch({ type: 'SET_NAME', payload: { side, name: e.target.value } })}
                className={cn("text-3xl font-bold bg-transparent border-b-2 border-transparent hover:border-gray-300 focus:border-gray-500 outline-none text-center mb-6 font-zen", isAka ? "text-gray-900 dark:text-gray-100" : "text-gray-900 dark:text-gray-100")}
            />

            {/* Big Score */}
            <div className={cn("text-[10rem] leading-none font-bold text-center my-4 tabular-nums select-none", baseColor)}>
                {data.score}
            </div>

            {/* Points Control */}
            <div className="flex gap-2 justify-center mb-8">
                {[1, 2, 3].map(points => (
                    <button
                        key={points}
                        onClick={() => dispatch({ type: 'ADD_POINTS', payload: { side, points } })}
                        className={cn(
                            "w-16 h-16 rounded-full text-2xl font-bold shadow-md transition-transform active:scale-95 text-white",
                            isAka ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
                        )}
                    >
                        +{points}
                    </button>
                ))}
            </div>

            {/* Penalties Control */}
            <div className="mt-auto space-y-4">
                {['C1', 'C2'].map(cat => (
                    <div key={cat} className=" bg-white/50 dark:bg-black/20 p-2 rounded-lg flex items-center justify-between">
                        <span className="font-bold text-gray-500">{cat}</span>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div
                                    key={i}
                                    onClick={() => dispatch({ type: 'ADD_PENALTY', payload: { side, category: cat } })} // Simple logic, assumes adding sequential
                                    className={cn(
                                        "w-6 h-6 rounded-full border border-gray-300 cursor-pointer",
                                        i <= data.penalties[cat] ? "bg-black" : "bg-gray-100"
                                    )}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Senshu Toggle */}
            <button
                onClick={() => dispatch({ type: 'TOGGLE_SENSHU', payload: side })}
                className="mt-4 text-xs text-gray-400 hover:text-yellow-500 uppercase font-bold"
            >
                {data.senshu ? "Quitar Senshu" : "Otorgar Senshu"}
            </button>
        </div>
    );
};

// Main Component
const KumiteScoreboard = () => {
    const { state, dispatch } = useTournament();

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const handleBackgroundUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => dispatch({ type: 'SET_BACKGROUND', payload: ev.target.result });
            reader.readAsDataURL(file);
        }
    };

    const openProjection = () => {
        const width = 1000;
        const height = 600;
        const left = (window.screen.width - width) / 2;
        const top = (window.screen.height - height) / 2;
        window.open('/kumite/view', 'KumiteProjection', `width=${width},height=${height},left=${left},top=${top}`);
    };

    return (
        <div
            className="min-h-[calc(100vh-64px)] p-6 relative bg-cover bg-center"
            style={{
                backgroundImage: state.backgroundImage ? `url(${state.backgroundImage})` : 'none',
                backgroundColor: state.backgroundImage ? 'transparent' : undefined
            }}
        >
            {/* Overlay for better readability if bg image exists */}
            {state.backgroundImage && <div className="absolute inset-0 bg-white/80 dark:bg-black/80 z-0" />}

            <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col">
                {/* Header Controls */}
                <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm mb-6 opacity-90 hover:opacity-100 transition-opacity">
                    <h2 className="font-bold font-zen text-xl">Panel de Arbitraje WKF</h2>
                    <div className="flex gap-2">
                        <label className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md text-sm font-medium transition">
                            📷 Fondo
                            <input type="file" className="hidden" accept="image/*" onChange={handleBackgroundUpload} />
                        </label>
                        <button
                            onClick={() => dispatch({ type: 'TOGGLE_MERCY_RULE' })}
                            className={cn(
                                "py-2 px-4 rounded-md text-sm font-medium transition border",
                                state.mercyRuleEnabled
                                    ? "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200"
                                    : "bg-gray-100 text-gray-500 border-gray-200 hover:bg-gray-200"
                            )}
                        >
                            {state.mercyRuleEnabled ? "⚡ 8 Pts: ON" : "⚡ 8 Pts: OFF"}
                        </button>
                        <button
                            onClick={() => dispatch({ type: 'TOGGLE_ATOSHI_BARAKU' })}
                            className={cn(
                                "py-2 px-4 rounded-md text-sm font-medium transition border",
                                state.atoshiBarakuEnabled
                                    ? "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200"
                                    : "bg-gray-100 text-gray-500 border-gray-200 hover:bg-gray-200"
                            )}
                        >
                            {state.atoshiBarakuEnabled ? "🔔 Atoshi: ON" : "🔔 Atoshi: OFF"}
                        </button>
                        <Button variant="outline" size="sm" onClick={openProjection}>🖥️ Proyectar</Button>
                        <Button variant="ghost" size="sm" onClick={() => dispatch({ type: 'RESET_MATCH' })}>Reset</Button>
                    </div>
                </div>

                {/* Scoreboard Area */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-1">
                    {/* Aka */}
                    <CompetitorPanel side="aka" data={{ ...state.aka, isWinner: state.winner === 'aka' }} dispatch={dispatch} />

                    {/* Center Info (Timer) */}
                    <div className="flex flex-col items-center justify-center bg-white/90 dark:bg-gray-800/90 rounded-2xl p-6 shadow-lg backdrop-blur-sm">
                        <div className="text-xl font-bold text-gray-500 uppercase tracking-widest mb-4">Tiempo de Combate</div>

                        <input
                            className={cn(
                                "text-8xl md:text-9xl font-mono font-bold mb-4 tabular-nums w-full text-center bg-transparent border-none focus:ring-0 active:outline-none focus:outline-none",
                                state.matchTime === 0 ? "text-red-600 animate-pulse" : "text-gray-900 dark:text-white",
                                state.isRunning ? "cursor-default" : "cursor-text hover:bg-gray-100/50 rounded-lg"
                            )}
                            value={formatTime(state.matchTime)}
                            readOnly={state.isRunning}
                            onChange={(e) => {
                                // Basic handling: pause typing effectively, mostly relying on blur to set final
                                // Real-time parsing could be jittery. 
                                // For this MVP, we rely on the buttons for quick adjustments and visual cue that it is "editable"
                                // Implementing full text mask editing without local state variable is tricky in React controlled inputs.
                                // We will rely on provided buttons for major adjustments as requested.
                            }}
                            onBlur={(e) => {
                                const val = e.target.value;
                                if (val.includes(':')) {
                                    const [m, s] = val.split(':').map(Number);
                                    if (!isNaN(m) && !isNaN(s)) dispatch({ type: 'SET_TIME', payload: m * 60 + s });
                                } else {
                                    const s = Number(val);
                                    if (!isNaN(s)) dispatch({ type: 'SET_TIME', payload: s });
                                }
                            }}
                        />

                        {/* Quick Add Buttons */}
                        <div className="flex gap-2 mb-6">
                            <Button size="sm" variant="outline" onClick={() => dispatch({ type: 'ADD_TIME', payload: 15 })}>+15s</Button>
                            <Button size="sm" variant="outline" onClick={() => dispatch({ type: 'ADD_TIME', payload: 30 })}>+30s</Button>
                            <Button size="sm" variant="outline" onClick={() => dispatch({ type: 'ADD_TIME', payload: 60 })}>+1m</Button>
                        </div>

                        <div className="flex gap-4 mb-4 w-full">
                            {!state.isRunning ? (
                                <Button onClick={() => dispatch({ type: 'START_TIMER' })} className="flex-1 bg-green-600 hover:bg-green-700 shadow-lg py-4 text-lg">Hajime</Button>
                            ) : (
                                <Button onClick={() => dispatch({ type: 'STOP_TIMER' })} className="flex-1 bg-red-600 hover:bg-red-700 shadow-lg py-4 text-lg">Yame</Button>
                            )}
                        </div>

                        <div className="w-full">
                            <Button variant="ghost" size="sm" className="w-full text-gray-500 hover:text-red-500 hover:bg-red-50 dark:text-gray-400 dark:hover:bg-red-900/20" onClick={() => dispatch({ type: 'SET_TIME', payload: 0 })}>
                                ↺ Reset Tiempo (0:00)
                            </Button>
                        </div>
                    </div>

                    {/* Ao */}
                    <CompetitorPanel side="ao" data={{ ...state.ao, isWinner: state.winner === 'ao' }} dispatch={dispatch} />
                </div>
            </div>

            {/* Hantei / Decision Overlay modal for Admin */}
            {state.winner === 'hantei' && (
                <div className="absolute inset-0 bg-black/80 z-50 flex flex-col items-center justify-center p-8 backdrop-blur-sm">
                    <h2 className="text-4xl text-white font-bold mb-8 uppercase tracking-widest animate-pulse">⚖️ Decisión (Hantei) ⚖️</h2>
                    <div className="grid grid-cols-3 gap-8 w-full max-w-4xl">
                        {/* Winner Aka */}
                        <button
                            onClick={() => dispatch({ type: 'SET_WINNER', payload: 'aka' })}
                            className="bg-red-600 hover:bg-red-700 text-white p-8 rounded-xl font-bold text-2xl flex flex-col items-center gap-4 transition-transform hover:scale-105"
                        >
                            <span>🚩</span>
                            Ganador Aka
                        </button>

                        {/* Extra Time */}
                        <button
                            onClick={() => {
                                dispatch({ type: 'SET_WINNER', payload: null }); // Clear winner state
                                dispatch({ type: 'SET_TIME', payload: 60 }); // Set 1 minute
                            }}
                            className="bg-gray-700 hover:bg-gray-600 text-white p-8 rounded-xl font-bold text-2xl flex flex-col items-center gap-4 transition-transform hover:scale-105 border-2 border-white/20"
                        >
                            <span>⏱️</span>
                            Tiempo Extra (1:00)
                        </button>

                        {/* Winner Ao */}
                        <button
                            onClick={() => dispatch({ type: 'SET_WINNER', payload: 'ao' })}
                            className="bg-blue-600 hover:bg-blue-700 text-white p-8 rounded-xl font-bold text-2xl flex flex-col items-center gap-4 transition-transform hover:scale-105"
                        >
                            <span>🚩</span>
                            Ganador Ao
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default KumiteScoreboard;
