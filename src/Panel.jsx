import React, { useEffect, useRef } from 'react'
import { useSelector } from '@xstate/react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Collapse } from 'react-bootstrap'
import './Panel.css'

function Panel(props) {
  const { children, service } = props
  const uiPanel = useRef(null)
  const uiDrawer = useRef(null)
  let stateContextUIDrawer = useSelector(
    service,
    (state) => state.context.uiDrawer
  )
  let stateContextUIPanel = useSelector(
    service,
    (state) => state.context.uiPanel
  )
  const uiCollapsed = useSelector(service, (state) => state.context.uiCollapsed)

  useEffect(() => {
    stateContextUIPanel = uiPanel.current
    stateContextUIDrawer = uiDrawer.current
  }, [])

  return (
    <div ref={uiPanel} className="root">
      <Collapse in={!uiCollapsed}>
        <Container fluid>
          <Row>
            <Col xs={2} id="sidebar-wrapper">
              <>
                <Nav
                  className=" drawer"
                  onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
                >
                  <div className="sidebar-sticky"></div>
                  <Nav.Item>
                    <div ref={uiDrawer}>
                      {React.Children.map(children, (child) => {
                        return React.cloneElement(child, { service })
                      })}
                    </div>
                  </Nav.Item>
                </Nav>
              </>
            </Col>
          </Row>
        </Container>
      </Collapse>
    </div>
  )
}

export default Panel
