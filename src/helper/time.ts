import moment from "moment"
import "moment/locale/id"

export const formatDate = (date: Date): string => {
    return moment(date).format("YYYY-MM-DD")
}

export const formatTime = (date: Date): string => {
    return moment(date).format("HH:mm:ss")
}

export const formatAndSubtractTime = (date: Date, subtract: string) => {
    return moment(date).subtract(subtract).format("HH:mm:ss")
}

export const formatDateTime = (date: Date): string => {
    return moment(date).format("YYYY-MM-DD HH:mm:ss")
}

export const formatDateMonth = (date: Date): string => {
    return moment(date).format("DD-MMMMM")
}

export const formatFullDate = (date: Date): string => {
    return moment(date).format("dddd DD MMMM YYYY")
}