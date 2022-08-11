import React from 'react'
import { useSelector } from '@xstate/react'
import { axesIconDataUri } from 'itk-viewer-icons'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import cn from 'classnames'

function AxesButton(props) {
  const { service } = props
  const stateAxesEnabled = useSelector(
    service,
    (state) => state.context.main.axesEnabled
  )
  const send = service.send

  return (
    <OverlayTrigger transition={false} overlay={<Tooltip> Axes </Tooltip>}>
      <Button
        className={cn('icon-button', {
          checked: stateAxesEnabled
        })}
        onClick={() => send('TOGGLE_AXES')}
        variant="secondary"
      >
        <Image src={axesIconDataUri}></Image>
      </Button>
    </OverlayTrigger>
  )
}

export default AxesButton
