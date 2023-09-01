import { InputHTMLAttributes } from "react";
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

  const inputClasses = classNames(
		"border-0 bg-white rounded-lg focus:border focus:border-green focus:outline-none focus:ring-0 text-base py-3 px-6", 
		className)

	return (
		<div>
			<div className="w-full relative">
				{label && <div className="text-base text-gray mb-3">{label}</div>}
				<input
          className={inputClasses}
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
			{/* {error && <ErrorMessage message={errorMessage} />} */}
		</div>
	)
}