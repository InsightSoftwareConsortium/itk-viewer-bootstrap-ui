import React, { useEffect, useRef } from 'react'
import { useActor } from '@xstate/react'
import { Icon, Tooltip } from '@material-ui/core'
import { ToggleButton } from '@material-ui/lab'
import { shadowIconDataUri } from 'itk-viewer-icons'
import applyContrastSensitiveStyleToElement from '../applyContrastSensitiveStyleToElement'
import '../style.css'

function ShadowToggle(props) {
  const { service } = props
  const shadowButton = useRef(null)
  const [ state, send ] = useActor(service)
  const name = state.context.images.selectedName
  const actorContext = state.context.images.actorContext.get(name)

  useEffect(() => {
    applyContrastSensitiveStyleToElement(
        state.context, 'invertibleButton', shadowButton.current)
    state.context.images.shadowButtonInput = shadowButton.current
  }, [])

  return(
    <label ref={ shadowButton } data-tooltip-left data-tooltip='Use Shadow'>
      <ToggleButton
				size='small'
        className='toggleButton'
        value='shadowVisible'
        selected={ actorContext.shadowEnabled }
        onChange={() => {
          send({
            type: 'TOGGLE_IMAGE_SHADOW',
            data: name,
        })}}
      >
        <Icon className='shadowButton'>
          <img src={ shadowIconDataUri }/>
        </Icon>
      </ToggleButton>
    </label>
  )
}

export default ShadowToggle
