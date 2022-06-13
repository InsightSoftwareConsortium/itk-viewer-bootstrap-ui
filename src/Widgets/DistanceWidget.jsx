import React, { useEffect, useRef } from 'react'
import { useSelector } from '@xstate/react'
import { Icon, TextField, ToggleButton, Tooltip } from '@mui/material'
import { lengthToolIconDataUri } from 'itk-viewer-icons'
import applyContrastSensitiveStyleToElement from '../applyContrastSensitiveStyleToElement'
import '../style.css'

function DistanceWidget(props) {
  const { service } = props
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

  useEffect(() => {
    service.machine.context.widgets.distanceRulerRow = distanceRulerRow.current
    service.machine.context.widgets.distanceButtonInput =
      distanceButtonInput.current
    service.machine.context.widgets.distanceButtonLabel =
      distanceButtonLabel.current
    service.machine.context.widgets.distanceLabel = distanceLabel.current
    // applyContrastSensitiveStyleToElement(
    //   state.context,
    //   'invertibleButton',
    //   distanceButtonLabel.current
    // )
    // applyContrastSensitiveStyleToElement(
    //   state.context,
    //   'distanceLabel',
    //   distanceLabel.current
    // )
  }, [])

  return (
    <div
      ref={distanceRulerRow}
      className={`uiRow distanceEntry ${viewMode === 'Volume' ? 'hidden' : ''}`}
    >
      <Tooltip
        ref={distanceButtonLabel}
        title="Length"
        PopperProps={{
          anchorEl: distanceButtonLabel.current,
          disablePortal: true,
          keepMounted: true
        }}
      >
        <ToggleButton
          ref={distanceButtonInput}
          size="small"
          className="toggleButton"
          value="lengthShown"
          selected={distanceEnabled}
          onChange={() => {
            send('TOGGLE_DISTANCE_WIDGET')
          }}
        >
          <Icon>
            <img src={lengthToolIconDataUri} />
          </Icon>
        </ToggleButton>
      </Tooltip>
      <span ref={distanceLabel} className="distanceLabelCommon">
        Length:
      </span>
      <TextField
        variant="outlined"
        className="distanceInput"
        size="small"
        value={distanceValue}
        disabled
      />
    </div>
  )
}

export default DistanceWidget
