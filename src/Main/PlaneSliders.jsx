import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from '@xstate/react'
import {
  visibleIconDataUri,
  invisibleIconDataUri,
  pauseIconDataUri,
  playIconDataUri
} from 'itk-viewer-icons'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Image from 'react-bootstrap/Image'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import cn from 'classnames'
import Badge from 'react-bootstrap/Badge'
import '../style.css'

const PlaneSliders = React.memo(function PlaneSliders(props) {
  const { service } = props
  const state = useSelector(service, (state) => state)
  const send = service.send
  const xVisibility = useRef(null)
  const yVisibility = useRef(null)
  const zVisibility = useRef(null)
  const xScroll = useRef(null)
  const yScroll = useRef(null)
  const zScroll = useRef(null)
  const planeSliders = useRef(null)
  const planes = ['x', 'y', 'z']
  const visRefs = [xVisibility, yVisibility, zVisibility]
  const scrollRefs = [xScroll, yScroll, zScroll]
  const { slicingPlanes, viewMode } = state.context.main
  const [slidersClass, setClass] = useState(0)

  // Resize sliders
  useEffect(() => {
    window.addEventListener('resize', () => getClass())
  }, [])

  // Set buttons and sliders to be at the bottom of the page
  useEffect(() => {
    getClass()
  }, [state.context.uiDrawer?.clientHeight])

  const getClass = () => {
    if (state.context.uiCollapsed) {
      setClass('hidden')
    }
    const containerHeight = state.context.container.clientHeight
    const panelHeight = state.context.uiDrawer?.clientHeight || 0
    const slidersHeight = planeSliders.current?.clientHeight || 0
    const panel_offset =
      state.context.main.collapseUIButton?.parentNode?.clientHeight || 0
    if (containerHeight - (panelHeight + panel_offset) < slidersHeight) {
      setClass('uiSlidersGroupCondensed')
    } else {
      setClass('uiSlidersGroup')
    }
  }

  const toggleVisibility = (plane) => {
    slicingPlanes[`${plane}`].visible = !slicingPlanes[`${plane}`].visible
    send({ type: 'SLICING_PLANES_CHANGED', data: slicingPlanes })
  }

  const togglePlay = (plane) => {
    slicingPlanes[`${plane}`].scroll = !slicingPlanes[`${plane}`].scroll
    if (
      slicingPlanes[`${plane}`].scroll &&
      !slicingPlanes[`${plane}`].visible
    ) {
      toggleVisibility(plane)
    }
    send({ type: 'SLICING_PLANES_CHANGED', data: slicingPlanes })
  }

  const handleSliderChange = (plane, val) => {
    send({
      type: `${plane.toUpperCase()}_SLICE_CHANGED`,
      data: Number(val)
    })
  }

  const sliderVisible = (plane) => {
    const isVolume = viewMode === 'Volume' && !state.context.use2D
    const planeVisible = viewMode === `${plane.toUpperCase()}Plane`
    if (!isVolume && !planeVisible) {
      return 'hidden'
    }
    return ''
  }

  return (
    <div ref={planeSliders} className={slidersClass}>
      {planes.map((plane, idx) => {
        return state.context.main[`${plane}Slice`] ? (
          <div
            key={plane.toUpperCase()}
            className={`planeSliders ${sliderVisible(plane)}`}
          >
            {/* Display visibility button */}
            <OverlayTrigger
              transition={false}
              overlay={
                <Tooltip>{plane.toUpperCase()} Plane Visibility</Tooltip>
              }
            >
              <Button
                className={cn('icon-button', {
                  checked: true
                })}
                onClick={(_e) => {
                  toggleVisibility(plane)
                }}
                variant="secondary"
                ref={visRefs[idx]} // not sure if I need this
              >
                {slicingPlanes[`${plane}`].visible ? (
                  <Image src={visibleIconDataUri}></Image>
                ) : (
                  <Image src={invisibleIconDataUri}></Image>
                )}
              </Button>
            </OverlayTrigger>
            {/* Display play/pause button */}
            <OverlayTrigger
              transition={false}
              overlay={
                <Tooltip>{`${plane.toUpperCase()} Plane Toggle Scroll`}</Tooltip>
              }
            >
              <Button
                className={cn('icon-button', {
                  checked: true
                })}
                onClick={(_e) => {
                  togglePlay(plane)
                }}
                variant="secondary"
                ref={scrollRefs[idx]} // not sure I need this
              >
                {slicingPlanes[`${plane}`].scroll ? (
                  <Image src={pauseIconDataUri}></Image>
                ) : (
                  <Image src={playIconDataUri}></Image>
                )}
              </Button>
            </OverlayTrigger>
            {/* Display Plane position */}
            <Badge bg="secondary">
              {' '}
              {plane.toUpperCase()}:
              {state.context.main[`${plane}Slice`]?.toFixed(3)}
            </Badge>
            {/* Display sliders */}
            <Form>
              <Form.Group>
                {/* controlId="formBasicRangeCustom" */}
                <Form.Control
                  type="range"
                  custom
                  min={slicingPlanes[`${plane}`].min}
                  max={slicingPlanes[`${plane}`].max}
                  step={slicingPlanes[`${plane}`].step}
                  onChange={(_e, val) => {
                    handleSliderChange(plane, _e.target.value)
                  }}
                />
              </Form.Group>
            </Form>
          </div>
        ) : (
          <div key={plane.toUpperCase() + 'hidden'} />
        )
      })}
    </div>
  )
})

export default PlaneSliders
