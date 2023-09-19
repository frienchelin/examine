import React, {useEffect, useRef, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import 'mapbox-gl/dist/mapbox-gl.css';

import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax


function App() {
    const mapRef = useRef<any>(null);
    const mapContainerRef = useRef<any>(null);

    const [pos, setPos] = useState({
        "lng": 127.06251859015828,
        "lat": 37.50829310675486,
        zoom: 12
    });

    useEffect(() => {
        if (mapRef.current) return;
        mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_PUBLIC_ACCESS_TOKEN!;
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current, // HTML element ID where the map will be displayed
            style: 'mapbox://styles/mapbox/streets-v12', // Map style
            center: [pos.lng, pos.lat], // Initial center coordinates (longitude, latitude)
            zoom: pos.zoom, // Initial zoom level
        });
        mapRef.current.on('move', () => {
            setPos({
                lng: mapRef.current?.getCenter()?.lng?.toFixed(4),
                lat: mapRef.current?.getCenter()?.lat?.toFixed(4),
                zoom: mapRef.current?.getZoom()?.zoom?.toFixed(2),
            })
        })

    }, [])
    console.log('mapRef.current.getCenter() : ', mapRef?.current?.getCenter());
    return (
        <div className="App" style={{
            width: '100vw',
            height: '100vh',
        }}>
            <h1>MapBox API</h1>
            <div style={{
                width: "100%",
                height: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <div ref={mapContainerRef} style={{
                    width: '450px', height: '700px',
                    maxWidth: '500px', maxHeight: '1200px'
                }} className="map-container"/>
            </div>
        </div>
    );
}

export default App;
