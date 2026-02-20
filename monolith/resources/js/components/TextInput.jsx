import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={`rounded-md border border-slate-200 px-4 py-2.5 shadow-sm transition focus:border-[#0f2d19] focus:ring-2 focus:ring-[#0f2d19]/30 ${className}`}
            ref={localRef}
        />
    );
});
