import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

const Forbidden = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-100 via-white to-red-200 text-gray-800">
      <div className="bg-white shadow-2xl rounded-2xl p-10 flex flex-col items-center text-center max-w-md">
        
        <ShieldAlert className="text-red-500 w-20 h-20 mb-4 animate-bounce" />

        <h1 className="text-5xl font-extrabold text-red-600 mb-2">403</h1>
        <h2 className="text-2xl font-semibold mb-3">Access Forbidden</h2>

        <p className="text-gray-600 mb-6">
          Sorry! You don’t have permission to access this page.  
          Please check your role or contact support if you think this is a mistake.
        </p>

        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-all duration-200 shadow-md"
        >
          🔙 Go Back Home
        </button>
      </div>

      <p className="mt-8 text-sm text-gray-500">
        Parcel Delivery System © {new Date().getFullYear()}
      </p>
    </div>
  );
};

export default Forbidden;
