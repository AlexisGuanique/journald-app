import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';


import { ImagesGallery } from '../components/ImagesGallery';
import { useForm } from '../../hooks/useForm';
import { setActiveNote } from '../../store/journal/journalSlice';
import { startDeletingNote, startSavingNote, startUploadingFiles } from '../../store/journal/thunks';


export const NoteView = () => {

    const dispatch = useDispatch();

    const { active: note, messageSaved, isSaving } = useSelector(state => state.journal)
    console.log([note.imageUrls])

    

    const { body, title, date, onInputChange, formState } = useForm(note)

    const dateString = useMemo(() => {
        const newDate = new Date(date);
        return newDate.toUTCString();
    }, [date]);


    useEffect(() => {
        dispatch( setActiveNote(formState) );
    }, [formState]);


    useEffect(() => {
        if ( messageSaved.length > 0) {

            Swal.fire('Nota actualizada', messageSaved, 'success' );
        
        }
    }, [ messageSaved ])
    

    const onSaveNote = () => {
        dispatch(startSavingNote())
    }

    const fileInputRef = useRef();

    const onFileInputChange = ({ target }) => {
        if ( target.files === 0 ) return;

        console.log('Subiendo archivos');

        dispatch( startUploadingFiles( target.files ));
    }

    const onDelete = () => {
        dispatch( startDeletingNote(  ));
    }


    // console.log(note.imageUrls)

    return (
        <Grid
            container
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            sx={{ mb: 1 }}
            className='animate__animated animate__fadeIn animate__faster'
        >

            <Grid item>
                <Typography fontSize={39} fontWeight='ligth'> {dateString} </Typography>
            </Grid>

            <Grid item>

                <input
                    type='file'
                    multiple
                    ref={ fileInputRef }
                    onChange={ onFileInputChange }
                    style={{ display: 'none' }}
                />
                
                <IconButton
                    color='primary'
                    disabled={ isSaving }
                    // De esta manera cuando hacemos click en otro aqui podemos desviar el click a otro lugar
                    onClick={ () => fileInputRef.current.click() }
                >
                    <UploadOutlined />                    
                </IconButton>

                <Button
                    disabled={ isSaving }
                    onClick={onSaveNote}
                    color='primary'
                    sx={{ padding: 2 }}
                >

                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar

                </Button>
            </Grid>

            <Grid container>

                <TextField
                    type='text'
                    variant='filled'
                    fullWidth
                    placeholder='Ingrese un titulo'
                    label='titulo'
                    sx={{ border: 'none', mb: 1 }}
                    name='title'
                    value={title}
                    onChange={onInputChange}
                />

                <TextField
                    type='text'
                    variant='filled'
                    fullWidth
                    multiline
                    placeholder='¿Que sucedió en el dia de hoy?'
                    minRows={5}
                    name='body'
                    value={body}
                    onChange={onInputChange}
                />
            </Grid>

            <Grid 
                container 
                justifyContent='end'
            >
                <Button
                    onClick={ onDelete }
                    sx={{ mt: 2 }}
                    color='error'
                >
                    <DeleteOutline />
                    Borrar
                </Button>
            </Grid>


            {/* Galeria de imagenes */}

            <ImagesGallery images={ note.imageUrls } />


        </Grid>
    )
}
