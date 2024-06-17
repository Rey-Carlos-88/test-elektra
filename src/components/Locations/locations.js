import React, { useEffect, useState } from 'react';

import { apiGetLocations } from '../../api/services'

export const Locations = () => {

    const onGetLocations = async () => {
        try {
            const fetchLocations = await apiGetLocations();
            console.log('consumo desde api location => ',fetchLocations);

        } catch (error) {
            console.log('Error de servicon en compoente location=> ',error)
        }
    }


    useEffect(() => {
        onGetLocations()
    }, [])
    return (
        <>
            <h1>Locations</h1>
        </>
    )
}

export default Locations