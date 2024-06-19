import { locations } from './url'

export const apiGetLocations = () => {
    return fetch(locations)
        .then((response) => {
            if(!response.ok){
                throw new Error('Network response was not ok');
            }
            return response.json()
        })
            .then((data) => {
                console.log('data location in api => ',data);
                return data;
            })
            .catch( error => {
                console.log('Error api location => ',error);
                throw error;
            })
}