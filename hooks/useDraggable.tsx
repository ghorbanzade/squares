// SPDX-License-Identifier: Apache-2.0

import {
  MouseEventHandler,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'

export default function useDraggable({
  onDrag = (v: { x: number; y: number }) => ({ x: v.x, y: v.y })
} = {}): [MutableRefObject<unknown>, boolean, MouseEventHandler] {
  const [pressed, setPressed] = useState(false)
  const position = useRef({ x: 0, y: 0 })
  const ref = useRef()
  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLElement>) => {
    setPressed(true)
  }, [])

  useEffect(() => {
    if (!pressed) {
      return
    }
    const handleMouseMove = (event: MouseEvent) => {
      if (!ref.current || !position.current) {
        return
      }
      const pos = position.current
      const elem: any = ref.current
      position.current = onDrag({
        x: pos.x + event.movementX,
        y: pos.y + event.movementY
      })
      elem.style.transform = `translate(${pos.x}px, ${pos.y}px)`
    }
    const handleMouseUp = () => setPressed(false)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [pressed, onDrag])
  return [ref, pressed, handleMouseDown]
}
