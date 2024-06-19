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

import { TextField } from '@material-ui/core/';

import Button from '@mui/material/Button';

import { apiGetLocations } from '../../api/servicesLocation'

export const Locations = () => {

    const [loadingPage, setLoadingPage] = useState(true)

    // estaos que gurdar la paginacion de la tabla
    const [page, setPage] = useState(1)
    const [finalPage, setFinalPage] = useState()
    // estado donde se guarda y se cargan los datos del tablero 
    const [locationData, setLocationData] = useState([])

    // estado que guarda el total de resultados de la busqueda
    const [allResults, setAllResults] = useState('');

    // estados que gurdar los parametros de busqueda 
    const [nameLocation, setNameLocation] = useState('');
    const [typeLocation, setTypeLocation] = useState('');
    const [dimensionLocation, setDimensionLocation] = useState('');

    // estado que guarda los datos de busqueda 
    const [findLocation, setFindLocation] = useState([]);

    const columnsLocation = [
        {
            id: 'id',
            label: 'ID',
            minWidth: 50,
            aling: 'right',

        },
        {
            id: 'name',
            label: 'Name',
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
            id: 'dimension',
            label: 'Dimension',
            minWidth: 80,
            aling: 'right',
        },
        
    ];

    const onGetLocations = async (
        pagesArg = page, 
        findArg = findLocation, 
    ) => {
        try {
            const fetchLocations = await apiGetLocations(pagesArg, findArg);
            console.log('consumo desde api location => ',fetchLocations);
            setLocationData(fetchLocations.results);
            setAllResults(fetchLocations.info.count);
            setFinalPage(fetchLocations.info.pages);
            setLoadingPage(false);

        } catch (error) {
            console.log('Error de servicon en compoente location=> ',error)
        }
    }

    // funcion para crear encabezado del tablero 
    const createData = (id, name, type, dimension) => {
        return{
            id,
            name,
            type,
            dimension,  
        }
    }
    
    // funcion que crea los datos para el tablero
    const rows = locationData.map(item => 
        createData(item.id, item.name, item.type, item.dimension)
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
        setLoadingPage(true)
        onGetLocations()
    }, [])

    // funcion para avanzar a la siguiente pagina del tablero 
    const nextPage = () => {
        const valuePage = page+1
        setPage(valuePage)
        onGetLocations(valuePage)
    }

    // funcion para regresa a la pagina anteriro del tablero
    const previePage = () => {
        const valuePage = page-1
        setPage(valuePage)
        onGetLocations(valuePage)  
    }

    // funcion para realizar la busqueda y actulizar los datos del tablero 
    const onSearchLocation = () => {
        var dataFilter = []

        if (nameLocation !== '') {
            var nameData = {
                    type:'name', 
                    value: nameLocation
                }
            dataFilter.push(nameData)
        }

        if (typeLocation !== '') {
            var typeData = {
                    type:'type', 
                    value: typeLocation
                }
            dataFilter.push(typeData)
        }

        if (dimensionLocation !== '') {
            var dimensionData = {
                    type:'dimension', 
                    value: dimensionLocation
                }
            dataFilter.push(dimensionData)
        }
        

        if (dataFilter.length > 0) {
            onGetLocations(1, dataFilter);
            setFindLocation(dataFilter);

        }
    };

    // funcion que limpia los datos de la busqueda a su valores iniciales y limpia 
    // los estados de los campos de busqueda 
    const onClearSearchLocation = () => {
        setLoadingPage(true)
        setNameLocation('');
        setTypeLocation('');
        setDimensionLocation('');
        setFindLocation([]);
        setPage(1);
        onGetLocations(1, [] );
    };

    return (
        <>
            <div className='content-all-characters'>
                <div className='content-title-id'>
                    <h1>Locations</h1>
                </div>

                <div className='conten-filter'>
                    <div className='filter-name'>
                        <input 
                            type='text'
                            value={nameLocation}
                            placeholder='Name:'
                            onChange={(e) => {
                                setNameLocation(e.target.value)
                            }}
                        />
                    </div>

                    <div className='filter-type'>
                        <input 
                            type='text'
                            value={typeLocation}
                            placeholder='Type:'
                            onChange={(e) => {
                                setTypeLocation(e.target.value)
                            }}
                        />

                    </div>

                    <div className='filter-type'>
                        <input 
                            type='text'
                            value={dimensionLocation}
                            placeholder='Dimension:'
                            onChange={(e) => {
                                setDimensionLocation(e.target.value)
                            }}
                        />
                    </div> 

                    <div className='content-filter-buttons'>
                        <div className='filter-button'>
                            <Button 
                                disabled={''}
                                onClick={() => {
                                    setLoadingPage(true)
                                    onSearchLocation();
                                }}
                            >
                                search
                            </Button>
                        </div>
                      
                        <div className='clear-button'>
                            <Button 
                                disabled={findLocation.length == 0}
                                onClick={() => {
                                    onClearSearchLocation();
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
                                            {columnsLocation.map((column) => {
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
                                        {rows.map(row => {
                                                return(
                                                    <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
                                                        {columnsLocation.map(colum => {
                                                            const value = row[colum.id]
                                                            return (
                                                                <TableCell key={colum.id} aling={colum.aling}>
                                                                    {value}
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

export default Locations