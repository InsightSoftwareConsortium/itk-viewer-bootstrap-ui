import React, { useEffect, useRef } from 'react'
import { useActor } from '@xstate/react'
import {
  AppBar, Icon, IconButton, Toolbar, Typography
} from '@material-ui/core'
import { toggleIconDataUri } from 'itk-viewer-icons'
import toggleUICollapsed from './toggleUICollapsed'
import './Panel.css'

function AppToolbar(props) {
  const { service } = props
  const collapseUIButton = useRef(null)
  const [ state, send ] = useActor(service)

  useEffect(() => {
    state.context.main.collapseUIButton = collapseUIButton.current
  }, [])

  const handleToggle = () => {
    send('TOGGLE_UI_COLLAPSED')
    toggleUICollapsed(state.context)
  }
  
  return (
    <AppBar className='appBar'>
      <Toolbar>
        <IconButton
          size='small'
          ref={ collapseUIButton }
          color='inherit'
          onClick={ handleToggle }
          edge='start'
        >
          <Icon>
            <img src={ toggleIconDataUri } alt='toggle'/>
          </Icon>
        </IconButton>
        <Typography variant='h5' noWrap>
          ITK Viewer
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default AppToolbar
