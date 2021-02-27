export function formatSeconds(time:number) {

    let ms = time % 1000;
    time = (time - ms) / 1000;
    let secs = time % 60;
    time = (time - secs) / 60;
    let mins = time % 60;

    return `${pad(mins)}:${pad(secs)}:${pad(ms, 3)}`;
}

// Pad to 2 or 3 digits, default is 2
function pad(n:number, z:number = 2) {
    z = z || 2;
    return ('00' + n).slice(-z);
  }