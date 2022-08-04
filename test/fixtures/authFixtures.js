
export const initialState = {
    status: 'checking',  
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
}

export const authenticatedState = {
    status: 'authenticated', 
    uid: '123ABC',
    email: 'guaniqued@gmail.com',
    displayName: 'Demo user',
    photoURL: 'https://demo.jpg',
    errorMessage: null,
}

export const notAuthenticatedState = {
    status: 'not-authenticated', 
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
}

export const demoUser = {
    uid: 'ABC123',
    email: 'guaniqued@gmail.com',
    displayName: 'Demo user',
    photoURL: 'https://foto.jpg',
}

