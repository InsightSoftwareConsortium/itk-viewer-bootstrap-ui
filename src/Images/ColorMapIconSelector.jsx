import React, { useEffect, useRef } from 'react'
import { useActor } from '@xstate/react'
import { FormControl, Icon, MenuItem, Select } from '@mui/material'
import ColorMapPresetIcons from '../ColorMapPresetIcons'
import '../style.css'

function ColorMapIconSelector(props) {
  const { service } = props
  const iconSelector = useRef(null)
  const [state, send] = useActor(service)
  let colorMapIcons = []
  ColorMapPresetIcons.forEach((value, key) => {
    colorMapIcons.push({
      name: key,
      icon: value
    })
  })

  useEffect(() => {
    state.context.images.iconSelector = iconSelector.current
  }, [])

  const currentColorMap = () => {
    const name = state.context.images.selectedName
    if (state.context.images.actorContext) {
      const actorContext = state.context.images.actorContext.get(name)
      const component = actorContext.selectedComponent
      const lookupTableProxies = state.context.images.lookupTableProxies
      if (lookupTableProxies) {
        return lookupTableProxies.get(component).getPresetName()
      }
    }
    return ''
  }

  const handleChange = (colorMap) => {
    const name = state.context.images.selectedName
    const actorContext = state.context.images.actorContext.get(name)
    const componentIndex = actorContext.selectedComponent
    send({
      type: 'IMAGE_COLOR_MAP_CHANGED',
      data: { name, component: componentIndex, colorMap }
    })
  }

  return (
    <FormControl
      variant="outlined"
      size="small"
      ref={iconSelector}
      style={{ width: 'auto', margin: '0 5px' }}
    >
      <Select
        value={currentColorMap()}
        style={{ height: '40px' }}
        onChange={(e) => {
          handleChange(e.target.value)
        }}
        MenuProps={{
          anchorEl: iconSelector.current,
          disablePortal: true,
          keepMounted: true,
          classes: { list: 'cmapMenu' }
        }}
      >
        {colorMapIcons.map((preset, idx) => (
          <MenuItem key={idx} value={preset.name}>
            <Icon style={{ width: 'inherit' }}>
              <img className="colorMapIcon" src={preset.icon} />
            </Icon>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default ColorMapIconSelector
