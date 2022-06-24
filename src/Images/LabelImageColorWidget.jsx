import React, { useEffect, useRef } from 'react'
import { useSelector } from '@xstate/react'
import CategoricalIconSelector from './CategoricalIconSelector'
import { opacityIconDataUri } from 'itk-viewer-icons'
import Form from 'react-bootstrap/Form'
import Image from 'react-bootstrap/Image'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import '../style.css'

function LabelImageColorWidget(props) {
  const { service } = props
  const labelImageColorUIGroup = useRef(null)
  const opacityDiv = useRef(null)
  const blendElement = useRef(null)
  const send = service.send

  const name = useSelector(
    service,
    (state) => state.context.images.selectedName
  )
  const actorContext = useSelector(service, (state) =>
    state.context.images.actorContext.get(name)
  )

  useEffect(() => {
    service.machine.context.images.labelImageColorUIGroup =
      labelImageColorUIGroup.current
  }, [])

  const blendChanged = (val) => {
    send({
      type: 'LABEL_IMAGE_BLEND_CHANGED',
      data: { name, labelImageBlend: val }
    })
  }

  return (
    <div ref={labelImageColorUIGroup} className="uiGroup">
      <div className="uiRow">
        <CategoricalIconSelector {...props} />
        <OverlayTrigger
          transition={false}
          overlay={<Tooltip>Label image blend</Tooltip>}
        >
          <div className="icon-image" ref={opacityDiv}>
            <Image src={opacityIconDataUri}></Image>
          </div>
        </OverlayTrigger>
        <Form.Control
          type="range"
          custom
          ref={blendElement}
          className="slider"
          min={0}
          max={1}
          value={actorContext.labelImageBlend}
          step={0.01}
          onChange={(_e) => {
            blendChanged(_e.target.value)
          }}
        />
      </div>
    </div>
  )
}

export default LabelImageColorWidget
