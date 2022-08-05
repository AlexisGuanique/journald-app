import { fireEvent, render, screen } from "@testing-library/react"
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { MemoryRouter } from 'react-router-dom'

import { LoginPage } from "../../../src/auth/pages/LoginPage"
import { authSlice } from "../../../src/store/auth/authSlice"
import { notAuthenticatedState } from "../../fixtures/authFixtures"



const mockStartGoogleSingIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();

jest.mock('../../../src/store/auth/thunks', () => ({
    startGoogleSingIn: () => mockStartGoogleSingIn,

    startLoginWithEmailPassword: ({ email, password }) => {
        return () => mockStartLoginWithEmailPassword({ email, password })
    },

}));


// Con esto sobreescribimos el funcionamiento del useDispatch y nos sirve para cualquier cosa que queramos simular
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => (fn) => fn(),
}))




const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
    },

    preloadedState: {
        auth: notAuthenticatedState,
    },
})



describe('Pruebas en el <LoginPage />', () => {

    beforeEach( () => jest.clearAllMocks() );

    test('Debe de mostrarse el componente correctamente', () => {

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        )

        // Para mostrar en consola el componente

        // screen.debug();

        // Evaluamos que la palabra Login aparesca al menos una vez
        expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);
    })


    test('Boton de Google debe de llamar startGoogleSingIn', () => {

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        )



        // Utilizo el identificador que definimos en el boton para buscarlo

        const googleBtn = screen.getByLabelText('google-btn');
        // console.log(googleBtn);

        fireEvent.click(googleBtn);

        expect(mockStartGoogleSingIn).toHaveBeenCalled();

    })

    test('Submit debe de llamar startLoginWithEmailPassword', () => {

        const email = 'guaniqued@gmail.com';
        const password = '123456';


        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        )

        const emailField = screen.getByRole( 'textbox', { name: 'Correo' })
        fireEvent.change(emailField, {target: { name: 'email', value: email } });

        const passwordField = screen.getByTestId( 'password');
        fireEvent.change(passwordField, {target: { name: 'password', value: password } });

        const loginForm = screen.getByLabelText('submit-form');
        fireEvent.submit( loginForm );

        expect( mockStartLoginWithEmailPassword ).toHaveBeenCalledWith({
            email: email,
            password: password,
        })




    })

})