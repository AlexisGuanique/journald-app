// En caso de necesitar la implementación del FetchAPI
import 'whatwg-fetch'; // <-- yarn add whatwg-fetch
import 'setimmediate';


// Para modificar el tiempo de espera para una respuesta en una prueba
jest.setTimeout(20000)

require('dotenv').config({
    path: '.env.test'
});



jest.mock('./src/helpers/getEnvironments', () => ({
    getEnvironments: () => ({ ...process.env })
}))

