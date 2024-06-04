import React from 'react';
import Head from 'next/head';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-900 shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">VisioAssist</h1>
        </div>
      </header>
      <main className="flex-grow px-4 py-6">
        <div className="h-full bg-gray-200 rounded-md">
          <p className="text-center py-8 text-black">Peta akan ditampilkan di sini</p>
        </div>
        {/* Your page content goes here */}
      </main>
    </div>
  );
};

export default HomePage;