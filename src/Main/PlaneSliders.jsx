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

function PlaneSliders(props) {
  const { service } = props
  const stateContextMain = useSelector(service, (state) => state.context.main)
  //Change to 2D views
  const stateContextMainXSlice = useSelector(
    service,
    (state) => state.context.main[`xSlice`]
  )
  const stateContextMainYSlice = useSelector(
    service,
    (state) => state.context.main[`ySlice`]
  )
  const stateContextMainZSlice = useSelector(
    service,
    (state) => state.context.main[`zSlice`]
  )

  const stateContextUiDrawer = useSelector(
    service,
    (state) => state.context.uiDrawer
  )
  const stateContextUiCollapsed = useSelector(
    service,
    (state) => state.context.uiCollapsed
  )
  const stateContextUse2D = useSelector(service, (state) => state.context.use2D)
  const stateContextContainerClientHeight = useSelector(
    service,
    (state) => state.context.container.clientHeight
  )

  // Make visibility button change
  const xVisible = useSelector(
    service,
    (state) => state.context.main.slicingPlanes[`x`].visible
  )
  const yVisible = useSelector(
    service,
    (state) => state.context.main.slicingPlanes[`y`].visible
  )
  const zVisible = useSelector(
    service,
    (state) => state.context.main.slicingPlanes[`z`].visible
  )
  // Make pause button change
  const xxcroll = useSelector(
    service,
    (state) => state.context.main.slicingPlanes[`x`].scroll
  )
  const yycroll = useSelector(
    service,
    (state) => state.context.main.slicingPlanes[`y`].scroll
  )
  const zzcroll = useSelector(
    service,
    (state) => state.context.main.slicingPlanes[`z`].scroll
  )

  // const slicingPlanes = useSelector(
  // service,
  // (state) => state.context.main.slicingPlanes
  // )

  //Re-render so sliders disappear when we go to 2D mode
  const viewMode = useSelector(service, (state) => state.context.main.viewMode)
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
  const { slicingPlanes } = stateContextMain
  const [slidersClass, setClass] = useState(0)

  console.log(slicingPlanes[`x`].visible)

  useEffect(() => {
    const onResize = () => getClass()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener(onResize)
  }, [])

  useEffect(() => {
    getClass()
  }, [stateContextUiDrawer?.clientHeight])

  const getClass = () => {
    if (stateContextUiCollapsed) {
      setClass('hiddenSlider')
    }
    const containerHeight = stateContextContainerClientHeight
    const panelHeight = stateContextUiDrawer?.clientHeight || 0
    const slidersHeight = planeSliders.current?.clientHeight || 0
    const panel_offset =
      stateContextMain.collapseUIButton?.parentNode?.clientHeight || 0
    if (containerHeight - (panelHeight + panel_offset) < slidersHeight) {
      setClass('uiSlidersGroupCondensed')
    } else {
      setClass('uiSlidersGroup')
    }
  }

  const toggleVisibility = (plane) => {
    slicingPlanes[plane].visible = !slicingPlanes[plane].visible
    send({ type: 'SLICING_PLANES_CHANGED', data: slicingPlanes })
  }

  const togglePlay = (plane) => {
    slicingPlanes[plane].scroll = !slicingPlanes[plane].scroll
    if (slicingPlanes[plane].scroll && !slicingPlanes[plane].visible) {
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
    const isVolume = viewMode === 'Volume' && !stateContextUse2D
    const planeVisible = viewMode === `${plane.toUpperCase()}Plane`
    if (!isVolume && !planeVisible) {
      return 'hiddenSlider'
    }
    return ''
  }

  return (
    <div ref={planeSliders} className={slidersClass}>
      {planes.map((plane, idx) => {
        return stateContextMain[`${plane}Slice`] ? (
          <div key={plane.toUpperCase()}>
            <div className="input-group">
              <OverlayTrigger
                transition={false}
                overlay={
                  <Tooltip>{plane.toUpperCase()} Plane Visibility</Tooltip>
                }
              >
                <Button
                  className={cn(
                    `icon-button ${
                      viewMode !== 'Volume' ? 'hiddenSlider' : ''
                    }`,
                    {
                      checked: slicingPlanes[plane].visible
                    }
                  )}
                  onClick={(_e) => {
                    toggleVisibility(plane)
                  }}
                  variant="secondary"
                  ref={visRefs[idx]}
                >
                  {slicingPlanes[plane].visible ? (
                    <Image src={visibleIconDataUri}></Image>
                  ) : (
                    <Image src={invisibleIconDataUri}></Image>
                  )}
                </Button>
              </OverlayTrigger>
              <OverlayTrigger
                transition={false}
                overlay={
                  <Tooltip>{`${plane.toUpperCase()} Plane Toggle Scroll`}</Tooltip>
                }
              >
                <Button
                  className={cn(
                    `icon-button ${
                      viewMode !== `${plane.toUpperCase()}Plane` &&
                      viewMode !== 'Volume'
                        ? 'hiddenSlider'
                        : ''
                    }`,
                    {
                      checked: slicingPlanes[plane].scroll
                    }
                  )}
                  onClick={(_e) => {
                    togglePlay(plane)
                  }}
                  variant="secondary"
                  ref={scrollRefs[idx]}
                >
                  {slicingPlanes[plane].scroll ? (
                    <Image src={pauseIconDataUri}></Image>
                  ) : (
                    <Image src={playIconDataUri}></Image>
                  )}
                </Button>
              </OverlayTrigger>
              <Badge
                className={`labelBadge ${plane}badge ${
                  viewMode !== `${plane.toUpperCase()}Plane` &&
                  viewMode !== 'Volume'
                    ? 'hiddenSlider'
                    : ''
                }`}
                bg="secondary"
              >
                {plane.toUpperCase()}:{' '}
                {stateContextMain[`${plane}Slice`]?.toPrecision(4)}
              </Badge>
              <div
                key={plane.toUpperCase()}
                className={`planeSliders ${sliderVisible(plane)}`}
              >
                <Form.Control
                  type="range"
                  custom
                  min={slicingPlanes[plane].min}
                  max={slicingPlanes[plane].max}
                  value={stateContextMain[`${plane}Slice`]}
                  step={slicingPlanes[plane].step}
                  onChange={(_e) => {
                    handleSliderChange(plane, _e.target.value)
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div key={plane.toUpperCase() + 'hiddenSlider'} />
        )
      })}
    </div>
  )
}

export default PlaneSliders
