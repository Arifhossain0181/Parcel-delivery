import React from 'react';
import { useQuery } from '@tanstack/react-query';
import  UseAuthhooks  from '../../../Hooks/UseAuthHooks';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
const MyParcel = () => {
    const {user} = UseAuthhooks()
    const axiossecure = UseAxiosSecure()
   const { data: Parcels = [] } = useQuery({
    queryKey: ['My-Parcel', user?.email],
    enabled: !!user?.email,   // only run if email exists
    queryFn: async () => {
        const res = await axiossecure.get(`Parcel?email=${user?.email}`);
        return res.data;
    }
});

console.log(Parcels);

return (
    <div>
        <h2>This is MyParcel page {Parcels.length}</h2>
    </div>
);

};

export default MyParcel;////
