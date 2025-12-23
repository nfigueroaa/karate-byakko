import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { playRefereeCommand, playBuzzer } from '../utils/soundManager';

const TournamentContext = createContext();

const initialState = {
    matchTime: 0, // Start at 0, user sets time manually
    isRunning: false,
    aka: {
        name: 'Competidor Rojo',
        score: 0,
        penalties: { C1: 0, C2: 0 },
        senshu: false,
    },
    ao: {
        name: 'Competidor Azul',
        score: 0,
        penalties: { C1: 0, C2: 0 },
        senshu: false,
    },
    winner: null,
    backgroundImage: null, // URL or Base64
    mercyRuleEnabled: true, // Auto check for 8 points difference
    atoshiBarakuEnabled: true, // Auto sound at 15s
};

const tournamentReducer = (state, action) => {
    switch (action.type) {
        case 'START_TIMER':
            playRefereeCommand("Hajime");
            return { ...state, isRunning: true };
        case 'STOP_TIMER':
            if (state.matchTime > 0) playRefereeCommand("Yame");
            return { ...state, isRunning: false };
        case 'RESET_MATCH':
            return { ...initialState, backgroundImage: state.backgroundImage, mercyRuleEnabled: state.mercyRuleEnabled, atoshiBarakuEnabled: state.atoshiBarakuEnabled }; // Keep background and settings
        case 'TICK':
            if (state.matchTime <= 0) return { ...state, isRunning: false };
            const nextTime = state.matchTime - 1;

            // Atoshi Baraku (15 seconds remaining)
            if (nextTime === 15 && state.atoshiBarakuEnabled) {
                playRefereeCommand("Atoshi Baraku");
            }

            if (nextTime === 0) {
                let winner = null;
                playBuzzer(); // End of match sound
                if (state.aka.score > state.ao.score) winner = 'aka';
                else if (state.ao.score > state.aka.score) winner = 'ao';
                else {
                    if (state.aka.senshu) winner = 'aka';
                    else if (state.ao.senshu) winner = 'ao';
                    else winner = 'hantei';
                }

                // Announce winner delayed slightly so buzzer finishes? No, straight away
                if (winner === 'aka') setTimeout(() => playRefereeCommand("Aka No Kachi"), 1500);
                if (winner === 'ao') setTimeout(() => playRefereeCommand("Ao No Kachi"), 1500);

                return { ...state, matchTime: 0, isRunning: false, winner };
            }
            return { ...state, matchTime: nextTime };
        case 'SET_WINNER':
            const win = action.payload;
            if (win === 'aka') playRefereeCommand("Aka No Kachi");
            if (win === 'ao') playRefereeCommand("Ao No Kachi");
            return { ...state, winner: win };
        case 'SET_TIME':
            return { ...state, matchTime: action.payload };
        case 'ADD_TIME':
            return { ...state, matchTime: state.matchTime + action.payload };
        // Scoring
        case 'ADD_POINTS':
            // payload: { side: 'aka' | 'ao', points: 1 | 2 | 3 }
            const newScore = state[action.payload.side].score + action.payload.points;
            // Check 8 point difference mercy rule
            const newState = {
                ...state,
                [action.payload.side]: {
                    ...state[action.payload.side],
                    score: newScore
                }
            };

            if (state.mercyRuleEnabled) {
                const diff = newState.aka.score - newState.ao.score;
                if (Math.abs(diff) >= 8) {
                    newState.winner = diff > 0 ? 'aka' : 'ao';
                    newState.isRunning = false; // Auto stop timer
                    playRefereeCommand("Yame"); // Stop fight
                    setTimeout(() => playRefereeCommand(newState.winner === 'aka' ? "Aka No Kachi" : "Ao No Kachi"), 1000);
                }
            }
            return newState;
        case 'ADD_PENALTY':
            // payload: { side: 'aka' | 'ao', category: 'C1' | 'C2' }
            const cat = action.payload.category;
            const currentPen = state[action.payload.side].penalties[cat];
            if (currentPen >= 5) return state; // Max penalties
            return {
                ...state,
                [action.payload.side]: {
                    ...state[action.payload.side],
                    penalties: {
                        ...state[action.payload.side].penalties,
                        [cat]: currentPen + 1
                    }
                }
            };
        case 'TOGGLE_SENSHU':
            // payload: 'aka' or 'ao'
            // Only one can have senshu
            return {
                ...state,
                aka: { ...state.aka, senshu: action.payload === 'aka' ? !state.aka.senshu : false },
                ao: { ...state.ao, senshu: action.payload === 'ao' ? !state.ao.senshu : false }
            };
        case 'SET_NAME':
            // payload: { side, name }
            return {
                ...state,
                [action.payload.side]: {
                    ...state[action.payload.side],
                    name: action.payload.name
                }
            };
        case 'SET_BACKGROUND':
            return { ...state, backgroundImage: action.payload };
        case 'TOGGLE_MERCY_RULE':
            return { ...state, mercyRuleEnabled: !state.mercyRuleEnabled };
        case 'TOGGLE_ATOSHI_BARAKU':
            return { ...state, atoshiBarakuEnabled: !state.atoshiBarakuEnabled };
        default:
            return state;
    }
};

export const TournamentProvider = ({ children }) => {
    const [state, dispatch] = useReducer(tournamentReducer, initialState);

    // Timer Logic
    useEffect(() => {
        let interval;
        if (state.isRunning && state.matchTime > 0) {
            interval = setInterval(() => {
                dispatch({ type: 'TICK' });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [state.isRunning, state.matchTime]);

    // Broadcast Channel for Projection
    useEffect(() => {
        const channel = new BroadcastChannel('kumite_channel');
        channel.postMessage(state);
        return () => channel.close();
    }, [state]);

    return (
        <TournamentContext.Provider value={{ state, dispatch }}>
            {children}
        </TournamentContext.Provider>
    );
};

export const useTournament = () => useContext(TournamentContext);
