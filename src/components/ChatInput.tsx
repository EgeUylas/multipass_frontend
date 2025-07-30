<<<<<<< HEAD
'use client';

import React, { useState, KeyboardEvent, FormEvent } from 'react';
=======
import React, { useState, KeyboardEvent } from 'react';
>>>>>>> 5fcaa1a (Initial frontend commit)
import { Send, Loader2 } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
}

<<<<<<< HEAD
export default function ChatInput({
  onSendMessage,
  isLoading = false,
  disabled = false,
}: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = message.trim();
    if (trimmed && !isLoading && !disabled) {
      onSendMessage(trimmed);
=======
export default function ChatInput({ onSendMessage, isLoading = false, disabled = false }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading && !disabled) {
      onSendMessage(message.trim());
>>>>>>> 5fcaa1a (Initial frontend commit)
      setMessage('');
    }
  };

<<<<<<< HEAD
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const formEvent = new Event('submit', { bubbles: true, cancelable: true });
      e.currentTarget.form?.dispatchEvent(formEvent);
=======
  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
>>>>>>> 5fcaa1a (Initial frontend commit)
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white p-4">
      <form onSubmit={handleSubmit} className="flex gap-4 items-end">
        <div className="flex-1">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
<<<<<<< HEAD
            onKeyDown={handleKeyDown}
            placeholder="Multipass komutlarınızı yazın... (örn: Ubuntu VM oluştur veya VM'leri listele)"
=======
            onKeyPress={handleKeyPress}
            placeholder="Multipass komutlarınızı yazın... (örn: 'Ubuntu VM oluştur' veya 'VM'leri listele')"
>>>>>>> 5fcaa1a (Initial frontend commit)
            className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:bg-gray-100 disabled:cursor-not-allowed text-black font-medium"
            rows={3}
            disabled={disabled || isLoading}
            maxLength={1000}
          />
          <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
<<<<<<< HEAD
            {/* Hata veren satır burasıydı: tek tırnak yerine &apos; kullanıldı */}
=======
>>>>>>> 5fcaa1a (Initial frontend commit)
            <span>Enter ile gönder, Shift+Enter ile yeni satır</span>
            <span>{message.length}/1000</span>
          </div>
        </div>
<<<<<<< HEAD

=======
        
>>>>>>> 5fcaa1a (Initial frontend commit)
        <button
          type="submit"
          disabled={!message.trim() || isLoading || disabled}
          className="flex-shrink-0 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </button>
      </form>
<<<<<<< HEAD

      {/* Quick Action Buttons */}
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
=======
      
      {/* Quick Action Buttons */}
      <div className="mt-3 flex flex-wrap gap-2">
        <button
>>>>>>> 5fcaa1a (Initial frontend commit)
          onClick={() => onSendMessage('VM listele')}
          disabled={isLoading || disabled}
          className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
<<<<<<< HEAD
          VM&apos;leri Listele
        </button>
        <button
          type="button"
=======
          VM'leri Listele
        </button>
        <button
>>>>>>> 5fcaa1a (Initial frontend commit)
          onClick={() => onSendMessage('Ubuntu VM oluştur')}
          disabled={isLoading || disabled}
          className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Ubuntu VM Oluştur
        </button>
        <button
<<<<<<< HEAD
          type="button"
=======
>>>>>>> 5fcaa1a (Initial frontend commit)
          onClick={() => onSendMessage('Merhaba')}
          disabled={isLoading || disabled}
          className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Nasılsın?
        </button>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
} 
>>>>>>> 5fcaa1a (Initial frontend commit)
