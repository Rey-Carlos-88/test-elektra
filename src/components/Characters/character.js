import React, { useEffect, useState } from 'react';

//------------------- Table component ----------------
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

//------------------- Select component ---------------
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import Button from '@mui/material/Button';

import { apiGetCharacters } from '../../api/services'

import { useParams } from 'react-router-dom';


export const Characters = () => {
    let { params } = useParams();
    //console.log('dasdasd => ',params)

    const [page, setPage] = useState(1)
    const [finalPage, setFinalPage] = useState()
    const [characterData, setCharacterData] = useState([]);

    const [nameCharacter, setNameCharacter] = useState('')
    const [statusCharacter, setStatusCharacter] = useState('');
    const [speciesCharacter, setSpeciesCharacter] = useState('');
    const [typeCharacter, setTypeCharacter] = useState('');
    const [generCharacter, setGenderCharacter] = useState('');

    const [findCharacter, setFindCharacter] = useState([]);



    const columnsCharacters = [
        {
            id: 'image',
            label: 'picture',
            minWidth: 130,
            aling: 'right',
            format: image => <img src=''/>
        },
        {
            id: 'name',
            label: 'Name',
            minWidth: 100,
            aling: 'right',

        },
        {
            id: 'status',
            label: 'Status',
            minWidth: 90,
            aling: 'right',

        },
        {
            id: 'species',
            label: 'Species',
            minWidth: 90,
            aling: 'right',
        },
        {
            id: 'type',
            label: 'Type',
            minWidth: 100,
            aling: 'right',
        },
        {
            id: 'gender',
            label: 'Gender',
            minWidth: 90,
            aling: 'right',
        },
        
    ]

    const onGetCharacter = async ( 
        pagesArg = page, 
        findArg = findCharacter, 
    ) => {
        try {
            const fetchCharacter = await apiGetCharacters(pagesArg, findArg);
            console.log('consumo de api => ',fetchCharacter);
            setCharacterData(fetchCharacter.results);
            setFinalPage(fetchCharacter.info.pages)
        } catch (error) {
            console.log('Error de servicon en compoente => ',error)
        }
    }

    const createData = (image, name, status, species, type, gender) => {
        return{
            image,
            name,
            status,
            species,
            type,
            gender,  
        }
    }

    const rows = characterData.map(item => 
        createData(item.image, item.name, item.status, item.species, item.type, item.gender, item.id)
    )


    useEffect(() => {
        onGetCharacter()
    }, [])

    
    const handleChangeStatus = (event) => {
        console.log('data select => ',event.target.value)
        setStatusCharacter(event.target.value);
    };

    const nextPage = () => {
        const valuePage = page+1
        setPage(valuePage)
        console.log('pagina sigiente => ',valuePage)
        onGetCharacter(valuePage)
    }

    const previePage = () => {
        const valuePage = page-1
        setPage(valuePage)
        console.log('pagina sigiente => ',valuePage)
        onGetCharacter(valuePage)  
    }

    const searchCharacter = () => {
        console.log('funcion para concatenar datos de  busqueda')
        console.log('data maneCharacter => ',nameCharacter)
        console.log('data maneCharacter => ',statusCharacter)

        var dataFilter = []

        if (nameCharacter !== '') {
            console.log('guadar data y concatenar nameCharacter')
            var nameData = {type:'name', value: nameCharacter}
            dataFilter.push(nameData)
        }

        if (statusCharacter !== '') {
            console.log('guadar data y concatenar statusCharacter')
            var statusData = {}
            if ( statusCharacter == 1 ) {
                statusData = {
                    type: 'status',
                    value: 'alive'
                }

            } else if ( statusCharacter == 2 ) {
                statusData = {
                    type: 'status',
                    value: 'dead'
                }
            } else if ( statusCharacter == 3 ) {
                statusData = {
                    type: 'status',
                    value: 'unknown'
                }
            }
            dataFilter.push(statusData)

        }

        if (dataFilter.length > 0) {
            console.log('realizar busqueda array con data => ',dataFilter)
            onGetCharacter(page, dataFilter)
            setFindCharacter(dataFilter)

        } else {
            console.log('no se han ingresado datos de busqueda => ',dataFilter)
            alert('Ingresa datos para realizar busqueda de personaje')
        }


        console.log('data de busqueda => ',dataFilter)


    }

    const clearSearchCharacter = () => {

        setNameCharacter('')
        setStatusCharacter('')
        setFindCharacter([])
        setPage(1)
        onGetCharacter(1, [] )
    }


    //console.log('valor de next page => ',page)
    //console.log('total pages api => ',finalPage)

    console.log('data para realizar busqueda => ',findCharacter)



    return (
        <>
            <div className='content-all-characters'>
                <h1 className='table-title'>Characters</h1>
                <div className='conten-filter'>
                    <div className='filter-name'>
                        <input 
                            type='text'
                            value={nameCharacter}
                            onChange={(e) => {
                                console.log('click en input name',e.target.value)
                                setNameCharacter(e.target.value)
                            }}
                        />
                    </div>

                    <div className='filter-status'>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-standard-label">
                                Status
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={statusCharacter}
                                onChange={(event) => {
                                    handleChangeStatus(event)
                                }}
                                label="status"
                            >
                                <MenuItem value={1}>Alive</MenuItem>
                                <MenuItem value={2}>Dead</MenuItem>
                                <MenuItem value={3}>Unknown</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <div className='filter-species'>
                        <input 
                            type='text'
                            value={speciesCharacter}
                            onChange={(e) => {
                                console.log('click en input SpeciesCharacter',e.target.value)
                                setSpeciesCharacter(e.target.value)
                            }}
                        />

                    </div>

                    <div className='filter-type'>
                        <input 
                            type='text'
                            value={typeCharacter}
                            onChange={(e) => {
                                console.log('click en input TypeCharacter',e.target.value)
                                setTypeCharacter(e.target.value)
                            }}
                        />

                    </div>


                    <div className='filter-button'>
                        <button 
                            disabled={''}
                            onClick={() => {
                                console.log('realizar busqueda')
                                searchCharacter();
                            }}
                        >
                            search character
                        </button>
                    </div>

                    <div className='clear-button'>
                        <button 
                            disabled={''}
                            onClick={() => {
                                console.log('limpiar datos de busqueda')
                                clearSearchCharacter();
                            }}
                        >
                            Clear Data
                        </button>
                    </div>
                </div>

                <div className='content-pagination'>
                    <div className='pagination-text'>
                        <p>Pages: {page} de: {finalPage}</p>
                    </div>
                    <div className='content-pagination-buttons'>
                       <div className='pagination-button-previe'>
                            <Button type='button-next'
                                onClick={() => {
                                    previePage();
                                }}
                                disabled={page == 1}
                            >
                                {'<'}
                            </Button>
                        </div>
                        <div className='pagination-button-next'>
                            <Button
                                onClick={() => {
                                    nextPage();
                                }}
                                disabled={page == finalPage}
                            >
                                {'>'}
                            </Button>
                        </div> 
                    </div>
                    
                
                </div>

                <div className='table-characters'>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {columnsCharacters.map((column) => {
                                        return (
                                        <TableCell 
                                            key={column.id}
                                            aling={column.aling}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                        )  
                                    })}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows
                                    // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    // .slice(20)
                                    .map(row => {
                                        return(
                                            <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
                                                {columnsCharacters.map(colum => {
                                                    const value = row[colum.id]
                                                    return (
                                                        <TableCell key={colum.id} aling={colum.aling}>
                                                            {colum.format
                                                                ? <a href='#'>
                                                                    <img className='character-imagen' src={`${value}`}/>
                                                                </a>
                                                                : value}
                                                        </TableCell>
                                                    )
                                                })}

                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </>
    )
}

export default Characters