import React from 'react'
import { useActor } from '@xstate/react'
import { Icon, Tooltip } from '@material-ui/core'
import { ToggleButton } from '@material-ui/lab'
import { axesIconDataUri } from 'itk-viewer-icons'
import './style.css'

function AxesButton(props) {
  const { service } = props
  const [ state, send ] = useActor(service)

  return(
    <Tooltip title='Axes'>
      <ToggleButton
        className='toggleButton'
        value='axesVisible'
        selected={ state.context.main.axesEnabled }
        onChange={() => { send('TOGGLE_AXES') }}
      >
        <Icon>
          <img src={ axesIconDataUri }/>
        </Icon>
      </ToggleButton>
    </Tooltip>
  )
}

export default AxesButton
