import { formatToPersianTime } from './formatDate'; // Assuming you have this helper

// A helper to compare two values, handling null/undefined
function areValuesDifferent(val1, val2) {
    // If one is null/undefined and the other isn't
    if (!val1 && val2) return true;
    if (val1 && !val2) return true;
    // If both are null/undefined, they are the same
    if (!val1 && !val2) return false;
    // For dates, compare their ISO strings
    if (val1 instanceof Date && val2 instanceof Date) {
        return val1.toISOString() !== val2.toISOString();
    }
    // For other primitive types
    return val1 !== val2;
}

/**
 * Compares a report's current state with its last edit history entry.
 * @param {object} report - The full attendance report object.
 * @returns {Array<string>} An array of human-readable change descriptions.
 */
export function compareChanges(report) {
    if (!report || !report.editHistory || report.editHistory.length === 0) {
        return []; // No history to compare against
    }

    const changes = [];
    const currentState = report;
    // Get the most recent edit from the history array
    const lastState = report.editHistory[report.editHistory.length - 1].previousState;

    // 1. Compare Check-in Time
    if (areValuesDifferent(lastState.checkIn, currentState.checkIn)) {
        const from = lastState.checkIn ? formatToPersianTime(lastState.checkIn) : 'ثبت نشده';
        const to = currentState.checkIn ? formatToPersianTime(currentState.checkIn) : 'ثبت نشده';
        changes.push(`زمان ورود از "${from}" به "${to}" تغییر کرد.`);
    }

    // 2. Compare Check-out Time
    if (areValuesDifferent(lastState.checkOut, currentState.checkOut)) {
        const from = lastState.checkOut ? formatToPersianTime(lastState.checkOut) : 'ثبت نشده';
        const to = currentState.checkOut ? formatToPersianTime(currentState.checkOut) : 'ثبت نشده';
        changes.push(`زمان خروج از "${from}" به "${to}" تغییر کرد.`);
    }

    // 3. Compare Status
    if (areValuesDifferent(lastState.status, currentState.status)) {
        const from = lastState.status || 'نامشخص';
        const to = currentState.status || 'نامشخص';
        changes.push(`وضعیت از "${from}" به "${to}" تغییر کرد.`);
    }

    // 4. Compare Justification Status
    if (areValuesDifferent(lastState.isJustified, currentState.isJustified)) {
        const from = lastState.isJustified ? 'توجیه‌شده' : 'توجیه‌نشده';
        const to = currentState.isJustified ? 'توجیه‌شده' : 'توجیه‌نشده';
        changes.push(`وضعیت توجیه از "${from}" به "${to}" تغییر کرد.`);
    }
    
    // Note: We don't compare justificationNotes as it's less critical for a summary.
    // But you could easily add it here if needed.

    return changes;
}