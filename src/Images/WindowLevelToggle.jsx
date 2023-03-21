import React, { useEffect, useRef } from 'react'
import { useSelector } from '@xstate/react'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import cn from 'classnames'
import { windowingIconDataUri } from 'itk-viewer-icons'
import applyContrastSensitiveStyleToElement from '../applyContrastSensitiveStyleToElement'
import '../style.css'
import getSelectedImageContext from './getSelectedImageContext'

function WindowLevelToggle(props) {
  const { service } = props
  const toggleWindowingButton = useRef(null)
  const stateContext = useSelector(service, (state) => state.context)
  const send = service.send
  const name = stateContext.images.selectedName

  const windowLevelEnabled = useSelector(
    service,
    (state) =>
      state.context.images.actorContext.get(state.context.images.selectedName)
        .windowLevelEnabled
  )

  const actorContext = useSelector(service, (state) =>
    getSelectedImageContext(state)
  )

  useEffect(() => {
    applyContrastSensitiveStyleToElement(
      stateContext,
      'invertibleButton',
      toggleWindowingButton.current
    )
    stateContext.images.toggleWindowingButtonInput = toggleWindowingButton.current
  }, [])

  const toggleWindowing = () => {
    send({
      type: 'WINDOW_LEVEL_TOGGLED',
      data: {
        name,
        component: actorContext.selectedComponent,
      },
    })
  }

  return (
    <OverlayTrigger
      transition={false}
      overlay={<Tooltip>Toggle window/level interactor</Tooltip>}
    >
      <Button
        className={cn('icon-button', {
          checked: windowLevelEnabled
        })}
        onClick={() => {
          toggleWindowing()
        }}
        variant="secondary"
        ref={toggleWindowingButton}
      >
        <Image src={windowingIconDataUri}></Image>
      </Button>
    </OverlayTrigger>
  )
}

export default WindowLevelToggle
