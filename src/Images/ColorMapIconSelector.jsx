import React, { useEffect, useRef } from 'react'
import { useSelector } from '@xstate/react'
import { FormControl, Icon, MenuItem, Select, Tooltip } from '@mui/material'
import ColorMapPresetIcons from '../ColorMapPresetIcons'
import '../style.css'

function ColorMapIconSelector(props) {
  const { service } = props
  const iconSelector = useRef(null)
  const send = service.send
  const selectedName = useSelector(
    service,
    (state) => state.context.images.selectedName
  )
  const actorContextName = useSelector(service, (state) =>
    state.context.images.actorContext.get(state.context.images.selectedName)
  )
  const actorContext = useSelector(
    service,
    (state) => state.context.images.actorContext
  )
  const imagesLookupTableProxies = useSelector(
    service,
    (state) => state.context.images.lookupTableProxies
  )
  let colorMapIcons = []
  ColorMapPresetIcons.forEach((value, key) => {
    colorMapIcons.push({
      name: key,
      icon: value,
      ref: useRef(null)
    })
  })

  useEffect(() => {
    service.machine.context.images.iconSelector = iconSelector.current
  }, [])

  const currentColorMap = () => {
    if (actorContext) {
      const actorContext = actorContextName
      const component = actorContext.selectedComponent
      const lookupTableProxies = imagesLookupTableProxies
      if (lookupTableProxies) {
        return lookupTableProxies.get(component).getPresetName()
      }
    }
    return ''
  }

  const handleChange = (colorMap) => {
    const name = selectedName
    const actorContext = actorContextName
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
            <Tooltip
              ref={preset.ref}
              title={preset.name}
              placement="bottom"
              PopperProps={{
                anchorEl: preset.ref.current,
                disablePortal: true,
                keepMounted: true
              }}
            >
              <Icon style={{ width: 'inherit' }}>
                <img className="colorMapIcon" src={preset.icon} />
              </Icon>
            </Tooltip>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default ColorMapIconSelector
