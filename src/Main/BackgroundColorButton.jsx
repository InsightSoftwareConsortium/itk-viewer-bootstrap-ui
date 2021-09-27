import React from 'react'
import { useActor } from '@xstate/react'
import { Icon, IconButton, Tooltip } from '@material-ui/core'
import { selectColorIconDataUri } from 'itk-viewer-icons'
import './style.css'

function BackgroundColorButton(props) {
  const { service } = props
  const [, send ] = useActor(service)

  return(
    <Tooltip title='Toggle Background Color'>
      <IconButton onClick={() => { send('TOGGLE_BACKGROUND_COLOR') }}>
        <Icon>
          <img src={ selectColorIconDataUri } />
        </Icon>
      </IconButton>
    </Tooltip>
  )
}

export default BackgroundColorButton
