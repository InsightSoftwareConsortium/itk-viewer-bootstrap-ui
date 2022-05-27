import React from 'react'
import { useSelector } from '@xstate/react'
import { selectColorIconDataUri } from 'itk-viewer-icons'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import cn from 'classnames'

const BackgroundColorButton = React.memo(function BackgroundColorButton(props) {
  const { service } = props
  const selectCount = (state) => state.context.main.selectedBackgroundColor
  const stateBackgroundColorEnabled = useSelector(service, selectCount)
  const send = service.send

  return (
    <OverlayTrigger
      transition={false}
      overlay={<Tooltip> Toggle Background Color </Tooltip>}
    >
      <Button
        className={cn('icon-button', {
          checked: stateBackgroundColorEnabled
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
})

export default BackgroundColorButton
