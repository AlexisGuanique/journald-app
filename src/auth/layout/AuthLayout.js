import { Grid, Typography } from "@mui/material"


// AQUI CREAMOS EL LAYOUT PARA AHORRAR CODIGO
export const AuthLayout = ({ children, title= '' }) => {
    return (
        // Container general
        <Grid
            container
            spacing={0}
            direction='column'
            alignItems='center'
            justifyContent='center'
            sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}

        >
            {/* Container donde estan los formularios de logueo */}
            <Grid
                item
                className='box-shadow'
                xs={3}
                sx={{
                    width: { md: 450 },
                    backgroundColor: 'white', 
                    padding: 3, 
                    borderRadius: 2 
                }}>

                <Typography
                    textAlign='center'
                    variant='h5'
                    sx={{ mb: 1 }}>
                    { title }
                </Typography>

                { children }
            </Grid>
        </Grid>
    )
}
