import { GREEN_25, ORANGE_25, VIOLET_25, YELLOW_25 } from "./constants";

// https://github.com/pointhi/leaflet-color-markers
const getPM25Color = (pm25) => {
    // Returns a marker color based on the pm25 (particulate) value.
    if (pm25 < GREEN_25) {
        return 'green';
    }
    if (pm25 < YELLOW_25) {
        return 'yellow';
    }
    if (pm25 < ORANGE_25) {
        return 'orange';
    }
    if (pm25 < VIOLET_25) {
        return 'violet';
    }
    return 'red';
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
    if (!time) {
        return '';
    }

    if (typeof time !== 'object' && typeof time !== 'string') {
        time = new Date(time);
    }
    return `${time.toLocaleDateString()} ${time.toLocaleTimeString()}`;
}