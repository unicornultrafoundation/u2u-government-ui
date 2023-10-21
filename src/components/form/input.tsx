import { InputHTMLAttributes, useCallback } from "react";
import { classNames } from "../../utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	value: any;
	placeholder?: any;
	append?: any;
	appendAction?: () => void
	error?: boolean
	errorMessage?: string
	label?: string
}


export const Input: React.FC<InputProps> = (props) => {
	const {
		onChange,
		value,
		placeholder,
		append,
		appendAction,
		error,
		errorMessage,
		className,
		type = "text",
		label = "",
		...rest
	} = props
	
	const inputClasses = useCallback(() => {
		const base = "bg-white rounded-lg focus:border focus:outline-none focus:ring-0 text-base py-3 px-4"
		const border = error ? "focus:border-error border border-error" : "focus:border-green border border-border-outline"
		return classNames(base, border, className)
	}, [className, error])

	return (
		<div>
			<div className="w-full relative">
				{label && <div className="text-base text-text mb-2 text-left">{label}</div>}
				<input
					className={inputClasses()}
					type={type}
					value={value}
					placeholder={placeholder || '0.0'}
					onChange={onChange}
					{...rest}
				/>
				<div className="absolute top-[50%] right-[10px] translate-y-[-50%]" onClick={appendAction}>
					{append}
				</div>
			</div>
			{error && <div className="text-sm text-error italic mt-1">{errorMessage}</div>}
		</div>
	)
}