import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, ZoomControl, Polyline } from 'react-leaflet';
import { getAirQualityData } from '@/api';
import { getMarkerColor, makeIcon, readableCity, readableDateTime } from '@/util';
import { APP_NAME, RECORD_STEPS } from '@/util/constants';
import { AutoComplete, Button, Modal, Steps, notification, Card } from 'antd';
import Image from 'next/image';
import { ipfsUrl, makeMetadataFile, storeFiles } from '@/util/stor';
import { CITIES } from '@/util/cities';

export const CITY_OPTIONS = CITIES.map((data) => {
  return {
    data,
    value: readableCity(data)
  }
})


const MapWithOverlay = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [airQualityData, setAirQualityData] = useState([]);
  const [recording, setRecording] = useState(false);
  const [start, setStart] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const [hidePanel, setHidePanel] = useState(false);

  const [end, setEnd] = useState(null);
  const [map, setMap] = useState(null);
  const [result, setResult] = useState(null);

  const [api, contextHolder] = notification.useNotification();

  const noDataNotification = () => {
    api.warning({
      message: 'No data found',
      description:
        'Try clicking another location or try again.',
      duration: 1.5,
    });
  };

  const clear = () => {
    setStart(null);
    setEnd(null);
    setRecording(false);
    setResult(null)
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
      alert('Please start recording to begin the journey')
      return;
    }
    setSelectedLocation(event.latlng);

    try {
      const response = await getAirQualityData(lat, lng);
      console.log('data', response.data)
      const results = response.data.results;
      if (Array.isArray(results) && results.length > 0) {
        setAirQualityData([...airQualityData, ...results]);
      } else {
        console.log('no results')
        noDataNotification();
      }
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
      app: APP_NAME,
      start,
      startTime,
      end,
      endTime,
      airQualityData,
    }
    console.log('data', data)
    const fileName = `trip_${startTime.toISOString()}.json`;
    try {
      const f = makeMetadataFile(data, fileName);
      const cid = await storeFiles([f]);
      data['cid'] = cid;
      data['url'] = ipfsUrl(cid);
      console.log('set result', data)
      setResult(data)
    } catch (error) {
      console.log(error);
      alert('Failed to save data: ' + error.message)
    } finally {
      setLoading(false);
    }


  }

  const MapEvent = () => {
    const m = useMapEvents({
      click: handleMapClick,
      load: (m) => {
        m.locate();
        setMap(m)
      }
    })
    // setMap(m)
    return <></>
  }

  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      {contextHolder}

      <div
        style={{
          position: 'absolute',
          margin: '10px',
          borderRadius: '5px',
          opacity: 0.95,
          width: 300,
          height: hidePanel ? 60 : 425,
          background: 'white',
          top: 0,
          left: 0,
          padding: '10px',
          zIndex: 999
        }}  >
        {/* <img src='/logo.png' style={{ width: '100px' }} /> */}
        <p>
          Instructions
          &nbsp;
          {recording && <a href="#" onClick={(e) => {
            e.preventDefault();
            setHidePanel(!hidePanel)
          }}>{hidePanel ? 'Show' : 'Hide'}</a>}
        </p>

        {!hidePanel && <div style={{ marginTop: '10px' }}>
          <Steps
            direction="vertical"
            current={!!start + !!end + !!recording}
            style={{ width: '100%' }}
            items={RECORD_STEPS}
          />
          <br />
          <br />

          <Button type="primary"
            loading={loading}
            disabled={!start || !end}
            onClick={() => toggleRecording()}>{!recording ? 'Start' : 'End'} Recording</Button>
          <br />

          <a style={{
            marginTop: '10px',
            display: 'block',
            color: 'blue',
            cursor: 'pointer'
          }} href="#" onClick={(e) => {
            e.preventDefault();
            clear()
          }}>Reset</a>
          <br />

          {!start && !end && <AutoComplete
            options={CITY_OPTIONS}
            style={{ width: 200 }}
            filterOption={(inputValue, option) =>
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            }
            onChange={(value) => {
              setValue(value)
            }}
            value={value}
            onSelect={(value, opt) => {
              console.log('selected', value, opt, map)
              setValue(value)
              if (!map) {
                console.log('no map set')
                return
              }
              const { data } = opt
              map.flyTo([data.lat, data.lng], 13, {
                animate: true,
                duration: 3
              })
            }}
            placeholder="Quick navigate"
          />}


        </div>}
      </div>

      <MapContainer
        style={{ width: '100%', height: 1000 }}
        ref={setMap}
        center={[37.7749, -122.4194]}
        zoom={13}
        zoomControl={false}
      >
        <MapEvent />
        <ZoomControl
          position="topright" />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {/* {selectedLocation && <Marker position={selectedLocation}>
          <Popup>
            You selected this location
          </Popup>
        </Marker>} */}
        {start && <Marker
          icon={
            makeIcon('grey')
          }
          position={[start.lat, start.lng]}>
          <Popup>
            Start
          </Popup>
        </Marker>}
        {end && <Marker
          icon={
            makeIcon('black')
          }
          position={[end.lat, end.lng]}>
          <Popup>
            End
          </Popup>
        </Marker>
        }

        {start && end && <Polyline pathOptions={{ color: 'black' }} positions={[start, end]} />}


        {airQualityData?.map((result, i) => (
          <Marker key={i} position={[result.coordinates.latitude, result.coordinates.longitude]} icon={
            makeIcon(getMarkerColor(result.measurements))
          }>
            <Popup>
              {result.location}: {result.measurements[0].value} {result.measurements[0].unit}
            </Popup>
          </Marker>
        ))}
        <div className="overlay" style={{ background: 'rgba(255, 255, 255, 0.5)', pointerEvents: 'none', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}></div>
      </MapContainer>

      <Modal
        title={<span>
          <Image src="/logo.png" width={120} height={40} />
        </span>}
        open={result !== null}
        cancelButtonProps={{ style: { display: 'none' } }}
        onOk={() => {
          setResult(null);
        }}
        onCancel={
          () => {
            setResult(null);
          }
        }

      >
        <Card
          title={<span className='success-text'>Journey complete</span>}>
          <p>
            Measurements taken: {airQualityData.length}<br />
          </p>
          <p>
            Start: {readableDateTime(result?.startTime)}<br />
            End: {readableDateTime(result?.endTime)}<br />
          </p>

          <p>
            <a href={result?.url} target="_blank">View Filecoin Trip record</a>
          </p>
        </Card>

      </Modal>
    </div>
  );
};

export default MapWithOverlay;
