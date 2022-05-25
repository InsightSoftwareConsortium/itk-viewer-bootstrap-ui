import React from 'react'
import { useActor } from '@xstate/react'
import { fullscreenIconDataUri } from 'itk-viewer-icons'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import cn from 'classnames'

function FullscreenButton(props) {
  const { service } = props
  const [state, send] = useActor(service)

  return ( 
    <OverlayTrigger
      transition={false}
      overlay={<Tooltip> Fullscreen [f] </Tooltip>}
    >
      <Button
      className={cn('icon-button', {
        checked:state.context.main.fullscreenEnabled
      })}
      onClick={() => send('TOGGLE_FULLSCREEN')}
      variant='secondary'
      >
        <Image src={fullscreenIconDataUri}></Image>
      </Button>
    </OverlayTrigger>
    )
 }

export default FullscreenButton
