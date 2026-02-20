export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={`inline-flex items-center rounded-md border border-transparent bg-[#0f2d19] px-5 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-[#0d2615] focus:bg-[#0d2615] focus:outline-none focus:ring-4 focus:ring-[#0f2d19]/30 focus:ring-offset-2 active:bg-[#0a1c10] ${
                disabled && 'opacity-25'
            } ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
