import { characters } from './url'

export const apiGetCharacters = (pagesArg, findArg) => {
    const page = `/?page=${pagesArg}`
    var findAll = '';
    var nameFind = '';
    var statusFind = ''; 
    var speciesFind = '';
    var typeFind = '';
    var genderFind = ''

    if ( findArg.length > 0 ) {
        findArg.map((item) => {
            if (item.type === 'name') {
                nameFind = `&${item.type}=${item.value}`;
            }
            if (item.type === 'status') {
                statusFind = `&${item.type}=${item.value}`;
            }
            if (item.type === 'species') {
                statusFind = `&${item.type}=${item.value}`;
            }
            if (item.type === 'type') {
                typeFind = `&${item.type}=${item.value}`;
            }
            if (item.type === 'gender') {
                genderFind = `&${item.type}=${item.value}`;
            }
            return findAll = `${nameFind}${statusFind}${speciesFind}${typeFind}${genderFind}`
        });

    }

    return fetch(`${characters}${page}${findAll}`)
        .then(response => response.json())
        .then(data => {
            //console.log('data en api => ',data)
            return data
        })
        .catch( error => {
            console.log('Error api location => ',error);
            throw error;
        })
};

