import { v2 as cloudinary } from 'cloudinary'
import { fileUpload } from '../../src/helpers/fileUpload';

// Configuracion de claudinary para poder manipular la base de datos como administrador
cloudinary.config({
    cloud_name: 'dedsff8gf',
    api_key: '343876781138728',
    api_secret: 'iL08BMDK-hsvjwv24YB6Yn7ny3M',
    secure: true
})

describe('Pruebas en fileUpload', () => {

    test('Debe de subir el archivo correctamente a claudinary', async() => {

        const imageUrl = 'https://thumbs.dreamstime.com/b/beautiful-landscape-sunrise-kirkjufellsfoss-waterfall-kirkjufell-mountain-iceland-europe-178762480.jpg';

        const resp = await fetch(imageUrl)

        const blob = await resp.blob();

        const file = new File( [blob], 'foto.jpg' );


        const url = await fileUpload( file );

        expect( typeof url ).toBe('string' );

        // console.log( url );
        // Segmentamos el url 
        const segments = url.split( '/' );

        // extraemos el id de la imagen de acuerdo a su posicion en el objeto url
        const imageId = segments[ segments.length - 1 ].replace('.jpg', '' ) ;

        // console.log( {imageId} );

        // Eliminamos la imagen pasandole el id a cloudinary
        await cloudinary.api.delete_resources([ imageId ]);



    })

    test('Debe de retornar null', async() => {

        const file = new File( [], 'foto.jpg' );


        const url = await fileUpload( file );

        expect( url ).toBe( null );


    })



});