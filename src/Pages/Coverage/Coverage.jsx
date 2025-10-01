import React from "react";
import BangladeshMap from "./BangladeshMap";
import {useLoaderData} from 'react-router'
const Coverage = () => {
  const service = useLoaderData()
  console.log(service)
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-4">
        We are available in 64 Districts
      </h1>

      

      {/* Map */}
      <BangladeshMap service={service} />
    </div>
  );
};

export default Coverage;
