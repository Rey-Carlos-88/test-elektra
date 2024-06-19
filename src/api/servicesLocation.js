import { locations } from './url'

export const apiGetLocations = (pagesArg, findArg) => {
    const page = `?page=${pagesArg}`
    console.log('array => ',findArg)

    var findAll = '';
    var nameFind = '';
    var typeFind = '';
    var dimensionFind = ''

    if ( findArg.length > 0 ) {
        findArg.map((item) => {
            if (item.type === 'name') {
                nameFind = `&${item.type}=${item.value}`;
            }
            if (item.type === 'type') {
                typeFind = `&${item.type}=${item.value}`;
            }
            if (item.type === 'dimension') {
                dimensionFind = `&${item.type}=${item.value}`;
            }
            return findAll = `${nameFind}${typeFind}${dimensionFind}`
        });

    }


    return fetch(`${locations}${page}${findAll}`)
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