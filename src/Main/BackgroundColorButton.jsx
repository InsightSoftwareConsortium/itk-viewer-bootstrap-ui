import React from 'react'
import { useActor } from '@xstate/react'
import { selectColorIconDataUri } from 'itk-viewer-icons'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import cn from 'classnames'

function BackgroundColorButton(props) {
  const { service } = props
  const [state, send] = useActor(service)

  return (
    <OverlayTrigger
      transition={false}
      overlay={<Tooltip> Toggle Background Color </Tooltip>}
    >
      <Button
        className={cn('icon-button', {
          checked: state.context.main.backgroundColorsEnabled
        })}
        onClick={() => {
          send('TOGGLE_BACKGROUND_COLOR')
        }}
        variant="secondary"
      >
        <Image src={selectColorIconDataUri} />
      </Button>
    </OverlayTrigger>
  )
}

export default BackgroundColorButton
