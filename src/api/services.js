import {
    characters,
    locations,
    episodes,
} from './url'

export const apiGetCharacters = (pagesArg, findArg) => {
    //console.log('numero de pagina en api => ',pagesArg)
    console.log('data de busqueda en API=> ',findArg)
    const page = pagesArg == 1
    ? '' 
    : findArg.length > 0
        ? ''
        : `/?page=${pagesArg}`

    
    var findAll = ''
    var nameFind = ''
    var statusFind = '' 

    findArg.map((item) => {
        console.log('data en map ',item)

        if (item.type === 'name') {
            nameFind = `${item.type}=${item.value}`;
        }

        if (item.type === 'status') {
            statusFind = `${item.type}=${item.value}`;
        }

        return findAll = `?${nameFind}&${statusFind}`

    })

    console.log('qwerty qwerty => ', findAll)

    // for (let key in findArg){
    //     const findAll = ''
    //     const nameFind = ''
    //     const statusFind = '' 
    //     var obj = findArg[key]
    //     console.log('data por posicion => ',obj)

    //     if (obj.name == 'name') {
    //         nameFind = `${obj.name}=${obj.value}`

    //     }

    //     if (obj.name == 'status') {
    //         statusFind = `&${obj.name}=${obj.value}`
    //     }
        
    //     return findAll = nameFind+statusFind
    // }
    
    return fetch(`${characters}${page}${findAll}`)
        .then(response => response.json())
        .then(data => {
            //console.log('data en api => ',data)
            return data
        })
        .catch(error => console.error('Error:', error))
}

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

export const apiGetEpisodes = () => {}