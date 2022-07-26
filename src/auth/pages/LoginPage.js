import { useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Google } from '@mui/icons-material'
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'

import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks/useForm'
import { startGoogleSingIn, startLoginWithEmailPassword } from '../../store/auth/thunks'

const formData = {
  email: '',
  password: ''
}

export const LoginPage = () => {

  const { status, errorMessage } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const { email, password, onInputChange } = useForm( formData );

  const isAuthenticating = useMemo(() => status === 'checking', [status]);


  const onSubmit = (event) => {

    event.preventDefault();
    console.log({ email, password });


    // TAREA
    //!No es esta la accion a despachar
    dispatch(startLoginWithEmailPassword({ email, password }));


  };


  const onGoogleSingIn = () => {

    console.log('onGoogleSingIn');

    dispatch(startGoogleSingIn());

  };



  return (
    <AuthLayout title='Login'>
      {/* AQUI VA EL CHILDREN!!! */}
      {/* Formulario de logueo */}
      <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>
        {/* Container que contiene las entradas del formulario */}
        <Grid container>

          {/* Campo de correo */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Correo'
              type='email'
              placeholder="correo@gmail.com"
              fullWidth
              name='email'
              value={email}
              onChange={onInputChange}
            />
          </Grid>

          {/* Campo de contraseña */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='contraseña'
              type='password'
              placeholder="contraseña"
              fullWidth
              name='password'
              value={password}
              onChange={onInputChange}
            />

          </Grid>


          <Grid 
            container
            display={!!errorMessage ? '' : 'none'}
            sx={{ mt: 1}}
          >

            <Grid
              item
              xs={12}
            >
              <Alert severity='error'>
                {errorMessage}
              </Alert>
            </Grid>
          </Grid>

          {/* container donde estan los botones */}
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>

            {/* Boton de login */}
            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAuthenticating}
                type="submit"
                variant="contained"
                fullWidth

              >
                Login
              </Button>
            </Grid>

            {/* Boton de Google */}
            <Grid item xs={12} sm={6}>

              <Button
                disabled={isAuthenticating}
                onClick={onGoogleSingIn}
                variant="contained"
                fullWidth

              >

                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>

          </Grid>

          {/* Container que va a la direccion register */}
          <Grid container direction='row' justifyContent='end'>
            <Link component={RouterLink} color='inherit' to='/auth/register'>
              Crear una cuenta
            </Link>
          </Grid>

        </Grid>

      </form>
    </AuthLayout>
  )
}
