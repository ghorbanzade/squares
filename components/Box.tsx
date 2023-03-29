import useWindowDimensions from '@/hooks/useWindowDimensions'
import clsx from 'clsx'
import {
  MouseEventHandler,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'

export interface BoxProps {
  id: number
  x: number
  y: number
  w: number
  h: number
  update: (pos: BoxProps) => void
}

const useDraggable = ({
  onDrag = (v: { x: number; y: number }) => ({ x: v.x, y: v.y })
} = {}): [MutableRefObject<unknown>, boolean, MouseEventHandler] => {
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
    const handleMouseUp = (e: MouseEvent) => {
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

export default function Box({ data }: { data: BoxProps }) {
  const { width, height } = useWindowDimensions()
  const handleDrag = useCallback(({ x, y }: { x: number; y: number }) => {
    const out = {
      ...data,
      x: Math.min(Math.max(0, x), width - data.w - 32 - 32),
      y: Math.min(Math.max(0, y), height - data.h - 96 - 32)
    }
    data.update(out)
    return out
  }, [])

  const [ref, pressed, handleMouseDown] = useDraggable({ onDrag: handleDrag })

  return (
    <div
      ref={ref as any}
      className={clsx(
        pressed
          ? 'cursor-grabbing border-sky-400 shadow-md'
          : 'cursor-grab border-sky-300',
        'absolute grid select-none place-content-center rounded-md border-2 bg-sky-200 bg-opacity-50 text-sky-800'
      )}
      style={{ width: `${data.w}px`, height: `${data.h}px` }}
      onMouseDown={handleMouseDown}
    >
      <span className="font-medium">Box {data.id + 1}</span>
    </div>
  )
}
