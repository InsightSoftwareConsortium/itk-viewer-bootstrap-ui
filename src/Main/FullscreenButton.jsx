import React from 'react'
import { useSelector } from '@xstate/react'
import { fullscreenIconDataUri } from 'itk-viewer-icons'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import cn from 'classnames'

function FullscreenButton(props) {
  const { service } = props
  const stateFullscreenEnabled = useSelector(
    service,
    (state) => state.context.main.fullscreenEnabled
  )
  const send = service.send

  return (
    <OverlayTrigger
      transition={false}
      overlay={<Tooltip> Fullscreen [f] </Tooltip>}
    >
      <Button
        className={cn('icon-button', {
          checked: stateFullscreenEnabled
        })}
        onClick={() => send('TOGGLE_FULLSCREEN')}
        variant="secondary"
      >
        <Image src={fullscreenIconDataUri}></Image>
      </Button>
    </OverlayTrigger>
  )
}

export default FullscreenButton
