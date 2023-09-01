import { NumericFormat } from 'react-number-format'
import { removeTrailingZeros, shortenDisplayNumber } from '../../utils';


export const RenderNumberFormat: React.FC<{
	amount: any;
	fractionDigits?: number;
	shorten?: boolean;
	formatSmallNumber?: boolean;
	prefix?: string;
	style?: React.CSSProperties;
	className?: string;
}> = (
	{
		amount,
		fractionDigits = 4,
		shorten = false,
		formatSmallNumber = false,
		prefix = '',
		className,
		style,
	}) => {

		if (!amount || Number(amount) <= 0) {
			return <NumericFormat value={0} displayType={'text'} prefix={prefix} />
		}

		let amountStr = Number(amount) % 1 === 0 ? parseInt(amount) : removeTrailingZeros(Number(amount).toFixed(fractionDigits))

		if (formatSmallNumber && Number(amount) < 0.001) {
			return <NumericFormat
				className={className}
				style={style}
				displayType={'text'}
				thousandSeparator={true}
				decimalScale={fractionDigits}
				renderText={() => `< 0.001`} />
		}

		if (shorten) {
			return <NumericFormat
				className={className}
				style={style}
				displayType={'text'}
				thousandSeparator={true}
				decimalScale={fractionDigits}
				renderText={() => shortenDisplayNumber(amountStr, prefix, fractionDigits)}
			/>
		}

		return <NumericFormat
			className={className}
			style={style}
			value={amountStr}
			displayType={'text'}
			thousandSeparator={true}
			decimalScale={fractionDigits}
			prefix={prefix}
		/>
	}