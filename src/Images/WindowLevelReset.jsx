import React, { useEffect, useRef } from 'react'
import { useSelector } from '@xstate/react'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import { resetImageIconDataUri } from '@itk-viewer/icons'
import applyContrastSensitiveStyleToElement from '../applyContrastSensitiveStyleToElement'
import '../style.css'

function WindowLevelReset(props) {
  const { service } = props
  const resetImageButton = useRef(null)
  const stateContext = useSelector(service, (state) => state.context)
  const send = service.send

  useEffect(() => {
    applyContrastSensitiveStyleToElement(
      stateContext,
      'invertibleButton',
      resetImageButton.current
    )
    stateContext.images.resetImageButtonInput = resetImageButton.current
  }, [])

  const resetImage = () => {
    send({
      type: 'IMAGE_COLOR_RANGE_RESET',
      data: {
        name: stateContext.images.selectedName
      }
    })
  }

  return (
    <OverlayTrigger
      transition={false}
      overlay={<Tooltip>Reset range to ROI</Tooltip>}
    >
      <Button
        className="icon-image"
        onClick={() => {
          resetImage()
        }}
        variant="secondary"
        ref={resetImageButton}
      >
        <Image src={resetImageIconDataUri}></Image>
      </Button>
    </OverlayTrigger>
  )
}

export default WindowLevelReset
