import type { Notification } from "$lib/ts/types"
export const transactionSend: Notification = {
    text: 'Transaction Send to Metamask 🦊',
    position: 'bottom-right',
    type: 'success',
    removeAfter:4000,
}

export const transactionDeniedByTheUser: Notification = {
    text: 'Transaction Denied 📛',
    position: 'bottom-right',
    type: 'danger',
    removeAfter:4000,
}

export const transactionCompleted: Notification = {
    text: 'Transaction Completed 💸',
    position: 'bottom-right',
    type: 'success',
    removeAfter:4000,
}