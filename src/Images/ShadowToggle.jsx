import React, { useEffect, useRef } from 'react'
import { useSelector } from '@xstate/react'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import cn from 'classnames'
import { shadowIconDataUri } from 'itk-viewer-icons'
import applyContrastSensitiveStyleToElement from '../applyContrastSensitiveStyleToElement'
import '../style.css'

function ShadowToggle(props) {
  const { service } = props
  const shadowButton = useRef(null)
  const stateContext = useSelector(service, (state) => state.context)
  const send = service.send
  const name = stateContext.images.selectedName
  const actorContext = stateContext.images.actorContext.get(name)
  const shadowEnabled = useSelector(
    service,
    (state) =>
      state.context.images.actorContext.get(state.context.images.selectedName)
        .shadowEnabled
  )

  useEffect(() => {
    applyContrastSensitiveStyleToElement(
      stateContext,
      'invertibleButton',
      shadowButton.current
    )
    stateContext.images.shadowButtonInput = shadowButton.current
  }, [])

  return (
    <OverlayTrigger transition={false} overlay={<Tooltip>Use Shadow</Tooltip>}>
      <Button
        className={cn('icon-button', {
          checked: shadowEnabled
        })}
        variant="secondary"
        value="shadowVisible"
        onClick={() => {
          send({
            type: 'TOGGLE_IMAGE_SHADOW',
            data: name
          })
        }}
      >
        <Image src={shadowIconDataUri}></Image>
      </Button>
    </OverlayTrigger>
  )
}

export default ShadowToggle
