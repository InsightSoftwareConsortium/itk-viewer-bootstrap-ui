import React, { useEffect, useRef } from 'react'
import { useActor } from '@xstate/react'
import { Icon, Tooltip } from '@material-ui/core'
import { ToggleButton } from '@material-ui/lab'
import { fullscreenIconDataUri } from 'itk-viewer-icons'
import './style.css'

function FullscreenButton(props) {
  const { service } = props
  const fullscreenButton = useRef(null)
  const [ state, send ] = useActor(service)

  useEffect(() => {
    state.context.main.fullscreenButton = fullscreenButton.current
  }, [])

  return(
    <Tooltip ref={ fullscreenButton } title='Fullscreen [f]'>
      <ToggleButton
        className='toggleButton'
        value='fullscreenEnabled'
        selected={ state.context.main.fullscreenEnabled }
        onChange={() => { send('TOGGLE_FULLSCREEN') }}
      >
        <Icon>
          <img src={ fullscreenIconDataUri } />
        </Icon>
      </ToggleButton>
    </Tooltip>
  )
}

export default FullscreenButton
