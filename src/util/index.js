
const getPM25Color = (pm25) => {
    console.log('pm25', pm25)
    if (pm25 < 12) {
        return 'green';
    }
    if (pm25 < 35.5) {
        return 'yellow';
    }
    if (pm25 < 55.5) {
        return 'orange';
    }
    if (pm25 < 150.5) {
        return 'red';
    }
    if (pm25 < 250.5) {
        return 'purple';
    }
    if (pm25 < 350.5) {
        return 'maroon';
    }
    return 'darkred';
}



export const getMarkerColor = (measurements) => {
    for (let i = 0; i < measurements.length; i++) {
        if (measurements[i].parameter === 'pm25') {
            return getPM25Color(measurements[i].value);
        }
    }
    return 'green';
}
