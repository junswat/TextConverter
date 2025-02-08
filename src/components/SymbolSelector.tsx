import React from 'react';
import { Toggle } from './ui/Toggle';
import type { SymbolMapping, DeletionRule } from '../hooks/useTextConverter';

interface SymbolSelectorProps {
  symbols: SymbolMapping[];
  activeSymbols: Set<string>;
  onToggle: (symbol: string) => void;
  deletionRules: DeletionRule[];
  activeDeletions: Set<string>;
  onToggleDeletion: (label: string) => void;
}

export function SymbolSelector({ 
  symbols, 
  activeSymbols, 
  onToggle,
  deletionRules,
  activeDeletions,
  onToggleDeletion
}: SymbolSelectorProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow">
        <h2 className="text-lg font-semibold text-gray-900">変換する記号</h2>
        <div className="flex flex-col gap-2">
          {symbols.map((symbol) => (
            <Toggle
              key={symbol.from}
              pressed={activeSymbols.has(symbol.from)}
              onPressedChange={() => onToggle(symbol.from)}
              className="w-full justify-between"
            >
              <span className="text-sm">
                {symbol.label} {symbol.from === '()' ? '（）' : 
                  symbol.from === '[]' ? '［］' : 
                  `${symbol.from} → ${symbol.to}`}
              </span>
            </Toggle>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow">
        <h2 className="text-lg font-semibold text-gray-900">削除する記号</h2>
        <div className="flex flex-col gap-2">
          {deletionRules.map((rule) => (
            <Toggle
              key={rule.label}
              pressed={activeDeletions.has(rule.label)}
              onPressedChange={() => onToggleDeletion(rule.label)}
              className="w-full justify-between"
            >
              <span className="text-sm">{rule.label}</span>
            </Toggle>
          ))}
        </div>
      </div>
    </div>
  );
}