import React, { useEffect, useRef } from 'react'
import { useSelector } from '@xstate/react'
import { Icon, Slider, Tooltip } from '@mui/material'
import CategoricalIconSelector from './CategoricalIconSelector'
import { opacityIconDataUri } from 'itk-viewer-icons'
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
        <Tooltip
          ref={opacityDiv}
          title="Label image blend"
          PopperProps={{
            anchorEl: opacityDiv.current,
            disablePortal: true,
            keepMounted: true
          }}
          style={{ marginRight: '5px' }}
        >
          <Icon>
            <img src={opacityIconDataUri} />
          </Icon>
        </Tooltip>
        <Slider
          ref={blendElement}
          className="slider"
          min={0}
          max={1}
          value={actorContext.labelImageBlend}
          step={0.01}
          onChange={(_e, val) => {
            blendChanged(val)
          }}
        />
      </div>
    </div>
  )
}

export default LabelImageColorWidget
