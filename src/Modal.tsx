import { useEffect, useRef, FunctionComponent, MutableRefObject } from "react"
import { createPortal } from "react-dom"

const Modal: FunctionComponent = ({children}) => {

  const elRef: MutableRefObject<HTMLDivElement | null> = useRef(null)
  if(!elRef.current) {
    elRef.current = document.createElement('div')
  }

  useEffect(() => {
    const modalRoot = document.querySelector('#modal')
    if(!modalRoot || !elRef.current) return
    modalRoot.appendChild(elRef.current)
    // if we return something in useEffect
    // it will trigger when component unmount!
    // usually use for memory leak such as remove dom or stop timer
    return () => {
      if(!elRef.current) return
      modalRoot.removeChild(elRef.current)
    }
  }, [])

  return createPortal(<div>{children}</div>, elRef.current)

}

export default Modal

