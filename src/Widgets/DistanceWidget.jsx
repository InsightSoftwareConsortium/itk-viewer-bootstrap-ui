import React, { useEffect, useRef } from 'react'
import { useSelector } from '@xstate/react'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Form from 'react-bootstrap/Form'
import { lengthToolIconDataUri } from 'itk-viewer-icons'
import applyContrastSensitiveStyleToElement from '../applyContrastSensitiveStyleToElement'
import '../style.css'
import cn from 'classnames'

function DistanceWidget({ service }) {
  const send = service.send
  const distanceRulerRow = useRef(null)
  const distanceButtonInput = useRef(null)
  const distanceButtonLabel = useRef(null)
  const distanceLabel = useRef(null)
  const viewMode = useSelector(service, (state) => state.context.main.viewMode)
  const distanceEnabled = useSelector(
    service,
    (state) => state.context.widgets.distanceEnabled
  )
  const distanceValue = useSelector(
    service,
    (state) => state.context.widgets.distanceValue
  )
  const stateContext = useSelector(service, (state) => state.context)

  useEffect(() => {
    service.machine.context.widgets.distanceRulerRow = distanceRulerRow.current
    service.machine.context.widgets.distanceButtonInput =
      distanceButtonInput.current
    service.machine.context.widgets.distanceButtonLabel =
      distanceButtonLabel.current
    service.machine.context.widgets.distanceLabel = distanceLabel.current
    applyContrastSensitiveStyleToElement(
      stateContext,
      'invertibleButton',
      distanceButtonLabel.current
    )
    applyContrastSensitiveStyleToElement(
      stateContext,
      'distanceLabel',
      distanceLabel.current
    )
  }, [])

  return (
    <div
      ref={distanceRulerRow}
      className={`uiRow distanceEntry ${viewMode === 'Volume' ? 'hidden' : ''}`}
    >
      <OverlayTrigger transition={false} overlay={<Tooltip>Length</Tooltip>}>
        <Button
          className={cn('icon-button', {
            checked: distanceEnabled
          })}
          onClick={() => send('TOGGLE_DISTANCE_WIDGET')}
          variant="secondary"
        >
          <Image src={lengthToolIconDataUri}></Image>
        </Button>
      </OverlayTrigger>
      <span className="distanceLabelCommon"> Length: </span>
      <Form.Control
        className="distanceInput"
        type="number"
        value={distanceValue}
        disabled
      />
    </div>
  )
}

export default DistanceWidget
