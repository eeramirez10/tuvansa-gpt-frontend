import React from 'react'
import './TypingLoader.css'

interface Props {
  className?: string
}

export const TypingLoader: React.FC<Props> = ({ className = '' }) => {
  return (
    <div className={`${className} typing`}>
      <span className='circle scaling'></span>
      <span className='circle scaling'></span>
      <span className='circle scaling'></span>

    </div>
  )
}
