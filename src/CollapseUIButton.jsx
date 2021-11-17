import React, { useEffect, useRef } from 'react'
import { useActor } from '@xstate/react'
import { Icon, IconButton } from '@material-ui/core'
import { toggleIconDataUri } from 'itk-viewer-icons'
import toggleUICollapsed from './toggleUICollapsed'
import './Panel.css'

function CollapseUIButton(props) {
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
    <div className='appBar'>
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
    </div>
  )
}

export default CollapseUIButton
