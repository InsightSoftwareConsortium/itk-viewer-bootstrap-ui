import React from 'react'
import { useActor } from '@xstate/react'
import { axesIconDataUri } from 'itk-viewer-icons'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import cn from 'classnames'

function AxesButton(props) {
  const { service } = props
  const [state, send] = useActor(service)

  return (
    <OverlayTrigger transition={false} overlay={<Tooltip> Axes </Tooltip>}>
      <Button
        className={cn('icon-button', {
          checked: state.context.main.axesEnabled
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
