
import React from 'react';

interface GoldButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  loading?: boolean;
}

export const GoldButton: React.FC<GoldButtonProps> = ({ children, onClick, className = "", loading }) => {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`
        w-full bg-gradient-to-b from-[#D4AF37] to-[#AA8030] 
        text-[#051321] font-serif font-bold uppercase 
        py-4 px-6 rounded-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_4px_6px_rgba(0,0,0,0.3)] 
        border border-[#F9E2AE]/50 hover:brightness-110 active:brightness-95
        transition-all text-sm tracking-widest leading-tight
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-4 w-4 text-[#051321]" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </span>
      ) : children}
    </button>
  );
};
