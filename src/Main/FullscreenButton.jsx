import React, { useEffect, useRef } from 'react'
import { useActor } from '@xstate/react'
import { Icon, ToggleButton, Tooltip } from '@mui/material'
import { fullscreenIconDataUri } from 'itk-viewer-icons'
import '../style.css'

function FullscreenButton(props) {
  const { service } = props
  const fullscreenButton = useRef(null)
  const [ state, send ] = useActor(service)

  useEffect(() => {
    state.context.main.fullscreenButton = fullscreenButton.current
  }, [])

  return(
    <label ref={ fullscreenButton } data-tooltip-left data-tooltip='Fullscreen [f]'>
      <ToggleButton
        size='small'
        className='toggleButton'
        value='fullscreenEnabled'
        selected={ state.context.main.fullscreenEnabled }
        onChange={() => { send('TOGGLE_FULLSCREEN') }}
      >
        <Icon>
          <img src={ fullscreenIconDataUri } />
        </Icon>
      </ToggleButton>
    </label>
  )
}

export default FullscreenButton
