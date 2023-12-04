import { useSelector } from '@xstate/react'
import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Button, Form, Image, OverlayTrigger, Tooltip } from 'react-bootstrap'
import {
  rotateIconDataUri,
  playIconDataUri,
  pauseIconDataUri
} from '@itk-viewer/icons'

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

function ImageMix({ compare, updateCompare, service, selectedName }) {
  const imageMixAnimation = useSelector(
    service,
    (state) =>
      state.context.images.actorContext.get(selectedName)?.imageMixAnimation
  )

  const animationIcon = imageMixAnimation ? pauseIconDataUri : playIconDataUri
  const animateHandler = () =>
    service.send({
      type: 'ANIMATE_IMAGE_MIX',
      data: {
        name: selectedName,
        play: !imageMixAnimation
      }
    })

  const imageMix = compare.imageMix ?? 0.5 // fallback to keep a controlled component
  return (
    <>
      <span>Image Mix</span>

      <OverlayTrigger
        transition={false}
        overlay={<Tooltip>Swap Image</Tooltip>}
      >
        <Button
          className={'icon-button'}
          onClick={animateHandler}
          variant="secondary"
        >
          <Image src={animationIcon}></Image>
        </Button>
      </OverlayTrigger>

      <Form.Control
        type="range"
        custom
        className="slider"
        min={0}
        max={1}
        value={imageMix}
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

  if (!compare || !compare.method || compare.method === 'disabled') return null

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
        <ImageMix
          compare={compare}
          updateCompare={updateCompare}
          service={service}
          selectedName={selectedName}
        />
      </Row>
    </Col>
  )
}

export default CompareControls
