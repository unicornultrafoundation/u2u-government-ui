export const classNames = (...classes: any) => {
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