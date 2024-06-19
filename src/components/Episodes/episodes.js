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

import Button from '@mui/material/Button';

import { apiGetEpisodes } from '../../api/servicesEpisode'

export const Episodes = () => {

    const [loadingPage, setLoadingPage] = useState(true)

    // estaos que gurdar la paginacion de la tabla
    const [page, setPage] = useState(1)
    const [finalPage, setFinalPage] = useState()
    // estado donde se guarda y se cargan los datos del tablero 
    const [episodesData, setEpisodesData] = useState([])

    // estado que guarda el total de resultados de la busqueda
    const [allResults, setAllResults] = useState('');

    // estados que gurdar los parametros de busqueda 
    const [nameEpisodes, setNameEpisodes] = useState('');
    const [episode, setEpisodes] = useState('');

    // estado que guarda los datos de busqueda 
    const [findEpisodes, setFindEpisodes] = useState([]);

    const columnsEpisodes = [
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
            id: 'air_date',
            label: 'Air Date',
            minWidth: 100,
            aling: 'right',
        },
        {
            id: 'episode',
            label: 'Episode',
            minWidth: 80,
            aling: 'right',
        },
        
    ];

    const onGetEpisodes = async (
        pagesArg = page, 
        findArg = findEpisodes, 
    ) => {
        try {
            const fetchEpisodes = await apiGetEpisodes(pagesArg, findArg);
            console.log('consumo desde api Episodes => ',fetchEpisodes);
            setEpisodesData(fetchEpisodes.results);
            setAllResults(fetchEpisodes.info.count);
            setFinalPage(fetchEpisodes.info.pages);
            setLoadingPage(false);

        } catch (error) {
            console.log('Error de servicon en compoente location=> ',error)
        }
    }

    // funcion para crear encabezado del tablero 
    const createData = (id, name, air_date, episode) => {
        return{
            id,
            name,
            air_date,
            episode
        }
    }
    
    // funcion que crea los datos para el tablero
    const rows = episodesData.map(item => 
        createData(item.id, item.name, item.air_date, item.episode)
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
        onGetEpisodes();
    }, [])

    // funcion para avanzar a la siguiente pagina del tablero 
    const nextPage = () => {
        const valuePage = page+1
        setPage(valuePage)
        onGetEpisodes(valuePage)
    }

    // funcion para regresa a la pagina anteriro del tablero
    const previePage = () => {
        const valuePage = page-1
        setPage(valuePage)
        onGetEpisodes(valuePage)  
    }


    const onSearchEpisodes = () => {

        var dataFilter = []

        if (nameEpisodes !== '') {
            var nameData = {
                    type:'name', 
                    value: nameEpisodes
                }
            dataFilter.push(nameData)
        }

        if (episode !== '') {
            var episode = {
                    type:'type', 
                    value: episode
                }
            dataFilter.push(episode)
        }

        if (dataFilter.length > 0) {
            onGetEpisodes(1, dataFilter);
            setFindEpisodes(dataFilter);
        }

    }

    const onClearSearchEpisodes = () => {
        setLoadingPage(true)
        setNameEpisodes('');
        setEpisodes('');;
        setFindEpisodes([]);
        setPage(1);
        onGetEpisodes(1, [] );
    }


    return (
        <>
            <div className='content-all-characters'>
                <h1>Episodes</h1>
                <div className='conten-filter'>
                    <div className='filter-name'>
                        <input 
                            type='text'
                            value={nameEpisodes}
                            placeholder='Name:'
                            onChange={(e) => {
                                setNameEpisodes(e.target.value)
                            }}
                        />
                    </div>

                    <div className='filter-type'>
                        <input 
                            type='text'
                            value={episode}
                            placeholder='Episode:'
                            onChange={(e) => {
                                setEpisodes(e.target.value)
                            }}
                        />
                    </div> 

                    <div className='content-filter-buttons'>
                        <div className='filter-button'>
                            <Button 
                                disabled={''}
                                onClick={() => {
                                    setLoadingPage(true)
                                    onSearchEpisodes();
                                }}
                            >
                                search
                            </Button>
                        </div>
                      
                        <div className='clear-button'>
                            <Button 
                                disabled={findEpisodes.length == 0}
                                onClick={() => {
                                    onClearSearchEpisodes();
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
                                            {columnsEpisodes.map((column) => {
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
                                                        {columnsEpisodes.map(colum => {
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

export default Episodes