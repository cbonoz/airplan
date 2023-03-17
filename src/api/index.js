import axios from 'axios';

const BASE_URL = 'https://api.openaq.org/v2'

export const getAirQualityData = (lat, lng) => {
    const latString = lat.toFixed(5);
    const lngString = lng.toFixed(5);
    const url = `${BASE_URL}/latest?coordinates=${latString},${lngString}`;
    return axios.get(url);
}