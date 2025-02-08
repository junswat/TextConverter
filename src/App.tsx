import React from 'react';
import { TextInput } from './components/TextInput';
import { TextOutput } from './components/TextOutput';
import { SymbolSelector } from './components/SymbolSelector';
import { useTextConverter, defaultSymbols, deletionRules } from './hooks/useTextConverter';

function App() {
  const { 
    inputText, 
    setInputText, 
    activeSymbols, 
    toggleSymbol, 
    activeDeletions,
    toggleDeletion,
    convertedText 
  } = useTextConverter();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(convertedText);
      // TODO: Add toast notification
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">テキスト記号変換ツール</h1>
        
        <div className="grid grid-cols-10 gap-4">
          <div className="col-span-4">
            <TextInput
              value={inputText}
              onChange={setInputText}
              charCount={inputText.length}
            />
          </div>
          
          <div className="col-span-2">
            <SymbolSelector
              symbols={defaultSymbols}
              activeSymbols={activeSymbols}
              onToggle={toggleSymbol}
              deletionRules={deletionRules}
              activeDeletions={activeDeletions}
              onToggleDeletion={toggleDeletion}
            />
          </div>
          
          <div className="col-span-4">
            <TextOutput
              value={convertedText}
              onCopy={handleCopy}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;