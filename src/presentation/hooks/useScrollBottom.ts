
import { useEffect, useRef } from 'react'

export const useScrollBottom = () => {

  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if(ref.current){

      ref.current?.scrollIntoView({ behavior: 'smooth'})
    }
  })

  return ref

}
