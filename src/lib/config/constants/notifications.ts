import type { Notification } from '$lib/types/types';
export const transactionSend: Notification = {
	text: 'Transaction Sent',
	position: 'top-right',
	type: 'success',
	removeAfter: 5000
};

export const transactionDenied: Notification = {
	text: 'Transaction Denied',
	position: 'top-right',
	type: 'danger',
	removeAfter: 5000
};

export const deniedSignature: Notification = {
	text: 'User denied transaction signature',
	position: 'top-right',
	type: 'danger',
	removeAfter: 5000
};

export const transactionUnderpriced: Notification = {
	text: 'Transaction Underpriced',
	position: 'top-right',
	type: 'danger',
	removeAfter: 5000
};

export const invalidTransaction: Notification = {
	text: 'Transaction includes invalid data',
	position: 'top-right',
	type: 'danger',
	removeAfter: 5000
};

export const transactionCompleted: Notification = {
	text: 'Transaction Completed',
	position: 'top-right',
	type: 'success',
	removeAfter: 5000
};

export const wrongInput: Notification = {
	text: 'Be sure to input a number',
	position: 'top-right',
	type: 'warning',
	removeAfter: 5000
};
