import React from 'react'
import { screenshotIconDataUri } from 'itk-viewer-icons'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

function ScreenshotButton(props) {
  const { service } = props
  const send = service.send

  return (
    <OverlayTrigger transition={false} overlay={<Tooltip>Screenshot</Tooltip>}>
      <Button
        className={'icon-button'}
        onClick={() => {
          send('TAKE_SCREENSHOT')
        }}
        variant="secondary"
      >
        <Image src={screenshotIconDataUri}></Image>
      </Button>
    </OverlayTrigger>
  )
}

export default ScreenshotButton
