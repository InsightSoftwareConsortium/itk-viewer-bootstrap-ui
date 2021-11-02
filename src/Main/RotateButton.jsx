import React, { useEffect, useRef } from 'react'
import { useActor } from '@xstate/react'
import { Icon, Tooltip } from '@material-ui/core'
import { ToggleButton } from '@material-ui/lab'
import { rotateIconDataUri } from 'itk-viewer-icons'
import '../style.css'

function RotateButton(props) {
  const { service } = props
  const rotateButton = useRef(null)
  const [ state, send ] = useActor(service)

  useEffect(() => {
    state.context.main.rotateButtonLabel = rotateButton.current
  }, [])

  return(
    <Tooltip ref={ rotateButton } title='Spin in 3D [p]'>
      <ToggleButton
        size='small'
        className='toggleButton'
        value='rotating'
        selected={ state.context.main.rotateEnabled }
        onChange={() => { send('TOGGLE_ROTATE') }}
      >
        <Icon>
          <img src={ rotateIconDataUri } />
        </Icon>
      </ToggleButton>
    </Tooltip>
  )
}

export default RotateButton
