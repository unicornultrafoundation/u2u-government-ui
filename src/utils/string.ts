import { appConfig } from "../contants";

export const classNames = (...classes: any): string => {
  return classes.filter(Boolean).join(' ')
}

export const truncate = ({ str, headCount = 10, tailCount = 4 }: {
	str: string;
	headCount?: number;
	tailCount?: number;
}) => {
	if (!str || headCount > str.length - tailCount) {
		return str
	}
	return str.substring(0, headCount - 1) + '...' + str.substring(str.length - tailCount - 1)
}


export const exploreAddress = (_address: string): string => `${appConfig.explorer}/address/${_address}`
export const exploreTransaction = (_address: string): string => `${appConfig.explorer}/tx/${_address}`



export const millisecondToDay = (time: number) => {
	if (!time) return '-'
	const timeInSeconds = Math.floor(time / 1000);
	const days = Math.floor((timeInSeconds / 86400))
	const hours = Math.floor((timeInSeconds % 86400) / 3600)
	const minutes = Math.floor((timeInSeconds % 3600) / 60)
	const seconds = timeInSeconds - days*86400 - hours * 3600 - minutes * 60;

	const hourString = hours ? `${hours} hr${hours > 1 ? 's' : ''}` : '';
	const minuteString = minutes ? `${minutes} min${minutes > 1 ? 's' : ''}` : '';
	const secondString = seconds ? `${seconds} sec${seconds > 1 ? 's' : ''}` : '';
	const daysString = days ? `${days} day${days > 1 ? 's' : ''}` : '';

	if(daysString) {
			return `${daysString}`
	}
	if(hourString) {
			return `${hourString}`
	}
	if(minuteString) {
			return `${minuteString}`
	}
	return `${secondString}`
};

export const dateToUTCString = (time: any) => {
	const d = new Date(time);
	return d.toUTCString()
}


export const nowTime = () => (new Date()).getTime();