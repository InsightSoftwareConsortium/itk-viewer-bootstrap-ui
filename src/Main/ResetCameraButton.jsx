import React from 'react'
import { resetCameraIconDataUri } from 'itk-viewer-icons'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

function ResetCamerButton({ service }) {
  const { send } = service

  return (
    <OverlayTrigger
      transition={false}
      overlay={<Tooltip>Reset camera [r]</Tooltip>}
    >
      <Button
        className={'icon-button'}
        onClick={() => send('RESET_CAMERA')}
        variant="secondary"
      >
        <Image src={resetCameraIconDataUri}></Image>
      </Button>
    </OverlayTrigger>
  )
}

export default ResetCamerButton
