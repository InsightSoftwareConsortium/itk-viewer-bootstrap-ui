// import React from 'react'
// import { useSelector } from '@xstate/react'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import React, { useEffect, useRef } from 'react'
import { useActor, useSelector } from '@xstate/react'
import { Tabs, Tab } from '@mui/material'
import '../style.css'
import { NavItem } from 'react-bootstrap'
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

  /////////////////////
  const componentRow = useRef(null)
  const componentSelector = useRef(null)
  useEffect(() => {
    service.machine.context.images.componentRow = componentRow.current
    service.machine.context.images.componentSelector = componentSelector.current
  }, [])
  //////////////////////

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

  const changeComponentVisibility = (_e, idx) => {
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
      ref={componentRow}
      className={`uiRow ${showSelector()}`}
      style={{ marginBottom: '0px' }}
    >
      <Tabs
        value={actorContext.selectedComponent}
        onChange={changeComponentVisibility}
      >
        {[...Array(components).keys()].map((idx) => (
          <Tab
            key={idx}
            label={idx}
            //   label={
            //     <FormControlLabel
            //       control={
            //         <Checkbox
            //           checked={actorContext.componentVisibilities[idx]}
            //           onChange={() => {
            //             toggleSelectedComponents(idx)
            //           }}
            //           className="componentCheckbox"
            //         />
            //       }
            //       label={idx + 1}
            //     />
            //   }
          />
        ))}
      </Tabs>
    </div>
  )

  // console.log(name)

  // return (
  //   <div
  //     className={`uiRow ${showSelector()} uiSelector`}
  //     style={{ marginBottom: '0px' }}
  //   >
  //     <Nav
  //       variant="tabs"
  //       value={actorContext.selectedComponent}
  //       className="componentTabs"
  //     >
  //       {[...Array(components).keys()].map((value, idx) => (
  //         <NavItem
  //           key={value}
  //           onSelect={(e, idx) => {
  //             changeComponentVisibility(e, idx)
  //           }}
  //           className={cn('componentTab', {
  //             checked: actorContext.selectedComponent === idx
  //           })}
  //         >
  //           {' '}
  //           <Nav.Link>
  //             <Form.Group controlId="formBasicCheckbox">
  //               <Form.Check
  //                 type="checkbox"
  //                 label={idx + 1}
  //                 checked={actorContext.componentVisibilities[idx]}
  //                 onChange={() => {
  //                   toggleSelectedComponents(idx)
  //                 }}
  //                 className="componentCheckbox mb-2 mr-sm-2"
  //               />
  //             </Form.Group>
  //           </Nav.Link>
  //         </NavItem>
  //       ))}
  //     </Nav>
  //   </div>
  // )
}

export default ComponentSelector
