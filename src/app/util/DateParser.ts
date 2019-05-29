const getMonth = monthIndex => {
    return [
        'januari',
        'februari',
        'maart',
        'april',
        'mei',
        'juni',
        'juli',
        'augustus',
        'september',
        'oktober',
        'november',
        'december'][monthIndex];
};

export const parseTimestamp = timestamp => {
    const d = new Date(timestamp);

    const day = d.getDate();
    const month = d.getMonth();
    const year = d.getFullYear();
    let hours = d.getHours();
    let mins = d.getMinutes();
    let secs = d.getSeconds();

    if (hours < 10) {
        hours = +`0${hours}`;
    }

    if (mins < 10) {
        mins = +`0${mins}`;
    }

    if (secs < 10) {
        secs = +`0${secs}`;
    }


    return `${hours}:${mins}:${secs} - ${day} ${getMonth(month)} ${year}`;
};

export const convertJSONDateToString = date => {
    const day = date.dayOfMonth;

    const month = date.month;
    const year = date.year;

    let hours = date.hour;
    hours = hours < 10 ? `0${hours}` : hours;
    let minutes = date.minute;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    let seconds = date.second;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${hours}:${minutes}:${seconds} - ${day} ${month} ${year}`;
};
