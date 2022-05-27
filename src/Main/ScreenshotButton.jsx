import React from 'react'
import { useActor, useSelector } from '@xstate/react'
import { screenshotIconDataUri } from 'itk-viewer-icons'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import cn from 'classnames'

function ScreenshotButton(props) {
  const { service } = props
  const selectCount = (state) => state.context.main.screenshotEnabled
  const stateScreenshotEnabled = useSelector(service, selectCount)
  const send = service.send

  return (
    <OverlayTrigger transition={false} overlay={<Tooltip>Screenshot</Tooltip>}>
      <Button
        className={cn('icon-button', {
          checked: stateScreenshotEnabled
        })}
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
