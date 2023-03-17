import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import axios from 'axios';
import { getAirQualityData } from '@/api';
import { getMarkerColor } from '@/util';
import { INSTRUCTIONS } from '@/util/constants';
import { Button, Steps } from 'antd';
import { makeMetadataFile } from '@/util/stor';

const MapWithOverlay = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [airQualityData, setAirQualityData] = useState([]);
  const [recording, setRecording] = useState(false);
  const [start, setStart] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [end, setEnd] = useState(null);

  const clear = () => {
    setStart(null);
    setEnd(null);
    setRecording(false);
    setAirQualityData([]);
  }

  const handleMapClick = async (event) => {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;
    if (!start) {
      setStart({ lat, lng });
      return;
    }

    if (!end) {
      setEnd({ lat, lng });
      return;
    }

    if (!recording) {
      alert('Please start recording first')
      return;
    }
    setSelectedLocation(event.latlng);

    try {
      const response = await getAirQualityData(lat, lng);
      console.log('data', response.data)
      const results = response.data.results;
      setAirQualityData([...airQualityData, ...results]);
    }
    catch (error) {
      console.log(error);
    }
  }

  const toggleRecording = async () => {
    if (recording) {
      await saveData(new Date());
    } else {
      setStartTime(new Date());
    }
    setRecording(!recording);
  }

  const saveData = async (endTime) => {
    setLoading(true);
    const data = {
      start,
      startTime,
      end,
      endTime,
      airQualityData,
    }
    console.log('data', data)
    try {
    const f = makeMetadataFile(data, 'metadata.json');
    const cid = await storeFiles([f]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }


  }

  const MapEvent = () => {
    const map = useMapEvents({
      click: handleMapClick,
    })
    return <></>
  }

  return (
    <div 
  style={{
    position: 'relative',
  }}
>
  <div
    style={{
      position: 'absolute',
      margin: '10px',
      borderRadius: '5px',
      width: 300,
      height: 400,
      background: 'white',
      top: 0,
      left: 0,
      padding: '10px',
      zIndex: 10000
    }}  >
      <img src='/logo.png' style={{ width: '100px' }} />

      <div style={{ marginTop: '10px' }}>
        <Steps
          direction="vertical"
          current={!!start + !!end + !!recording}
          style={{ width: '100%' }}
        >
          <Steps.Step title="Start" description="Click to set start point" />
          <Steps.Step title="End" description="Click to set end point" />
          <Steps.Step title="Record" description="Click to start recording" />
        </Steps>
        <br/>
        <br/>

        <Button type="primary" 
        loading={loading}
        disabled={!start || !end}
        onClick={() => toggleRecording()}>{!recording ? 'Start' : 'End'} Recording</Button>
        <br/>

        <a style={{
          marginTop: '10px',
          display: 'block',
          color: 'blue',
          cursor: 'pointer'
        }} href="#" onClick={(e) => {
          e.preventDefault();
          clear()
          }}>Reset</a>
      </div>

    </div>

    <MapContainer style={{ width: '100%', height: 1000 }} center={[37.7749, -122.4194]} zoom={13}>
      <MapEvent />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {selectedLocation && <Marker position={selectedLocation}>
        <Popup>
          You selected this location
        </Popup>
      </Marker>}
      {airQualityData?.map((result) => (
        <Marker key={result.location} position={[result.coordinates.latitude, result.coordinates.longitude]} icon={
          L.icon({
            iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${getMarkerColor(result.measurements)}.png`,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          })
        }>
          <Popup>
            {result.location}: {result.measurements[0].value} {result.measurements[0].unit}
          </Popup>
        </Marker>
      ))}
      <div className="overlay" style={{ background: 'rgba(255, 255, 255, 0.5)', pointerEvents: 'none', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}></div>
    </MapContainer>
    </div>
  );
};

export default MapWithOverlay;
