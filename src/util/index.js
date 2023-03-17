
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


export const makeIcon = (color) => {
    return L.icon({
        iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    })
}

export const readableDateTime = (time) => {
    return `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
}