import React from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'destructive' | 'subtle'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export default function Button({ children, variant = 'primary', className = '', loading = false, leftIcon, rightIcon, disabled, ...props }: ButtonProps) {
  const isDisabled = disabled || loading

  const base = 'inline-flex items-center justify-center rounded-lg font-semibold transition-transform duration-300'

  const variantClass = variant === 'primary'
    ? 'bg-white text-black px-5 py-2 shadow-lg hover:scale-105 hover:drop-shadow-[0_0_20px_rgba(11,179,138,0.5)]'
    : variant === 'secondary'
      ? 'glass border border-[rgba(255,255,255,0.06)] text-[rgba(255,255,255,0.92)] px-4 py-2'
      : variant === 'ghost'
        ? 'transparent text-[rgba(255,255,255,0.9)] px-3 py-2'
        : variant === 'destructive'
          ? 'bg-red-600 text-white px-4 py-2'
          : 'glass px-3 py-2'

  return (
    <button
      className={`${base} ${variantClass} ${className}`}
      aria-busy={loading || undefined}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <svg width="16" height="16" viewBox="0 0 50 50" aria-hidden="true" focusable="false" className="mr-2">
          <circle cx="25" cy="25" r="20" stroke="rgba(255,255,255,0.6)" strokeWidth="5" fill="none" strokeDasharray="31.4 31.4">
            <animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.9s" repeatCount="indefinite" />
          </circle>
        </svg>
      ) : leftIcon ? (
        <span className="inline-flex mr-2 items-center">{leftIcon}</span>
      ) : null}

      <span className="inline-flex items-center gap-2">{children}</span>

      {rightIcon ? <span className="inline-flex ml-2 items-center">{rightIcon}</span> : null}
    </button>
  )
}
