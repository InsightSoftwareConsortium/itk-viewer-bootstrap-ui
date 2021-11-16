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
    <label ref={ bgColorButton } data-tooltip-right data-tooltip='Toggle Background Color'>
      <IconButton size='small' onClick={() => { send('TOGGLE_BACKGROUND_COLOR') }}>
        <Icon>
          <img src={ selectColorIconDataUri } />
        </Icon>
      </IconButton>
    </label>
  )
}

export default BackgroundColorButton
