import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from '../../../src/firebase/providers';
import { checkingCredentials, login, logout } from '../../../src/store/auth/authSlice';
import { checkingAuthentication, startCreatingUserWithEmailPassword, startGoogleSingIn, startLoginWithEmailPassword, startLogout } from '../../../src/store/auth/thunks'
import { clearNoteLogout } from '../../../src/store/journal/journalSlice';
import { demoUser } from '../../fixtures/authFixtures';


jest.mock('../../../src/firebase/providers')


describe('Pruebas en el AuthThunks', () => {

    const dispatch = jest.fn();

    beforeEach( () => jest.clearAllMocks() );

    test('Debe de invocar el checkingCredentials', async() => {
        
        await checkingAuthentication()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );

    })

    test('startGoogleSingIn Debe de llamar checkingCredentials y login', async() => {

        const loginData = { ok: true, ...demoUser};
        await signInWithGoogle.mockResolvedValue( loginData );

        // thunk
        await startGoogleSingIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );

    })

    test('startGoogleSingIn Debe de llamar checkingCredentials y logout - error', async() => {

        const loginData = { ok: false, errorMessage: 'Un error en Google'};
        await signInWithGoogle.mockResolvedValue( loginData );

        // thunk
        await startGoogleSingIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData.errorMessage ) );

    })

    test('startLoginWithEmailPassword debe de llamar checkingCredentials y login - exito', async() => {

        const loginData = { ok: true, ...demoUser };
        const formData = { email: demoUser.email, password: '123ABC' };

        await loginWithEmailPassword.mockResolvedValue( loginData );

        // thunk
        await startLoginWithEmailPassword( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ));

    })

    test('startLogout debe de llamar logoutFirebase, clearNotes y logout', async() => {

        await startLogout()( dispatch );

        expect( logoutFirebase ).toHaveBeenCalled();
        expect( dispatch ).toHaveBeenCalledWith( clearNoteLogout() );
        expect( dispatch ).toHaveBeenCalledWith( logout({}) );

    })


    test('startCreatingUserWithEmailPassword debe de llamar checkingCredentials', async() => {

        const loginData = { ok: true, ...demoUser };
        const formData = { email: demoUser.email, password: '123ABC', displayName: demoUser.displayName };

        await registerUserWithEmailPassword.mockResolvedValue( formData );


        await startCreatingUserWithEmailPassword({uid: demoUser.uid, displayName: demoUser.displayName, email: demoUser.email, photoURL: demoUser.photoURL })( dispatch )

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );

    })
})