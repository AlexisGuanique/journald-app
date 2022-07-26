import { Toolbar } from "@mui/material";
import { Box } from "@mui/system"
import { SideBar } from "../components";
import { NavBar } from "../components/NavBar";


const drawerWidth = 240;


export const JournaldLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }} className='animate__animated animate__fadeIn animate__faster'>

        <NavBar drawerWidth={ drawerWidth } />

        <SideBar drawerWidth={ drawerWidth } />

        <Box
            component='main'
            sx={{ flexGrow: 1, p: 3 }}
        >
            <Toolbar />
            { children }
        </Box>


    </Box>
  )
}
