import { useState, useMemo, useCallback } from 'react';
import type { SymbolMapping } from '../components/SymbolSelector';

export const defaultSymbols: SymbolMapping[] = [
  { label: 'カッコ', from: '()', to: '（）' },
  { label: 'ブラケット', from: '[]', to: '［］' },
  { label: 'ハイフン', from: '-', to: 'ー' },
  { label: 'ダーシ', from: '―', to: '―' },
  { label: 'アスタリスク', from: '*', to: '＊' },
];

export interface DeletionRule {
  label: string;
  pattern: RegExp;
}

export const deletionRules: DeletionRule[] = [
  { 
    label: '改行', 
    pattern: /\n/g 
  },
  { 
    label: 'スペース', 
    pattern: /[\u0020\u3000\t]/g // 半角スペース、全角スペース、タブ
  },
];

export function useTextConverter() {
  const [inputText, setInputText] = useState('');
  const [activeSymbols, setActiveSymbols] = useState<Set<string>>(
    new Set(['()']) // カッコのみを初期選択
  );
  const [activeDeletions, setActiveDeletions] = useState<Set<string>>(new Set());

  const toggleSymbol = useCallback((symbol: string) => {
    setActiveSymbols((prev) => {
      const next = new Set(prev);
      if (next.has(symbol)) {
        next.delete(symbol);
      } else {
        next.add(symbol);
      }
      return next;
    });
  }, []);

  const toggleDeletion = useCallback((label: string) => {
    setActiveDeletions((prev) => {
      const next = new Set(prev);
      if (next.has(label)) {
        next.delete(label);
      } else {
        next.add(label);
      }
      return next;
    });
  }, []);

  const convertedText = useMemo(() => {
    let result = inputText;

    // Apply symbol conversions
    defaultSymbols.forEach((symbol) => {
      if (activeSymbols.has(symbol.from)) {
        if (symbol.from === '()') {
          result = result.replace(/\(/g, '（').replace(/\)/g, '）');
        } else if (symbol.from === '[]') {
          result = result.replace(/\[/g, '［').replace(/\]/g, '］');
        } else {
          result = result.replaceAll(symbol.from, symbol.to);
        }
      }
    });

    // Apply deletions
    deletionRules.forEach((rule) => {
      if (activeDeletions.has(rule.label)) {
        result = result.replace(rule.pattern, '');
      }
    });

    return result;
  }, [inputText, activeSymbols, activeDeletions]);

  return {
    inputText,
    setInputText,
    activeSymbols,
    toggleSymbol,
    activeDeletions,
    toggleDeletion,
    convertedText,
  };
}