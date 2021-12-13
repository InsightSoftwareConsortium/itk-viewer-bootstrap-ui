import React, { useEffect, useRef } from 'react'
import { useActor } from '@xstate/react'
import { FormControl, Icon, MenuItem, Select } from '@mui/material'
import CategoricalPresetIcons from '../CategoricalPresetIcons'
import '../style.css'

function CategoricalIconSelector(props) {
  const { service } = props
  const iconSelector = useRef(null)
  const [state, send] = useActor(service)

  let catergoricalPresetIcons = []
  CategoricalPresetIcons.forEach((value, key) => {
    catergoricalPresetIcons.push({
      name: key,
      icon: value
    })
  })

  useEffect(() => {
    state.context.images.labelImageIconSelector = iconSelector
  }, [])

  const currentCatergoricalPreset = () => {
    const name = state.context.images.selectedName
    if (state.context.images.actorContext) {
      const actorContext = state.context.images.actorContext.get(name)
      return actorContext.lookupTable
    }
    return ''
  }

  const handleChange = (lut) => {
    const name = state.context.images.selectedName
    send({
      type: 'LABEL_IMAGE_LOOKUP_TABLE_CHANGED',
      data: { name, lookupTable: lut }
    })
  }

  return (
    <FormControl
      variant="outlined"
      size="small"
      ref={iconSelector}
      style={{ width: '154px', margin: '0 5px' }}
    >
      <Select
        value={currentCatergoricalPreset()}
        style={{ height: '40px' }}
        onChange={(e) => {
          handleChange(e.target.value)
        }}
        MenuProps={{
          anchorEl: iconSelector.current,
          disablePortal: true,
          keepMounted: true,
          classes: { list: 'categoricalMenu' }
        }}
      >
        {catergoricalPresetIcons.map((preset, idx) => (
          <MenuItem key={idx} value={preset.name} style={{ minWidth: '100%' }}>
            <Icon style={{ width: '100%' }}>
              <img className="colorMapIcon" src={preset.icon} />
            </Icon>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default CategoricalIconSelector
