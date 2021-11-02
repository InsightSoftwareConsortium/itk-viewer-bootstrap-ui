import React, { useEffect, useRef } from 'react'
import { useActor } from '@xstate/react'
import {
  AppBar, Drawer, Icon, IconButton, Toolbar, Typography
} from '@material-ui/core'
import { toggleIconDataUri } from 'itk-viewer-icons'
import toggleUICollapsed from './toggleUICollapsed'
import './Panel.css'

function Panel(props) {
  const { children, service } = props
  const uiPanel = useRef(null)
  const collapseUIButton = useRef(null)
  const [ state, send ] = useActor(service)

  useEffect(() => {
    state.context.uiPanel = uiPanel.current
    state.context.main.collapseUIButton = collapseUIButton.current
  }, [])

  const handleToggle = () => {
    send('TOGGLE_UI_COLLAPSED')
    toggleUICollapsed(state.context)
  }

  return (
    <div ref={ uiPanel } className='root'>
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
      <Drawer
        className='drawer'
        variant='persistent'
        anchor='left'
        open={ !state.context.uiCollapsed }
      >
        <div>
          {
            React.Children.map(children, (child) => {
              return React.cloneElement(child, { service })
            })
          }
        </div>
      </Drawer>
    </div>
  )
}

export default Panel
