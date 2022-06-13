import React, { useEffect, useRef } from 'react'
import { useSelector } from '@xstate/react'
import { Tabs, Tab, FormControlLabel, Checkbox } from '@mui/material'
import '../style.css'

function ComponentSelector(props) {
  const { service } = props
  const send = service.send
  const componentRow = useRef(null)
  const componentSelector = useRef(null)
  const actorContextName = useSelector(service, (state) =>
    state.context.images.actorContext.get(state.context.images.selectedName)
  )

  const name = useSelector(
    service,
    (state) => state.context.images.selectedName
  )
  const actorContext = actorContextName
  const components = actorContext.image.imageType.components

  useEffect(() => {
    service.machine.context.images.componentRow = componentRow.current
    service.machine.context.images.componentSelector = componentSelector.current
  }, [])

  const changeComponentVisibility = (_e, idx) => {
    send({
      type: 'SELECT_IMAGE_COMPONENT',
      data: { name, component: idx }
    })
  }

  const toggleSelectedComponents = (idx) => {
    send({
      type: 'IMAGE_COMPONENT_VISIBILITY_CHANGED',
      data: {
        name,
        component: idx,
        visibility: !actorContext.componentVisibilities[idx]
      }
    })
  }

  const showSelector = () => {
    if (components > 1 && actorContext.independentComponents) {
      return ''
    }
    return 'hidden'
  }

  return (
    <div
      ref={componentRow}
      className={`uiRow ${showSelector()}`}
      style={{ marginBottom: '0px' }}
    >
      <Tabs
        value={actorContext.selectedComponent}
        onChange={changeComponentVisibility}
      >
        {[...Array(components).keys()].map((idx) => (
          <Tab
            key={idx}
            label={
              <FormControlLabel
                control={
                  <Checkbox
                    checked={actorContext.componentVisibilities[idx]}
                    onChange={() => {
                      toggleSelectedComponents(idx)
                    }}
                    className="componentCheckbox"
                  />
                }
                label={idx + 1}
              />
            }
          />
        ))}
      </Tabs>
    </div>
  )
}

export default ComponentSelector
