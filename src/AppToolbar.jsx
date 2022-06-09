import React from 'react'
import { AppBar, Icon, IconButton, Toolbar, Typography } from '@mui/material'
import { toggleIconDataUri } from 'itk-viewer-icons'
import toggleUICollapsed from './toggleUICollapsed'
import './Panel.css'

function AppToolbar(props) {
  const { service } = props
  const send = service.send

  const handleToggle = () => {
    send('TOGGLE_UI_COLLAPSED')
    toggleUICollapsed(service.machine.context)
  }

  return (
    <AppBar className="appBar">
      <Toolbar>
        <IconButton
          size="small"
          color="inherit"
          onClick={handleToggle}
          edge="start"
        >
          <Icon>
            <img src={toggleIconDataUri} alt="toggle" />
          </Icon>
        </IconButton>
        <Typography variant="h5" noWrap>
          ITK Viewer
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default AppToolbar
