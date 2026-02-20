export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={`rounded border-slate-300 text-[#0f2d19] shadow-sm focus:ring-[#0f2d19] ${className}`}
        />
    );
}
