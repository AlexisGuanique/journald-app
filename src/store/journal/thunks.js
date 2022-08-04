import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite'
import { FirebaseDB } from '../../firebase/config';
import { fileUpload } from '../../helpers/fileUpload';
import { loadNotes } from '../../helpers/loadNotes';
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotoToActiveNote, setSaving, updateNote } from './journalSlice';

export const startNewNote = () => {

    return async( dispatch, getState ) => {
        
        dispatch( savingNewNote() );
        //Necesito el uid para crear la nota
        // Lo puedo extraer del getState

        const { uid } = getState().auth;
        

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notas`));

        await setDoc( newDoc, newNote );

        // console.log({ newDoc, setDocResp });

        newNote.id = newDoc.id;

        dispatch( addNewEmptyNote( newNote ));
        dispatch( setActiveNote( newNote ));
    }
}



export const startLoadingNotes = () => {
    return async( dispatch, getState ) => {
        const { uid } = getState().auth;
        if( !uid ) throw new Error('El UID del usuario no existe');

        const notes = await loadNotes( uid );
        
        dispatch( setNotes( notes ) );

    }
}

export const startSavingNote = () => {
    return async( dispatch, getState ) => {

        dispatch( setSaving() );


        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const noteToFirestore = { ...note };

        delete noteToFirestore.id;

        console.log(noteToFirestore);

        const docRef = doc( FirebaseDB, `${ uid }/journal/notas/${ note.id }`)

        await setDoc( docRef, noteToFirestore, { merge: true })

        dispatch( updateNote( note ) )


    }
}

export const startUploadingFiles = ( files = []) => {
    return async( dispatch, getState ) => {

        dispatch( setSaving() );

        // await fileUpload( files[0]);

        // console.log( files );

        // Vamos a crear la secuencia de las promesas
        const fileUploadPromise = [];

        for ( const file of files ) {
            
            fileUploadPromise.push( fileUpload( file ));

        }

        const photoUrls = await Promise.all( fileUploadPromise );

        dispatch( setPhotoToActiveNote( photoUrls ));

        // console.log( photoUrls );
    }
}


export const startDeletingNote = () => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;
        const { active: note } = getState().journal;


        // console.log( { uid, note });

        const docRef = doc( FirebaseDB, `${ uid }/journal/notas/${ note.id }`);

        await deleteDoc( docRef );

        dispatch( deleteNoteById( note.id ));
    }
}
