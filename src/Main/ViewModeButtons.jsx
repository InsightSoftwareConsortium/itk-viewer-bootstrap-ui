import React, { useEffect, useRef } from 'react'
import { useActor } from '@xstate/react'
import { Icon, Tooltip } from '@material-ui/core'
import { ToggleButton } from '@material-ui/lab'
import {
  volumeIconDataUri,
  redPlaneIconDataUri,
  yellowPlaneIconDataUri,
  greenPlaneIconDataUri,
} from 'itk-viewer-icons'

function ViewModeButtons(props) {
  const { service } = props
  const xPlaneButton = useRef(null)
  const yPlaneButton = useRef(null)
  const zPlaneButton = useRef(null)
  const volumeButton = useRef(null)
  const [ state, send ] = useActor(service)

  useEffect(() => {
    state.context.xPlaneButtonLabel = xPlaneButton.current
    state.context.yPlaneButtonLabel = yPlaneButton.current
    state.context.zPlaneButtonLabel = zPlaneButton.current
    state.context.volumeButtonLabel = volumeButton.current
  }, [])

  return(
    <div className='viewModeButtons'>
      <Tooltip ref={ xPlaneButton } title='X plane [1]'>
        <ToggleButton
          className='toggleButton'
          value='xplane'
          selected={ state.context.main.xPlaneButton }
          onChange={() => {
              send({ type: 'VIEW_MODE_CHANGED', data: 'XPlane' })
          }}>
          <Icon className='viewModeButton'>
            <img
              style={{ height: '24px', width: '24px' }}
              src={ redPlaneIconDataUri }
            />
          </Icon>
        </ToggleButton>
      </Tooltip>
      <Tooltip ref={ yPlaneButton } title='Y plane [2]'>
        <ToggleButton
          className='toggleButton'
          value='yplane'
          selected={ state.context.main.yPlaneButton }
          onClick={() => {
              send({ type: 'VIEW_MODE_CHANGED', data: 'YPlane' })
          }}>
          <Icon className='viewModeButton'>
            <img
              style={{ height: '24px', width: '24px' }}
              src={ yellowPlaneIconDataUri }
            />
          </Icon>
        </ToggleButton>
      </Tooltip>
      <Tooltip ref={ zPlaneButton } title='z plane [3]'>
        <ToggleButton
          className='toggleButton'
          value='zplane'
          selected={ state.context.main.zPlaneButton }
          onClick={() => {
              send({ type: 'VIEW_MODE_CHANGED', data: 'ZPlane' })
          }}>
          <Icon className='viewModeButton'>
            <img
              style={{ height: '24px', width: '24px' }}
              src={ greenPlaneIconDataUri }
            />
          </Icon>
        </ToggleButton>
      </Tooltip>
      <Tooltip ref={ volumeButton } title='Volume [4]'>
        <ToggleButton
          className='toggleButton'
          value='volume'
          selected={ state.context.main.volumeButton }
          onClick={() => {
              send({ type: 'VIEW_MODE_CHANGED', data: 'Volume' })
          }}>
          <Icon className='viewModeButton'>
            <img
              style={{ height: '24px', width: '24px' }}
              src={ volumeIconDataUri }
            />
          </Icon>
        </ToggleButton>
      </Tooltip>
    </div>
  )
}

export default ViewModeButtons