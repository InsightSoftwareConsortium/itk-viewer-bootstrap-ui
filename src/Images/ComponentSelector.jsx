import React, { useEffect, useRef } from 'react'
import { useSelector } from '@xstate/react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import '../style.css'
import cn from 'classnames'

function ComponentSelector({ service }) {
  const send = service.send
  const name = useSelector(
    service,
    (state) => state.context.images.selectedName
  )
  const actorContext = useSelector(service, (state) =>
    state.context.images.actorContext.get(name)
  )
  const components = useSelector(
    service,
    (state) =>
      state.context.images.actorContext.get(name).image?.imageType.components
  )

  //re-render when click on check-boxes
  // ideally use shallowEqual as a third entry for useSelector for newer versions
  const componentVisibilitiesLength = useSelector(
    service,
    (state) =>
      state.context.images.actorContext.get(name).componentVisibilities.length
  )

  const componentVisibilities = []

  for (let i = 0; i < componentVisibilitiesLength; i++) {
    componentVisibilities.push(
      useSelector(
        service,
        (state) =>
          state.context.images.actorContext.get(name).componentVisibilities[i]
      )
    )
  }

  // re-render when click on tabs
  const selectedComponent = useSelector(
    service,
    (state) => state.context.images.actorContext.get(name).selectedComponent
  )

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

  const changeComponentVisibility = (idx) => {
    send({
      type: 'SELECT_IMAGE_COMPONENT',
      data: { name, component: idx }
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
      className={`uiRow ${showSelector()} uiSelector`}
      style={{ marginBottom: '0px' }}
    >
      {[...Array(components).keys()].map((value, idx) => (
        <Button
          key={value}
          className={cn('componentTabs', {
            checked: actorContext.selectedComponent === idx
          })}
          onClick={() => {
            changeComponentVisibility(idx)
          }}
          variant="secondary"
        >
          <Form.Group key={value} controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label={idx + 1}
              checked={actorContext.componentVisibilities[idx]}
              onChange={() => {
                toggleSelectedComponents(idx)
              }}
              className="componentCheckbox mb-2 mr-sm-2"
            />
          </Form.Group>
        </Button>
      ))}
    </div>
  )
}

export default ComponentSelector
