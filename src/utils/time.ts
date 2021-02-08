export function formatSeconds(seconds:number) {
    const mins = Math.floor(seconds/60);
    const secs = seconds % 60;

    return `${mins > 9 ? mins : "0" + mins}m ${secs > 9 ? secs : "0" + secs}s`;
}