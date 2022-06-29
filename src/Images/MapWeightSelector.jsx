import React from 'react'
import { useSelector } from '@xstate/react'
import Form from 'react-bootstrap/Form'
import '../style.css'

const ALL_LABELS = { name: 'All', value: 'all' }

function MapWeightSelector({ service }) {
  const send = service.send
  const name = useSelector(
    service,
    (state) => state.context.images.selectedName
  )
  const labelNames = useSelector(
    service,
    (state) =>
      state.context.images.actorContext.get(state.context.images.selectedName)
        .labelNames
  )
  const selectedLabel = useSelector(
    service,
    (state) =>
      state.context.images.actorContext.get(state.context.images.selectedName)
        .selectedLabel
  )

  const labelsAsOptions = Array.from(labelNames).map(([key, name]) => ({
    name,
    value: key
  }))

  const labelOptions = [ALL_LABELS, ...labelsAsOptions]

  const handleChange = (event) => {
    const value = event.target.value
    const selectedLabel = value === 'all' ? value : Number(value)
    send({
      type: 'LABEL_IMAGE_SELECTED_LABEL_CHANGED',
      data: { name, selectedLabel }
    })
  }

  return (
    <div className="uiGroup">
      <div className="uiRow">
        <Form.Control
          as="select"
          value={selectedLabel}
          onChange={(e) => {
            handleChange(e)
          }}
        >
          {labelOptions.map((weight, idx) => (
            <option key={idx} value={weight.value}>
              {weight.name}
            </option>
          ))}
        </Form.Control>
      </div>
    </div>
  )
}

export default MapWeightSelector
