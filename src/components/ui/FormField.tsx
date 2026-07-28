import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface BaseProps {
  label: string;
  error?: string;
}

type InputProps = BaseProps & InputHTMLAttributes<HTMLInputElement> & { as?: "input" };
type TextareaProps = BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement> & { as: "textarea" };

export function FormField(props: InputProps | TextareaProps) {
  const { label, error, as, ...rest } = props;

  const baseClasses =
    "w-full bg-transparent border border-line focus:border-red outline-none px-4 py-3 text-ink text-sm placeholder:text-grey-dim transition-colors duration-150";

  return (
    <label className="block">
      <span className="text-mono text-[10px] tracking-[0.2em] text-grey-dim">{label.toUpperCase()}</span>
      {as === "textarea" ? (
        <textarea
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          className={`${baseClasses} mt-2 min-h-32 resize-y`}
        />
      ) : (
        <input {...(rest as InputHTMLAttributes<HTMLInputElement>)} className={`${baseClasses} mt-2`} />
      )}
      {error && <span className="mt-1.5 block text-mono text-[10px] tracking-wider text-red">{error.toUpperCase()}</span>}
    </label>
  );
}
