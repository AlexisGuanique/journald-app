import { Routes, Route, Navigate } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/AuthRoutes"

import { useCheckAuth } from "../hooks"
import { JournaldRoutes } from "../journal/routes/JournaldRoutes"
import { CheckingAuth } from "../ui/components/CheckingAuth"

// Configuremos nuestra ruta principal
export const AppRouter = () => {

  const status = useCheckAuth()


  if (status === 'checking') {
    return <CheckingAuth />
  }

  return (
    <Routes>

      {
        ( status === 'authenticated')
        ? <Route path='/*' element={<JournaldRoutes />} />
        : <Route path="/auth/*" element={<AuthRoutes />} />
      }

      <Route path='/*' element={ <Navigate to='/auth/login' />} />

      {/* Ruta de login y registro */}
      {/* <Route path="/auth/*" element={<AuthRoutes />} /> */}

      {/* Ruta de la Journal App */}
      {/* <Route path='/*' element={<JournaldRoutes />} /> */}

    </Routes>
  )
}
