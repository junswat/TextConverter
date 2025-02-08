import React from 'react';

interface TextInputProps {
  value: string;
  onChange: (text: string) => void;
  charCount: number;
}

export function TextInput({ value, onChange, charCount }: TextInputProps) {
  const maxChars = 10000;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="input" className="text-sm font-medium text-gray-700">
        入力テキスト
      </label>
      <textarea
        id="input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[300px] w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:ring-blue-500"
        placeholder="ここにテキストを入力してください..."
        maxLength={maxChars}
      />
      <div className="text-right text-sm text-gray-500">
        {charCount} / {maxChars} 文字
      </div>
    </div>
  );
}