import React, { useEffect, useRef } from 'react'
import { useActor } from '@xstate/react'
import { Icon, IconButton, Tooltip } from '@material-ui/core'
import { selectColorIconDataUri } from 'itk-viewer-icons'
import '../style.css'

function BackgroundColorButton(props) {
  const { service } = props
  const bgColorButton = useRef(null)
  const [ state, send ] = useActor(service)

  useEffect(() => {
    state.context.main.bgColorButtonLabel = bgColorButton.current
  }, [])

  return(
    <Tooltip ref={ bgColorButton } title='Toggle Background Color'>
      <IconButton onClick={() => { send('TOGGLE_BACKGROUND_COLOR') }}>
        <Icon>
          <img src={ selectColorIconDataUri } />
        </Icon>
      </IconButton>
    </Tooltip>
  )
}

export default BackgroundColorButton
