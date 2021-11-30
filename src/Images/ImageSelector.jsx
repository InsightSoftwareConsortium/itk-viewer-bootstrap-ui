import { ArrowBack, ArrowForward } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useActor } from '@xstate/react'
import React, { useEffect } from 'react'

function ImageSelector(props) {
  const { service } = props
  const [state] = useActor(service)

  useEffect(async () => {
    state.context.publicAPI = await window.publicAPI
    console.log(state.context)
  }, [window.publicAPI])

  return state.context.publicAPI ? (
    <div className="imageSelector">
      <IconButton
        onClick={() => {
          state.context.publicAPI.setImage(
            new URL(
              'https://data.kitware.com/api/v1/file/564a65d58d777f7522dbfb61/download/data.nrrd'
            )
          )
          console.log(state.context.publicAPI.getImage())
        }}
      >
        <ArrowBack />
      </IconButton>
      <IconButton
        onClick={() => {
          state.context.publicAPI.setImage(
            new URL(
              'https://data.kitware.com/api/v1/file/5b843d468d777f43cc8d4f6b/download/engine.nrrd'
            )
          )
          console.log(state.context.publicAPI.getImage())
        }}
      >
        <ArrowForward />
      </IconButton>
    </div>
  ) : (
    <div />
  )
}

export default ImageSelector
