import React, { useEffect, useRef } from 'react'
import { useActor } from '@xstate/react'
import { Tabs, Tab, FormControlLabel, Checkbox } from '@mui/material'
import '../style.css'

function ComponentSelector(props) {
  const { service } = props
  const [state, send] = useActor(service)
  const componentRow = useRef(null)
  const componentSelector = useRef(null)

  const name = state.context.images.selectedName
  const actorContext = state.context.images.actorContext.get(name)
  const components = actorContext.image.imageType.components

  useEffect(() => {
    state.context.images.componentRow = componentRow.current
    state.context.images.componentSelector = componentSelector.current
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
