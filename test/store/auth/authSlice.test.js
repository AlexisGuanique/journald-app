import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice"
import { authenticatedState, demoUser, initialState } from "../../fixtures/authFixtures";


describe('Pruebas en el authSlice', () => {


    test('Debe regresar el estado inicial y llamarse "auth"', () => {

        // Prueba del nombre
        expect(authSlice.name).toBe('auth');

        const state = authSlice.reducer(initialState, {});

        // Prueba del initialState
        expect(state).toEqual(initialState);

    })

    test('Debe de realizar la autenticación', () => {

        const state = authSlice.reducer(initialState, login(demoUser));

        // console.log( state );
        expect(state).toEqual({
            status: 'authenticated',
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null,
        })


    });

    test('Debe de realizar el logout sin argumentos', () => {

        const state = authSlice.reducer(authenticatedState, logout());
        expect(state).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined,
        })
    })

    test('Debe de realizar el logout con argumentos', () => {

        const errorMessage = 'Credenciales no son correctas';

        const state = authSlice.reducer(authenticatedState, logout({ errorMessage }));
        expect(state).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: errorMessage,
        })
    })

    test('Dede de cambiar el estado a checking', () => {

        const state = authSlice.reducer(authenticatedState, checkingCredentials());

        // Solo debemos testear el estatus, el estado puede ser cualquiera
        expect( state.status ).toBe('checking');
    })
})