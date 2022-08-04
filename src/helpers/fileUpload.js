
export const fileUpload = async( file ) => {

    // if ( !file ) throw new Error('Archivo no disponible')

    if ( !file ) return null;


    // URL de la peticion http
    const cloudUrl = 'https://api.cloudinary.com/v1_1/dedsff8gf/upload';

    // armamos el body de la peticion
    const formData = new FormData();

    formData.append('upload_preset', 'react-journal');
    formData.append('file', file );

    try {

        
        // Realizamos la peticion
        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: formData,
        });

        // console.log(resp);
        if ( !resp.ok ) throw new Error('No se pudo subir imagen')

        const cloudResp = await resp.json();

        // console.log({ cloudResp });

        return cloudResp.secure_url;

    }
    catch ( error ) {
        // console.log(error)

        // throw new Error( error.message );
        return null;
    }

}
