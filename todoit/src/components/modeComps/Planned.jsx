import React, {Fragment} from 'react'
import ModeHeader from '../../Layout/ModeHeader'
import ModeFooter from '../../Layout/ModeFooter'

function Planned() {
  return (
    <Fragment>
    <ModeHeader activeMode={"Tasks"} />
        <h1>Planned </h1>
    <ModeFooter />
    </Fragment>
  )
}

export default Planned
