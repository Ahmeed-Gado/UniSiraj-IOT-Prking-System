import { format, formatDistanceToNow } from 'date-fns';

export function formatDateTime(date: Date): string {
    return format(date, 'MMM dd, yyyy HH:mm:ss');
}

export function formatTime(date: Date): string {
    return format(date, 'HH:mm:ss');
}

export function formatRelativeTime(date: Date): string {
    return formatDistanceToNow(date, { addSuffix: true });
}

export function formatDate(date: Date): string {
    return format(date, 'MMM dd, yyyy');
}
