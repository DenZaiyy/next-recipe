import { format } from "date-fns"

export function formatFullDate(date: Date): string {
	return format(new Date(date), "dd/MM/yyyy HH:mm:ss") ?? "Date not available"
}

export function formatDate(data: Date): string {
	return format(new Date(data), "dd/MM/yyyy") ?? "Date not available"
}
