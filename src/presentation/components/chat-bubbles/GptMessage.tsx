import React from 'react'
import Markdown from 'react-markdown'
import remarkBreaks from 'remark-breaks';

interface Props {
  text: string,
  sql?: string,
  error?: string
  originalPropmt?: string,
  sqlResults?: Record<string, string>[]
}
export const GptMessage: React.FC<Props> = ({ text, sql, originalPropmt, sqlResults, error }) => {
  return (
    <div className='col-start-1 col-end-8 p-3 rounded-lg'>
      <div className='flex flex-row items-start'>
        <div className='flex items-center justify-center h-10 w-10 rounded-full bg-green-600 flex-shrink-0'>
          G
        </div>
        <div className='relative ml-3 text-sm bg-black bg-opacity-25 pt-3 pb-2 px-4 shadow rounded-xl'>
          {


            <>
              <Markdown >{text}</Markdown>
              {sql && <Markdown remarkPlugins={[remarkBreaks]}>{JSON.stringify(sql, null, 2)}</Markdown>}
              {originalPropmt && <Markdown remarkPlugins={[remarkBreaks]}>{JSON.stringify(originalPropmt, null, 2)}</Markdown>}
              {sqlResults && <Markdown remarkPlugins={[remarkBreaks]}>{JSON.stringify(sqlResults, null, 2)}</Markdown>}
              {error && <Markdown remarkPlugins={[remarkBreaks]}>{JSON.stringify(error, null, 2)}</Markdown>}

            </>



          }

        </div>
      </div>

    </div>
  )
}
