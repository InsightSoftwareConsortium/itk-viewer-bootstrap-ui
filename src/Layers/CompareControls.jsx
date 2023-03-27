import { useSelector } from '@xstate/react'
import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Button, Form, Image, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { rotateIconDataUri } from 'itk-viewer-icons'

const xyz = ['X', 'Y', 'Z']

function CompareControls({ service }) {
  const selectedName = useSelector(
    service,
    (state) => state.context.images.selectedName
  )
  const compare = useSelector(
    service,
    (state) => state.context.images.actorContext.get(selectedName)?.compare
  )

  if (!compare || compare.method === 'disabled') return null

  const updateCompare = (options) => {
    service.send({
      type: 'COMPARE_IMAGES',
      data: {
        name: selectedName,
        fixedImageName: compare.fixedImageName,
        options: { ...compare, ...options }
      }
    })
  }

  const parsePattern = (value) => Math.max(1, parseInt(value))

  return (
    <Col>
      <Row className="compareRow">
        <span style={{ marginRight: '6px' }}>Checkerboard Pattern:</span>
        {compare.pattern.map((value, idx) => (
          <OverlayTrigger
            transition={false}
            overlay={<Tooltip>{`${xyz[idx]} checker count`}</Tooltip>}
            key={xyz[idx]}
          >
            <Form.Control
              className="numberInput"
              type="number"
              value={value}
              onChange={(e) => {
                const newPattern = [...compare.pattern]
                newPattern[idx] = parsePattern(e.target.value)
                updateCompare({ pattern: newPattern })
              }}
              step={1}
            />
          </OverlayTrigger>
        ))}
        <OverlayTrigger
          transition={false}
          overlay={<Tooltip>Swap Image Order</Tooltip>}
        >
          <Button
            className={'icon-button'}
            onClick={() => {
              updateCompare({ swapImageOrder: !compare.swapImageOrder })
            }}
            variant="secondary"
          >
            <Image src={rotateIconDataUri}></Image>
          </Button>
        </OverlayTrigger>
      </Row>
    </Col>
  )
}

export default CompareControls
