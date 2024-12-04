export const timesData = () => {
    const result = [];
    for (let hours = 0; hours < 24; hours++) {
        for (let minutes = 0; minutes < 60; minutes = minutes + 15) {
            let h = '';
            let m = '';
            if (hours < 10) {
                h = '0' + hours;
            } else {
                h = hours as any;
            }
            if (minutes < 10) {
                m = '0' + minutes;
            } else {
                m = minutes as any;
            }
            result.push(h + ':' + m);
        }
    }
    return result;
}