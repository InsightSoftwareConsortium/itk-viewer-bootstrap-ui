import React, { useEffect, useRef, useState } from 'react'
import { useActor } from '@xstate/react'
import { Grid, Icon, IconButton } from '@mui/material'
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
  const [allLayers, updateLayers] = useState([])

  useEffect(() => {
    // applyContrastSensitiveStyleToElement(
    //   state.context,
    //   'layerEntry',
    //   layerEntry.current
    // )
  }, [])

  useEffect(() => {
    if (state.context.layers.uiLayers && lastAdded) {
      state.context.layers.uiLayers.set(lastAdded.name, layerEntry.current)
    }
  })

  useEffect(() => {
    if (state.context.layers.lastAddedData) {
      updateLayers([...allLayers, state.context.layers.lastAddedData])
    }
  }, [state.context.layers.lastAddedData])

  const layerVisible = (name) => {
    if (actorContext && lastAdded) {
      if (actorContext.get(name).visible) {
        return 'selectedLayer'
      }
    }
    return ''
  }

  const layerType = (name) => {
    if (actorContext && lastAdded) {
      return actorContext.get(name).type
    }
    return ''
  }

  const layerSelected = (selection) => {
    const visible = layerVisible(selection)
    return visible && selection
  }

  const useColumnSize = (idx) => {
    if (idx % 2 === 0 && idx + 1 === allLayers.length) {
      return 12
    }
    return 6
  }

  return actorContext && allLayers.length ? (
    allLayers.map((layer, idx) => {
      return (
        <Grid
          item
          key={idx}
          xs={useColumnSize(idx)}
          ref={layerEntry}
          className={`layerEntryCommon ${layerVisible(layer.name)}`}
          onClick={() => {
            layerSelected(layer.name)
          }}
        >
          <IconButton
            onClick={() => {
              send({ type: 'TOGGLE_LAYER_VISIBILITY', data: layer.name })
            }}
          >
            <Icon>
              {layerVisible(layer.name) ? (
                <img src={visibleIconDataUri} />
              ) : (
                <img src={invisibleIconDataUri} />
              )}
            </Icon>
          </IconButton>
          <span className="layerLabelCommon"> {layer.name} </span>
          <Icon className="layerIcon">
            {layerType(layer.name) === 'image' ? (
              <img src={imageIconDataUri} />
            ) : (
              layerType(layer.name) === 'labelImage' && (
                <img src={labelsIconDataUri} />
              )
            )}
          </Icon>
        </Grid>
      )
    })
  ) : (
    <div />
  )
}

export default LayerEntry
