import { toast, ToastOptions, ToastPosition } from 'react-toastify'
import React from 'react'

type ToastType = 'success' | 'info' | 'warning' | 'danger'


const ToastMessage: React.FC<{
	title: string;
	msg: any;
	type: ToastType
}> = ({ title, msg, type }) => {
	return (
		<div className='w-[calc(100% - 44px)] text-left'>
			<div className='text-base font-semibold'>{title}</div>
			<div className='text-sm text-gray'>{msg}</div>
		</div>
	)
}

const toastOptions = (position: ToastPosition): ToastOptions => {
	return {
		position: position,
		autoClose: 3000,
		hideProgressBar: true,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		toastId: 'kai-dex-toast',
		closeButton: false,
	} as ToastOptions
}

const toastPosition: ToastPosition = 'top-right'

export const toastSuccess = (message: any, title: string = 'Success', position: ToastPosition = toastPosition) => {
	toast.success(<ToastMessage title={title} msg={message} type='success' />, toastOptions(position))
}

export const toastDanger = (message: any, title: string = 'Error', position: ToastPosition = toastPosition) => {
	toast.error(<ToastMessage title={title} msg={message} type='danger' />, toastOptions(position))
}

export const toastInfo = (message: any, title: string = 'Info', position: ToastPosition = toastPosition) => {
	toast.info(<ToastMessage title={title} msg={message} type='info' />, toastOptions(position))
}

export const toastWarning = (message: any, title: string = 'Warning', position: ToastPosition = toastPosition) => {
	toast.info(<ToastMessage title={title} msg={message} type='warning' />, toastOptions(position))
}
