import React from 'react';
import Image from 'next/image';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url('/bg-blue.png')` }}>
      <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-8 opacity-100">
        <h2 className="text-2xl font-bold text-center text-black">Login</h2>
        <form className="mt-4">
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">Username</label>
            <input type="email" id="username" name="username" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" placeholder="Masukkan username anda" />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input type="password" id="password" name="password" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" placeholder="Masukkan password anda" />
          </div>
          <button type="submit" className="w-full px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-200">Login</button>
        </form>
        <div className="mt-4 text-center text-black">
          <p>Belum punya akun? <a href="/register" className="text-blue-500">Register</a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;