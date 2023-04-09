import React, { useState } from 'react'
import { useSelector } from '@xstate/react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import '../style.css'
import cn from 'classnames'
import { arraysEqual } from '../utils'
import classNames from 'classnames'

function ComponentSelector({ service }) {
  const send = service.send
  const name = useSelector(
    service,
    (state) => state.context.images.selectedName
  )
  const actorContext = useSelector(service, (state) =>
    state.context.images.actorContext.get(name)
  )

  const componentVisibilities = useSelector(
    service,
    (state) =>
      state.context.images.actorContext.get(name).componentVisibilities,
    arraysEqual
  )

  const selectedComponent = useSelector(
    service,
    (state) => state.context.images.actorContext.get(name).selectedComponent
  )

  // Somehow componentVisibilities is not catching the diff.  Force render.
  const [, bumpState] = useState()

  const toggleComponentVisibility = (idx) => {
    send({
      type: 'IMAGE_COMPONENT_VISIBILITY_CHANGED',
      data: {
        name,
        component: idx,
        visibility: !componentVisibilities[idx]
      }
    })
    bumpState({}) // hax
  }

  const selectComponent = (idx) => {
    send({
      type: 'SELECT_IMAGE_COMPONENT',
      data: { name, component: idx }
    })
  }

  const hideComponentRow =
    componentVisibilities.length <= 1 && actorContext.independentComponents

  return (
    <div
      className={classNames({ hidden: hideComponentRow }, 'uiSelector')}
      style={{ marginBottom: '0px' }}
    >
      {componentVisibilities.map((isSelected, idx) => (
        <Button
          key={idx}
          className={cn('componentTabs', {
            checked: selectedComponent === idx
          })}
          onClick={() => {
            selectComponent(idx)
          }}
          variant="secondary"
        >
          <Form.Group>
            <Form.Check
              type="checkbox"
              label={idx + 1}
              checked={isSelected}
              onChange={() => {
                toggleComponentVisibility(idx)
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
