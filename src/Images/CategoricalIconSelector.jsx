import React, { useEffect, useRef } from 'react'
import { useSelector } from '@xstate/react'
import { FormControl, Icon, MenuItem, Select } from '@mui/material'
import CategoricalPresetIcons from '../CategoricalPresetIcons'
import '../style.css'

function CategoricalIconSelector(props) {
  const { service } = props
  const iconSelector = useRef(null)
  const send = service.send
  const selectedName = useSelector(
    service,
    (state) => state.context.images.selectedName
  )
  const actorContext = useSelector(
    service,
    (state) => state.context.images.actorContext
  )

  let catergoricalPresetIcons = []
  CategoricalPresetIcons.forEach((value, key) => {
    catergoricalPresetIcons.push({
      name: key,
      icon: value
    })
  })

  useEffect(() => {
    service.machine.context.images.labelImageIconSelector = iconSelector
  }, [])

  const currentCatergoricalPreset = () => {
    const name = selectedName
    if (actorContext) {
      const actorContext = actorContext.get(name)
      return actorContext.lookupTable
    }
    return ''
  }

  const handleChange = (lut) => {
    const name = selectedName
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
