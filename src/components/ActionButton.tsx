import React from 'react';
import { Plus } from 'lucide-react';

interface ActionButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({ onClick, isLoading, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        w-full py-4 rounded-xl font-raleway font-semibold text-lg transition-all duration-300 ease-in-out
        focus:outline-none focus:ring-4 focus:ring-softblue/30 min-h-[44px]
        motion-reduce:transition-none
        ${disabled || isLoading
          ? 'bg-sage/30 text-darkgray/50 cursor-not-allowed'
          : 'bg-gradient-to-r from-sage via-softblue to-sage bg-size-200 bg-pos-0 hover:bg-pos-100 text-white shadow-subtle hover:shadow-subtle hover:scale-[1.02] active:scale-[0.98] animate-pulse-slow motion-reduce:animate-none motion-reduce:hover:scale-100 motion-reduce:active:scale-100'
        }
      `}
      style={{
        backgroundSize: '200% 100%',
        backgroundPosition: disabled || isLoading ? '0% 50%' : '0% 50%',
      }}
    >
      <div className="flex items-center justify-center space-x-2">
        <Plus className={`w-5 h-5 ${isLoading ? 'animate-spin motion-reduce:animate-none' : ''}`} />
        <span>
          {isLoading ? 'Saving Entry...' : 'Add Journal Entry'}
        </span>
      </div>
    </button>
  );
};

export default ActionButton;