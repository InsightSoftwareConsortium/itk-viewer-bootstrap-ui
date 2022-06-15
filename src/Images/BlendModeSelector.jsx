import React, { useEffect, useRef } from 'react'
import { useSelector } from '@xstate/react'
import { blendModeIconDataUri } from 'itk-viewer-icons'
import applyContrastSensitiveStyleToElement from '../applyContrastSensitiveStyleToElement'
import Image from 'react-bootstrap/Image'
import Form from 'react-bootstrap/Form'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import '../style.css'

function BlendModeSelector(props) {
  const { service } = props
  const send = service.send
  const blendModeDiv = useRef(null)
  const blendModeSelector = useRef(null)
  const blendModeIcon = useRef(null)
  const selectedName = useSelector(
    service,
    (state) => state.context.images.selectedName
  )
  const stateContext = useSelector(service, (state) => state.context)

  useEffect(() => {
    applyContrastSensitiveStyleToElement(
      stateContext,
      'invertibleButton',
      blendModeIcon.current
    )
    service.machine.context.images.blendModeDiv = blendModeIcon.current
    service.machine.context.images.blendModeSelector = blendModeSelector.current
  }, [])

  const selectionChanged = (event) => {
    const value = parseInt(event.target.value)
    service.machine.context.images.blendModeSelector.value = value
    let mode = 'blendmode'
    switch (value) {
      case 0:
        mode = 'Composite'
        break
      case 1:
        mode = 'Maximum'
        break
      case 2:
        mode = 'Minimum'
        break
      case 3:
        mode = 'Average'
        break
    }
    send({
      type: 'IMAGE_BLEND_MODE_CHANGED',
      data: {
        name: selectedName,
        blendMode: mode
      }
    })
  }

  return (
    <div ref={blendModeDiv} className="blendSelector">
      <OverlayTrigger
        transition={false}
        overlay={<Tooltip>Blend mode</Tooltip>}
      >
        <div className="icon-image">
          <Image src={blendModeIconDataUri}></Image>
        </div>
      </OverlayTrigger>
      <Form.Control
        as="select"
        ref={blendModeSelector}
        className="selector blendMenu"
        onChange={(event) => {
          selectionChanged(event)
        }}
      >
        <option value={0}>Composite</option>
        <option value={1}>Maximum</option>
        <option value={2}>Minimum</option>
        <option value={3}>Average</option>
      </Form.Control>
    </div>
  )
}

export default BlendModeSelector
