import type { Notification } from '$lib/ts/types';
export const transactionSend: Notification = {
	text: 'Transaction Sent 👍',
	position: 'bottom-center',
	type: 'success',
	removeAfter: 4000
};

export const transactionDeniedByTheUser: Notification = {
	text: 'Transaction Denied 📛',
	position: 'bottom-center',
	type: 'danger',
	removeAfter: 4000
};

export const transactionCompleted: Notification = {
	text: 'Transaction Completed 💸',
	position: 'bottom-center',
	type: 'success',
	removeAfter: 4000
};

export const wrongInput: Notification = {
	text: 'Be sure to input a number',
	position: 'bottom-center',
	type: 'warning',
	removeAfter: 2000
};
