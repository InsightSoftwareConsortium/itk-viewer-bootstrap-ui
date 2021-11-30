import React, { useEffect, useRef } from 'react'
import { useActor } from '@xstate/react'
import { Icon, ToggleButton, Tooltip } from '@mui/material'
import {
  volumeIconDataUri,
  redPlaneIconDataUri,
  yellowPlaneIconDataUri,
  greenPlaneIconDataUri
} from 'itk-viewer-icons'

function ViewModeButtons(props) {
  const { service } = props
  const xPlaneButton = useRef(null)
  const yPlaneButton = useRef(null)
  const zPlaneButton = useRef(null)
  const volumeButton = useRef(null)
  const [state, send] = useActor(service)

  useEffect(() => {
    state.context.main.xPlaneButtonLabel = xPlaneButton.current
    state.context.main.yPlaneButtonLabel = yPlaneButton.current
    state.context.main.zPlaneButtonLabel = zPlaneButton.current
    state.context.main.volumeButtonLabel = volumeButton.current
  }, [])

  return (
    <div className="viewModeButtons">
      <Tooltip
        ref={xPlaneButton}
        title="X plane [1]"
        PopperProps={{
          anchorEl: xPlaneButton.current,
          disablePortal: true,
          keepMounted: true
        }}
      >
        <ToggleButton
          size="small"
          className="toggleButton"
          value="xplane"
          selected={state.context.main.xPlaneButton}
          onChange={() => {
            send({ type: 'VIEW_MODE_CHANGED', data: 'XPlane' })
          }}
        >
          <Icon className="viewModeButton">
            <img
              style={{ height: '24px', width: '24px' }}
              src={redPlaneIconDataUri}
            />
          </Icon>
        </ToggleButton>
      </Tooltip>
      <Tooltip
        ref={yPlaneButton}
        title="Y plane [2]"
        PopperProps={{
          anchorEl: yPlaneButton.current,
          disablePortal: true,
          keepMounted: true
        }}
      >
        <ToggleButton
          size="small"
          className="toggleButton"
          value="yplane"
          selected={state.context.main.yPlaneButton}
          onClick={() => {
            send({ type: 'VIEW_MODE_CHANGED', data: 'YPlane' })
          }}
        >
          <Icon className="viewModeButton">
            <img
              style={{ height: '24px', width: '24px' }}
              src={yellowPlaneIconDataUri}
            />
          </Icon>
        </ToggleButton>
      </Tooltip>
      <Tooltip
        ref={zPlaneButton}
        title="z plane [3]"
        PopperProps={{
          anchorEl: zPlaneButton.current,
          disablePortal: true,
          keepMounted: true
        }}
      >
        <ToggleButton
          size="small"
          className="toggleButton"
          value="zplane"
          selected={state.context.main.zPlaneButton}
          onClick={() => {
            send({ type: 'VIEW_MODE_CHANGED', data: 'ZPlane' })
          }}
        >
          <Icon className="viewModeButton">
            <img
              style={{ height: '24px', width: '24px' }}
              src={greenPlaneIconDataUri}
            />
          </Icon>
        </ToggleButton>
      </Tooltip>
      <Tooltip
        ref={volumeButton}
        title="Volume [4]"
        PopperProps={{
          anchorEl: volumeButton.current,
          disablePortal: true,
          keepMounted: true
        }}
      >
        <ToggleButton
          size="small"
          className="toggleButton"
          value="volume"
          selected={state.context.main.volumeButton}
          onClick={() => {
            send({ type: 'VIEW_MODE_CHANGED', data: 'Volume' })
          }}
        >
          <Icon className="viewModeButton">
            <img
              style={{ height: '24px', width: '24px' }}
              src={volumeIconDataUri}
            />
          </Icon>
        </ToggleButton>
      </Tooltip>
    </div>
  )
}

export default ViewModeButtons
