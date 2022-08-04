import { useDispatch, useSelector } from 'react-redux'

import { IconButton } from "@mui/material"
import { AddOutlined } from '@mui/icons-material'
import { JournaldLayout } from "../layout/JournaldLayout"
import { NothingSelectedViews, NoteView  } from "../views"
import { startNewNote } from '../../store/journal/thunks'


export const JournaldPage = () => {


  const dispatch = useDispatch();

  const { isSaving, active } = useSelector( state => state.journal );

  const onClickNewNote = () => {

    dispatch( startNewNote() );

  }


  return (
    <JournaldLayout>

      {
        (!!active)
        ? <NoteView />
        : <NothingSelectedViews />
      }
      
      
      

      <IconButton
        onClick={ onClickNewNote }
        size="large"
        disabled={ isSaving }
        sx={{
          color:'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor:'error.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 70
        }}
      >

        <AddOutlined sx={{ fontSize: 30 }} />


      </IconButton>
    </JournaldLayout>

  )
}
