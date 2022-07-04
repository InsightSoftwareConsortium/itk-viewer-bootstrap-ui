import React from 'react'
import { useSelector } from '@xstate/react'
import { rotateIconDataUri } from 'itk-viewer-icons'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import cn from 'classnames'

function RotateButton(props) {
  const { service } = props
  const stateRotateEnabled = useSelector(
    service,
    (state) => state.context.main.rotateEnabled
  )
  const send = service.send

  return (
    <OverlayTrigger
      transition={false}
      overlay={<Tooltip> Spin in 3D [p] </Tooltip>}
    >
      <Button
        className={cn('icon-button', {
          checked: stateRotateEnabled
        })}
        onClick={() => send('TOGGLE_ROTATE')}
        variant="secondary"
      >
        <Image src={rotateIconDataUri}></Image>
      </Button>
    </OverlayTrigger>
  )
}

export default RotateButton
