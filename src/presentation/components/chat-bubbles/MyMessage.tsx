import React from 'react'

interface Props {
  text: string
}

export const MyMessage: React.FC<Props> = ({ text }) => {
  return (
    <div className='col-start-6 col-end-13 p-3 rounded-lg'>
      <div className='flex items-center justify-start flex-row-reverse'>
        <div className='flex items-center justify-center h-10 w-10 rounded-full bg-indigo-600 flex-shrink-0'>
          F
        </div>
        <div className='relative  mr-3 text-sm bg-indigo-700 pt-3 pb-2 px-4 shadow rounded-xl'>
          <div>{text}</div>
        </div>
      </div>

    </div>
  )
}
