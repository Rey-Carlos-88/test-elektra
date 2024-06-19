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

export const Characters = () => {

    const [loadingPage, setLoadingPage] = useState(true)

    // estaos que gurdar la paginacion de la tabla
    const [page, setPage] = useState(1)
    const [finalPage, setFinalPage] = useState()
    // estado donde se guarda y se cargan los datos del tablero 
    const [characterData, setCharacterData] = useState([]);
    // estado que guarda el total de resultados de la busqueda
    const [allResults, setAllResults] = useState('');

    // estados que gurdar los parametros de busqueda 
    const [nameCharacter, setNameCharacter] = useState('')
    const [statusCharacter, setStatusCharacter] = useState('');
    const [speciesCharacter, setSpeciesCharacter] = useState('');
    const [typeCharacter, setTypeCharacter] = useState('');
    const [genderCharacter, setGenderCharacter] = useState('');

    // estado que guarda los datos de busqueda 
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
            minWidth: 80,
            aling: 'right',

        },
        {
            id: 'species',
            label: 'Species',
            minWidth: 80,
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
            minWidth: 80,
            aling: 'right',
        },
        
    ]

    //funciopn que manda a llamar el servicio para cargar datos del tablero
    const onGetCharacter = async ( 
        pagesArg = page, 
        findArg = findCharacter, 
    ) => {
        try {
            const fetchCharacter = await apiGetCharacters(pagesArg, findArg);
            setCharacterData(fetchCharacter.results);
            setAllResults(fetchCharacter.info.count);
            setFinalPage(fetchCharacter.info.pages);
            setLoadingPage(false);
        } catch (error) {
            throw error
        }  
    }

    // funcion para crear encabezado del tablero 
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

    // funcion que crea los datos para el tablero
    const rows = characterData.map(item => 
        createData(item.image, item.name, item.status, item.species, item.type, item.gender, item.id)
    )

    const onLoadingPage = () => {
        return (
            <div id="contenedor">
                <div class="contenedor-loader">
                    <div class="loader"></div>
                </div>
                <div class="cargando">Cargando...</div>
            </div>
        )
    }

    useEffect(() => {
        onGetCharacter();
        setLoadingPage(true)
    }, [])

    
    const handleChangeStatus = (event) => {
        setStatusCharacter(event.target.value);
    };

    const handleChangeGender = (event) => {
        setGenderCharacter(event.target.value);
    };

    // funcion para avanzar a la siguiente pagina del tablero 
    const nextPage = () => {
        const valuePage = page+1
        setPage(valuePage)
        onGetCharacter(valuePage)
    }

    // funcion para regresa a la pagina anteriro del tablero
    const previePage = () => {
        const valuePage = page-1
        setPage(valuePage)
        onGetCharacter(valuePage)  
    }

    // funcion para realizar la busqueda y actulizar los datos del tablero 
    const searchCharacter = () => {
        var dataFilter = []

        if (nameCharacter !== '') {
            var nameData = {
                    type:'name', 
                    value: nameCharacter
                }
            dataFilter.push(nameData)
        }

        if (statusCharacter !== '') {
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

        if (speciesCharacter !== '') {
            var nameSpecie = {
                    type:'species', 
                    value: speciesCharacter
                }
            dataFilter.push(nameSpecie)
        }

        if (typeCharacter !== '') {
            var nameSpecie = {
                    type:'type', 
                    value: typeCharacter
                }
            dataFilter.push(nameSpecie)
        }


        if (genderCharacter !== '') {
            var genderData = {}
            if ( genderCharacter == 1 ) {
                genderData = {
                    type: 'gender',
                    value: 'female'
                }
            }   else if ( genderCharacter == 2 ) {
                genderData = {
                    type: 'gender',
                    value: 'male'
                }
            }   else if (genderCharacter == 3) {
                genderData = {
                    type: 'gender',
                    value: 'genderless'
                }
            }   else if ( genderCharacter == 4 ) {
                genderData = {
                    type: 'gender',
                    value: 'unknown'
                }
            }
            dataFilter.push(genderData)
        }

        if (dataFilter.length > 0) {
            onGetCharacter(1, dataFilter);
            setFindCharacter(dataFilter);

        } else {
            alert('Enter data to perform a search')
        }
    }

    // funcion que limpia los datos de la busqueda a su valores iniciales y limpia 
    // los estados de los campos de busqueda 
    const clearSearchCharacter = () => {
        setLoadingPage(true)
        setNameCharacter('');
        setStatusCharacter('');
        setSpeciesCharacter('');
        setTypeCharacter('');
        setGenderCharacter();
        setFindCharacter([]);
        setPage(1);
        onGetCharacter(1, [] );
    }

    return (
        <>
            <div className='content-all-characters'>
                <h1 className='table-title'>Characters</h1>
                
                <div className='conten-filter'>
                    <div className='filter-name'>
                        <input 
                            type='text'
                            value={nameCharacter}
                            placeholder='Name:'
                            onChange={(e) => {
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
                            placeholder='Species: '
                            onChange={(e) => {
                                setSpeciesCharacter(e.target.value)
                            }}
                        />

                    </div>

                    <div className='filter-type'>
                        <input 
                            type='text'
                            value={typeCharacter}
                            placeholder='Type:'
                            onChange={(e) => {
                                setTypeCharacter(e.target.value)
                            }}
                        />

                    </div>

                    <div className='filter-gender'>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-standard-label">
                                Gender
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={genderCharacter}
                                onChange={(event) => {
                                    handleChangeGender(event)
                                }}
                                label="status"
                            >
                                <MenuItem value={1}>Female</MenuItem>
                                <MenuItem value={2}>Male</MenuItem>
                                <MenuItem value={3}>Genderless</MenuItem>
                                <MenuItem value={4}>Unknown</MenuItem>
                            </Select>
                        </FormControl>
                    </div>


                    <div className='content-filter-buttons'>
                        <div className='filter-button'>
                            <Button 
                                disabled={''}
                                onClick={() => {
                                    setLoadingPage(true)
                                    searchCharacter();
                                }}
                            >
                                search
                            </Button>
                        </div>
                      
                        <div className='clear-button'>
                            <Button 
                                disabled={''}
                                onClick={() => {
                                    clearSearchCharacter();
                                }}
                            >
                                Clear
                            </Button>
                        </div>
                    </div>

                </div>

                {loadingPage ? (
                    onLoadingPage()
                ) : (
                    <>
                        <div className='content-pagination'>
                            <div className='pagination-text'>
                                <p>Total Results : {allResults}</p>
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
                                        <strong>{'<'}</strong>
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
                    </>
                )}
            </div>
        </>
    )
}

export default Characters