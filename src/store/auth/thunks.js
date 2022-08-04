import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers";
import { clearNoteLogout } from "../journal/journalSlice";
import { checkingCredentials, login, logout } from "./authSlice"


export const checkingAuthentication = ( email, password ) => {
    return async( dispatch ) => {
        dispatch( checkingCredentials());
    }
};


// De esta manera creamos un usuario con google
export const startGoogleSingIn = () => {

    return async( dispatch ) => {

        dispatch( checkingCredentials() );
        
        const result = await signInWithGoogle();

        if (!result.ok) return dispatch( logout( result.errorMessage ) );
        
        dispatch( login( result ) );
    }
};

// De esta manera creamos un usuario con email y password

export const startCreatingUserWithEmailPassword = ( { email, password, displayName }) => {

    return async( dispatch ) => {

        dispatch( checkingCredentials() );

        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword( { email, password, displayName} )
        
        // console.log( resp );
        
        if (!ok) return dispatch( logout({ errorMessage }));

        dispatch( login({uid, displayName, email, photoURL }))

    }
};

// TAREA
export const startLoginWithEmailPassword = ({ email, password }) => {
    return async( dispatch ) => {

        dispatch( checkingCredentials());

        const result = await loginWithEmailPassword({ email, password })
        // console.log( result )

        if ( !result.ok ) return dispatch( logout( result ));

        dispatch( login( result ));


    }
}

export const startLogout = () => {

    return async( dispatch ) => {

        await logoutFirebase();
        dispatch( clearNoteLogout() );
        dispatch( logout({}) );
    }
}