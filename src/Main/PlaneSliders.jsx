import React, { useEffect, useRef, useState } from 'react'
import { useActor } from '@xstate/react'
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

const PlaneSliders = React.memo(function PlaneSliders(props) {
  const { service } = props
  const [state, send] = useActor(service)
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

  //console.log('not sure what this is, uiCollapsed=', state.context.uiCollapsed)

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
      data: val
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

  const [value, setValue] = React.useState(50)

  return (
    <div ref={planeSliders} className={slidersClass}>
      {planes.map((plane, idx) => {
        return state.context.main[`${plane}Slice`] ? (
          <div
            key={plane.toUpperCase()}
            className={`planeSliders ${sliderVisible(plane)}`}
          >
            <OverlayTrigger
              transition={false}
              overlay={<Tooltip>Plane visibility</Tooltip>}
            >
              <Button
                className={cn('icon-button', {
                  checked: true
                })}
                onClick={(_e) => {
                  toggleVisibility(plane)
                }}
                variant="secondary"
              >
                <Image src={visibleIconDataUri}></Image>
                {/* ref={visRefs[idx]} */}
              </Button>
            </OverlayTrigger>
            <OverlayTrigger
              transition={false}
              overlay={<Tooltip>Test!</Tooltip>}
            >
              <Button
                className={cn('icon-button', {
                  checked: true
                })}
                onClick={(_e) => {
                  togglePlay(plane)
                }}
                variant="secondary"
              >
                {slicingPlanes[`${plane}`].scroll ? (
                  <Image src={pauseIconDataUri}></Image>
                ) : (
                  <Image src={playIconDataUri}></Image>
                )}
              </Button>
            </OverlayTrigger>
            <Form>
              <Form.Group controlId="formBasicRangeCustom">
                <Form.Label>Range</Form.Label>
                <Form.Control
                  type="range"
                  custom
                  min={slicingPlanes[`${plane}`].min}
                  max={slicingPlanes[`${plane}`].max}
                  step={slicingPlanes[`${plane}`].step}
                  value={state.context.main[`${plane}Slice`]}
                  onChange={(_e, val) => {
                    handleSliderChange(plane, val)
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
