import { useSelector } from '@xstate/react'
import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Button, Form, Image, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { rotateIconDataUri } from 'itk-viewer-icons'

const xyz = ['X', 'Y', 'Z']

function CheckerboardControls({ compare, updateCompare }) {
  const parsePattern = (value) => Math.max(1, parseInt(value))

  return (
    <>
      <span style={{ marginRight: '6px' }}>Checkerboard Pattern</span>
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
    </>
  )
}

function ImageMix({ compare, updateCompare }) {
  return (
    <>
      <span style={{ marginRight: '6px' }}>Image Mix</span>
      <Form.Control
        type="range"
        custom
        className="slider"
        min={0}
        max={1}
        value={compare.imageMix}
        step={0.01}
        onChange={(e) => updateCompare({ imageMix: e.target.value })}
      />

      <OverlayTrigger
        transition={false}
        overlay={<Tooltip>Swap Image</Tooltip>}
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
    </>
  )
}

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
        options
      }
    })
  }

  return (
    <Col>
      {compare.checkerboard && (
        <Row className="compareRow">
          <CheckerboardControls
            compare={compare}
            updateCompare={updateCompare}
          />
        </Row>
      )}
      <Row className="compareRow">
        <ImageMix compare={compare} updateCompare={updateCompare} />
      </Row>
    </Col>
  )
}

export default CompareControls
