import clsx from 'clsx'
import {
  MouseEventHandler,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'

const useDraggable = ({
  onDrag = (v: { x: number; y: number }) => ({ x: v.x, y: v.y })
} = {}): [MutableRefObject<unknown>, boolean, MouseEventHandler] => {
  const [pressed, setPressed] = useState(false)
  const position = useRef({ x: 0, y: 0 })
  const ref = useRef()
  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLElement>) => {
    // e.target.style.userSelect = "none";
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
    const handleMouseUp = (e: MouseEvent) => {
      // e.target.style.userSelect = "auto";
      setPressed(false)
    }
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [pressed, onDrag])
  return [ref, pressed, handleMouseDown]
}

export default function Box() {
  const handleDrag = useCallback(
    ({ x, y }: { x: number; y: number }) => ({
      x: Math.max(0, x),
      y: Math.max(0, y)
    }),
    []
  )

  const [ref, pressed, handleMouseDown] = useDraggable({ onDrag: handleDrag })

  return (
    <div
      ref={ref as any}
      className={clsx(
        pressed ? 'border-sky-400 shadow-md' : 'border-sky-300',
        'absolute grid place-content-center rounded-md border-2 bg-sky-200 bg-opacity-50 font-medium text-sky-800'
      )}
      style={{ width: '200px', height: '200px' }}
      onMouseDown={handleMouseDown}
    >
      <p>{'Some Box'}</p>
    </div>
  )
}
