import React, { useEffect, useRef } from 'react'
import { useActor } from '@xstate/react'
import { Icon, IconButton } from '@mui/material'
import {
  visibleIconDataUri,
  invisibleIconDataUri,
  imageIconDataUri,
  labelsIconDataUri
} from 'itk-viewer-icons'
import applyContrastSensitiveStyleToElement from '../applyContrastSensitiveStyleToElement'
import '../style.css'

function LayerEntry(props) {
  const { service } = props
  const layerEntry = useRef(null)
  const [state, send] = useActor(service)
  const lastAdded = state.context.layers.lastAddedData
  const actorContext = state.context.layers.actorContext

  useEffect(() => {
    applyContrastSensitiveStyleToElement(
      state.context,
      'layerEntry',
      layerEntry.current
    )
  }, [])

  useEffect(() => {
    if (state.context.layers.uiLayers && lastAdded) {
      state.context.layers.uiLayers.set(lastAdded.name, layerEntry.current)
    }
  })

  const layerVisible = () => {
    if (actorContext && lastAdded) {
      return actorContext.get(lastAdded.name).visible
    }
    return false
  }

  const layerType = () => {
    if (actorContext && lastAdded) {
      return actorContext.get(lastAdded.name).type
    }
    return ''
  }

  const layerSelected = () => {
    const selection = state.context.images.selectedName
    const selected = selection === lastAdded.name
    const visible = layerVisible()
    return visible && selection
  }

  return actorContext && lastAdded ? (
    <div
      ref={layerEntry}
      className={`layerEntryCommon ${layerVisible() && 'selectedLayer'}`}
      onClick={() => {
        layerSelected(lastAdded.name)
      }}
    >
      <IconButton
        onClick={() => {
          send({ type: 'TOGGLE_LAYER_VISIBILITY', data: lastAdded.name })
        }}
      >
        <Icon>
          {layerVisible() ? (
            <img src={visibleIconDataUri} />
          ) : (
            <img src={invisibleIconDataUri} />
          )}
        </Icon>
      </IconButton>
      <span className="layerLabelCommon"> {lastAdded.name} </span>
      <Icon className="layerIcon">
        {layerType() === 'image' ? (
          <img src={imageIconDataUri} />
        ) : (
          layerType() === 'labelImage' && <img src={labelsIconDataUri} />
        )}
      </Icon>
    </div>
  ) : (
    <div />
  )
}

export default LayerEntry
