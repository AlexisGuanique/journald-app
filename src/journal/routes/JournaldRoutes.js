import { Navigate, Route, Routes } from 'react-router-dom';
import { JournaldPage } from "../pages/JournaldPage"


export const JournaldRoutes = () => {
  return (

    <Routes>
    
        <Route path='/' element={ <JournaldPage />} />

        <Route path='/*' element={ <Navigate to='/' />} />

    
    </Routes>


  )
}
