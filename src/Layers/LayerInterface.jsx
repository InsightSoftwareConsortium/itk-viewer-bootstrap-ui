import React, { useEffect, useState } from 'react'
import { useActor } from '@xstate/react'
import LayerEntry from './LayerEntry'
import { Grid } from '@mui/material'

function LayerInterface(props) {
  const { service } = props
  const [state] = useActor(service)
  const [allLayers, updateLayers] = useState([])

  useEffect(() => {
    if (state.context.layers.lastAddedData) {
      updateLayers([...allLayers, state.context.layers.lastAddedData])
    }
  }, [state.context.layers.lastAddedData])

  return (
    <Grid container>
      <LayerEntry {...props} />
    </Grid>
  )
}

export default LayerInterface
