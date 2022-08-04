import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { FirebaseAuth } from './config';


const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {

    try {

        const result = await signInWithPopup(FirebaseAuth, googleProvider);

        // De esta manera podemos obtener las credenciales
        // const credentials = GoogleAuthProvider.credentialFromResult( result );

        const { displayName, email, photoURL, uid } = result.user;

        return {
            ok: true,
            displayName, email, photoURL, uid
        }


    } catch (error) {

        // const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            errorMessage,
        }

    }
}


export const registerUserWithEmailPassword = async ({ email, password, displayName }) => {

    try {
        console.log({ email, password, displayName });
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);

        const { uid, photoURL } = resp.user;

        console.log(resp);
         
        // TAREA: actualizar el displayName en firebase
        /////////////////////////////////////////////////////////
        await updateProfile( FirebaseAuth.currentUser, { displayName } );
        /////////////////////////////////////////////////////////

        return {
            ok: true,
            uid,
            photoURL,
            email, displayName,

        }

    } catch (error) {

        return { ok: false, errorMessage: error.message }

    }
}

// TAREA
export const loginWithEmailPassword = async({ email, password }) => {


    try {

        const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, photoURL, displayName } = resp.user;

        return {
            ok: true,
            uid, 
            photoURL, 
            displayName,
        }

    } catch (error) {

        return { ok: false, errorMessage: error.message }

    }


    // signInWithEmailAndPassword

}


export const logoutFirebase = async() => {

    return await FirebaseAuth.signOut();
}