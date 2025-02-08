import React from 'react';
import { Copy } from 'lucide-react';

interface TextOutputProps {
  value: string;
  onCopy: () => void;
}

export function TextOutput({ value, onCopy }: TextOutputProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label htmlFor="output" className="text-sm font-medium text-gray-700">
          変換後のテキスト
        </label>
        <button
          onClick={onCopy}
          className="inline-flex items-center gap-1 rounded-md bg-gray-50 px-2 py-1 text-sm text-gray-600 hover:bg-gray-100"
        >
          <Copy className="h-4 w-4" />
          コピー
        </button>
      </div>
      <textarea
        id="output"
        value={value}
        readOnly
        className="min-h-[300px] w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm"
      />
    </div>
  );
}