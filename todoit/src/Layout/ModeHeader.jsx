import React, {Fragment} from 'react'

function ModeHeader({activeMode}) {
  return (
    <Fragment>
    <header className='mode-header'>
        <article className='mode-content'>
            <span>{activeMode}</span> <span>***</span>
        </article>
    </header>
    </Fragment>
  )
}

export default ModeHeader
