import React, { useState } from 'react';
import { Trophy, RefreshCw, Users, Play, Sparkles } from 'lucide-react';

export default function GullyCricketBattingApp() {
  const [step, setStep] = useState(1); // 1: Setup, 2: Player Names, 3: Results
  const [playerCount, setPlayerCount] = useState(0);
  const [playerNames, setPlayerNames] = useState([]);
  const [battingOrder, setBattingOrder] = useState([]);

  // Step 2 par jaane aur Input Fields initialize karne ke liye
  const handlePlayerCountSubmit = (e) => {
    e.preventDefault();
    if (playerCount < 2) return;
    setPlayerNames(Array(Number(playerCount)).fill(''));
    setStep(2);
  };

  // Player Name Change Handle karna
  const handleNameChange = (index, value) => {
    const updatedNames = [...playerNames];
    updatedNames[index] = value;
    setPlayerNames(updatedNames);
  };

  // Random Batting Lineup Generate karna (Shuffle Algorithm)
  const generateBattingOrder = (e) => {
    e.preventDefault();
    
    // Default name agar blank chor diya ho
    const sanitizedNames = playerNames.map((name, i) => name.trim() || `Player ${i + 1}`);
    
    // Fisher-Yates Shuffle Algorithm
    const shuffled = [...sanitizedNames];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    setBattingOrder(shuffled);
    setStep(3);
  };

  // App Reset/Play Again function
  const handleReset = () => {
    setStep(1);
    setPlayerCount(2);
    setPlayerNames([]);
    setBattingOrder([]);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 p-6 md:p-8">
        
        {/* 1. App Logo / Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-500 rounded-full mb-3 shadow-lg shadow-amber-500/30">
            <Trophy className="w-10 h-10 text-slate-900" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-amber-400">
            Batting Lineup
          </h1>
          <p className="text-slate-400 text-sm mt-1">Gully Cricket Number Selector</p>
        </div>

        {/* 2. Step 1: Number of Players Select karna */}
        {step === 1 && (
          <form onSubmit={handlePlayerCountSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 items-center gap-2">
                <Users className="w-4 h-4 text-amber-400" /> Total Kitne Players Hain?
              </label>
              <input
                type="text"
                
                value={playerCount}
                onChange={(e) => setPlayerCount(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-amber-400 font-bold text-center text-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-3.5 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-lg"
            >
              Next <Play className="w-5 h-5 fill-current" />
            </button>
          </form>
        )}

        {/* 3. Step 2: Sab Players ke Names Enter karna */}
        {step === 2 && (
          <form onSubmit={generateBattingOrder} className="space-y-4">
            <p className="text-sm text-slate-400 mb-2 text-center">Sab players ke naam enter karein:</p>
            <div className="max-h-60 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-slate-700">
              {playerNames.map((name, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="w-7 text-right font-semibold text-slate-500">#{index + 1}</span>
                  <input
                    type="text"
                    placeholder={`Player ${index + 1} Name`}
                    value={name}
                    onChange={(e) => handleNameChange(index, e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              ))}
            </div>

            {/* 4. Generate Button */}
            <button
              type="submit"
              className="w-full mt-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-3.5 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-lg"
            >
              <Sparkles className="w-5 h-5" /> Generate Batting Order
            </button>
          </form>
        )}

        {/* 5. & 6. Step 3: Random Order Output UI */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center">
              <span className="bg-amber-500/10 text-amber-400 text-xs font-semibold uppercase px-3 py-1 rounded-full border border-amber-500/20">
                Final Result
              </span>
            </div>

            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {battingOrder.map((name, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3.5 rounded-xl border ${
                    index === 0
                      ? 'bg-amber-500/10 border-amber-500/50 text-amber-300'
                      : 'bg-slate-900/60 border-slate-700/60 text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        index === 0
                          ? 'bg-amber-500 text-slate-900'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {index + 1}
                    </span>
                    <span className="font-medium text-lg">{name}</span>
                  </div>
                  {index === 0 && <span className="text-xs font-semibold text-amber-400">Opener 🏏</span>}
                </div>
              ))}
            </div>

            {/* 7. Reset / Play Again Button */}
            <button
              onClick={handleReset}
              className="w-full bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold py-3 px-4 rounded-xl shadow transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" /> Reset & Play Again
            </button>
          </div>
        )}

      </div>
    </div>
  );
}