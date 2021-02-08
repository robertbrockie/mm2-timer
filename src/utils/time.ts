export function formatSeconds(seconds:number) {
    if (seconds < 60) {
        return `${seconds}s`;
    } else {
        const leftOverSeconds = seconds % 60;
        return `${Math.floor(seconds/60)}m ${leftOverSeconds > 9 ? leftOverSeconds : "0" + leftOverSeconds}s`;
    }
}