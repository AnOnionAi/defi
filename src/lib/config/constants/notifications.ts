import type { Notification } from '$lib/ts/types';
export const transactionSend: Notification = {
	text: 'Transaction Sent',
	position: 'top-right',
	type: 'success',
	removeAfter: 5000
};

export const transactionDeniedByTheUser: Notification = {
	text: 'Transaction Denied',
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
