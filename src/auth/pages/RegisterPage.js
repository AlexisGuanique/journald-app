import { Link as RouterLink } from 'react-router-dom'
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks/useForm';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks';



// Data del formulario por defecto
const formData = {
  email: '',
  password: '',
  displayName: '',
};



// Validaciones del formulario por defecto
const formValidations = {
  
  // Estas validaciones estan configuradas para que el primer elemento del arreglo sea
  // la funcion que va a evaluar y el segundo el mensaje de error
  
  email: [ (value) => value.includes('@'), 'El correo debe de tener un @'],
  password: [ (value) => value.length >= 6, 'La contraseña debe de tener mas de 6 carácteres'],
  displayName: [ (value) => value.length>= 1, 'El nombre es requerido'],

  // Luego se las envio a mi hook useForm
}



export const RegisterPage = () => {

  const dispatch = useDispatch();

  const [ formSubmitted, setFormSubmitted ] = useState(false);

  const { status, errorMessage } = useSelector( state  => state.auth );

  const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);

  const {
    formState, displayName, email, password, onInputChange,
    isFormValid, displayNameValid, emailValid, passwordValid,
  } = useForm( formData, formValidations );


  const onSubmit = (event) => {
    event.preventDefault();

    setFormSubmitted(true);

    if ( !isFormValid ) return;
    
    dispatch( startCreatingUserWithEmailPassword( formState) );
  }


  return (
    <AuthLayout title='Crear Cuenta'>
      {/* AQUI VA EL CHILDREN!!! */}

      {/* Formulario de logueo */}
      <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>
        {/* Container que contiene las entradas del formulario */}
        <Grid container>
          {/* Campo de nombre */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Nombre Completo'
              type='text'
              placeholder="Nombre Completo"
              fullWidth
              name='displayName'
              value={displayName}
              onChange={onInputChange}

              // Para manejar la validacion hacemos lo siguiente
              // Si colocamos la doble negacion lo convierte en un valor booleano
              error={!!displayNameValid && formSubmitted}
              helperText={ displayNameValid }
            />
          </Grid>

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

              
              // Para manejar la validacion hacemos lo siguiente
              // Si colocamos la doble negacion lo convierte en un valor booleano
              error={!!emailValid && formSubmitted }
              helperText={ emailValid }
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

              
              // Para manejar la validacion hacemos lo siguiente
              // Si colocamos la doble negacion lo convierte en un valor booleano
              error={ !!passwordValid && formSubmitted }
              helperText={ passwordValid }


            />
          </Grid>

          {/* container donde estan los botones */}
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>

            {/* Mensaje de alerta */}
            <Grid 
              item 
              xs={12}
              display={ !!errorMessage ? '' : 'none' }
            
            >
              <Alert severity='error'>
                { errorMessage }
              </Alert>
            </Grid>


            {/* Boton de crear cuenta */}
            <Grid item xs={12}>
              <Button
                dissable={ isCheckingAuthentication }
                type='submit'
                variant="contained"
                fullWidth
              >
                Crear Cuenta
              </Button>
            </Grid>

          </Grid>

          {/* Container que va a la direccion login y ademas pregunta si ya tienes cuenta */}
          <Grid container direction='row' justifyContent='end'>
            <Typography sx={{ mr: 1 }}>¿Ya tienes una cuenta?</Typography>
            <Link component={RouterLink} color='inherit' to='/auth/login'>
              Ingresar
            </Link>
          </Grid>

        </Grid>

      </form>
    </AuthLayout>
  )
}
