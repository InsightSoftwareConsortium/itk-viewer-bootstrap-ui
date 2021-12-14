import React, { useEffect, useRef } from 'react'
import { useActor } from '@xstate/react'
import { FormControl, MenuItem, Select } from '@mui/material'
import '../style.css'

function MapWeightSelector(props) {
  const { service } = props
  const labelImageWeightUIGroup = useRef(null)
  const labelSelector = useRef(null)
  const [state, send] = useActor(service)

  let labelMapWeights = [{ name: 'All', value: 'all' }]
  const name = state.context.images.selectedName
  const actorContext = state.context.images.actorContext.get(name)
  actorContext.labelNames.forEach((value, key) => {
    labelMapWeights.push({
      name: value,
      value: key
    })
  })

  useEffect(() => {
    state.context.images.labelImageWeightUIGroup =
      labelImageWeightUIGroup.current
    state.context.images.labelSelector = labelSelector.current
  }, [])

  const currentMapWeight = () => {
    const name = state.context.images.selectedName
    if (state.context.images.actorContext) {
      const actorContext = state.context.images.actorContext.get(name)
      return actorContext.selectedLabel
    }
    return ''
  }

  const handleChange = (label) => {
    const name = state.context.images.selectedName
    send({
      type: 'LABEL_IMAGE_SELECTED_LABEL_CHANGED',
      data: { name, selectedLabel: label }
    })
  }

  return (
    <div ref={labelImageWeightUIGroup} className="uiGroup">
      <div className="uiRow">
        <FormControl
          variant="outlined"
          size="small"
          ref={labelSelector}
          style={{ margin: '0 5px' }}
        >
          <Select
            value={currentMapWeight()}
            style={{ height: '40px' }}
            onChange={(e) => {
              handleChange(e.target.value)
            }}
            MenuProps={{
              anchorEl: labelSelector.current,
              disablePortal: true,
              keepMounted: true,
              classes: { root: 'categoricalRoot', list: 'categoricalMenu' }
            }}
          >
            {labelMapWeights.map((weight, idx) => (
              <MenuItem
                key={idx}
                value={weight.value}
                style={{ minWidth: '100%' }}
              >
                {weight.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  )
}

export default MapWeightSelector
