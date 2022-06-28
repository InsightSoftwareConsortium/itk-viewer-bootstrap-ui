import React from 'react'
import { useSelector } from '@xstate/react'
import Form from 'react-bootstrap/Form'
import '../style.css'

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
    <div className={`uiRow ${showSelector()}`} style={{ marginBottom: '0px' }}>
      {[...Array(components).keys()].map((value, idx) => (
        <Form key={value}>
          <Form.Group controlId="formBasicCheckbox">
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
        </Form>
      ))}
    </div>
  )
}

export default ComponentSelector
