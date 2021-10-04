import React from 'react'
import { useActor } from '@xstate/react'
import LayerEntry from './LayerEntry'
import { Paper } from '@material-ui/core'

function LayerInterface(props) {
  const { children, service } = props
  const [ state ] = useActor(service)
  const layersUIGroup = state.context.layers.layersUIGroup
  let layerEntry = false

  return(
    <Paper>
      { layersUIGroup &&
        children.map((uiRow) => {
          if (uiRow.children.length < 2) {
            layerEntry = true;
            <LayerEntry { ...props } />
          }
        })
      }
      {!!!layerEntry && (
        <div className='layersUIRow'><LayerEntry { ...props }/></div>)
      }
    </Paper>
  )
}

export default LayerInterface