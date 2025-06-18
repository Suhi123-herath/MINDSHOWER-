import React from 'react';

interface ThemedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
}

const ThemedButton: React.FC<ThemedButtonProps> = ({
  children,
  onClick,
  href,
  target,
  rel,
  className = '',
  disabled = false,
  type = 'button',
  ariaLabel,
}) => {
  const baseClasses = `
    inline-flex items-center justify-center
    px-6 py-3 rounded-xl
    bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100
    text-lightblue font-raleway font-semibold text-base
    border border-lightblue/30
    transition-all duration-300 ease-in-out
    hover:shadow-subtle hover:border-lightblue/50 hover:scale-105
    active:scale-95
    focus:outline-none focus:ring-2 focus:ring-lightblue/50 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
    motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:active:scale-100
    min-h-[44px] min-w-[44px]
  `;

  const combinedClasses = `${baseClasses} ${className}`.trim();

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={combinedClasses}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default ThemedButton;