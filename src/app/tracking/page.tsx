"use client";
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { GoogleMap, useLoadScript, Marker, useJsApiLoader } from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100%',
  height: '80vh',
};
const defaultCenter = {
  lat: -6.894723,  // default latitude
  lng: 107.614916,// default longitude
};
type ModalProps = {
  message: string;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Error</h2>
        <p>{message}</p>
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
          Close
        </button>
      </div>
    </div>
  );
};

const HomePage = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAYk9tiWwajvCMeYVnUgg4VZjfMH9SZl7o',
  });

  const [center, setCenter] = useState(defaultCenter);
  const [zoom, setZoom] = useState(15); 
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.thingspeak.com/channels/2572518/feeds.json?api_key=PCVST0MYRDOTZC2P&results=1');
        const data = await response.json();
        const latitude = parseFloat(data.feeds[0].field2);
        const longitude = parseFloat(data.feeds[0].field3);

        if (!Number.isNaN(latitude) && !Number.isNaN(longitude)) {
          setCenter({ lat: latitude, lng: longitude });
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setModalMessage('Error fetching data');
        setShowModal(true);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (loadError) {
      setModalMessage('Error loading maps');
      setShowModal(true);
    }
  }, [loadError]);

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading maps...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <Head>
        <title>VisioAssist</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="bg-blue-900 shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">VisioAssist</h1>
        </div>
      </header>
      <main className="flex-grow px-4 py-6">
        <div className="h-full w-full">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={zoom}
            center={center}
          >
            <Marker position={center} />
          </GoogleMap>
        </div>
      </main>
      {showModal && (
        <Modal
          message={modalMessage}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default HomePage;
