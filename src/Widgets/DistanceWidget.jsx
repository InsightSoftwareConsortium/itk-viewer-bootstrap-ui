import React, { useEffect, useRef } from 'react'
import { useActor } from '@xstate/react'
import { Icon, TextField, ToggleButton, Tooltip } from '@mui/material'
import { lengthToolIconDataUri } from 'itk-viewer-icons'
import applyContrastSensitiveStyleToElement from '../applyContrastSensitiveStyleToElement'
import '../style.css'

function DistanceWidget(props) {
  const { service } = props
  const [state, send] = useActor(service)
  const distanceRulerRow = useRef(null)
  const distanceButtonInput = useRef(null)
  const distanceButtonLabel = useRef(null)
  const distanceLabel = useRef(null)
  const viewMode = state.context.main.viewMode

  useEffect(() => {
    state.context.widgets.distanceRulerRow = distanceRulerRow.current
    state.context.widgets.distanceButtonInput = distanceButtonInput.current
    state.context.widgets.distanceButtonLabel = distanceButtonLabel.current
    state.context.widgets.distanceLabel = distanceLabel.current
    applyContrastSensitiveStyleToElement(
      state.context,
      'invertibleButton',
      distanceButtonLabel.current
    )
    applyContrastSensitiveStyleToElement(
      state.context,
      'distanceLabel',
      distanceLabel.current
    )
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
          selected={state.context.widgets.distanceEnabled}
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
        value={state.context.widgets.distanceValue}
        disabled
      />
    </div>
  )
}

export default DistanceWidget
