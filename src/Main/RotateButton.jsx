import React from 'react'
import { useActor } from '@xstate/react'
import { Icon, Tooltip } from '@material-ui/core'
import { ToggleButton } from '@material-ui/lab'
import { rotateIconDataUri } from 'itk-viewer-icons'
import './style.css'

function RotateButton(props) {
  const { service } = props
  const [ state, send ] = useActor(service)

  return(
    <Tooltip title='Spin in 3D [p]'>
      <ToggleButton
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
