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

  // do not store position in useState! even if you useEffect on
  // it and update `transform` CSS property, React still rerenders
  // on every state change, and it LAGS
  const position = useRef({ x: 0, y: 0 })
  const ref = useRef()

  // handlers must be wrapped into `useCallback`. even though
  // resubscribing to `mousedown` on every tick is quite cheap
  // due to React's event system, `handleMouseDown` might be used
  // in `deps` argument of another hook, where it would really matter.
  // as you never know where return values of your hook might end up,
  // it's just generally a good idea to ALWAYS use `useCallback`
  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLElement>) => {
    // don't forget to disable text selection during drag and drop
    // operations
    // e.target.style.userSelect = "none";
    setPressed(true)
  }, [])

  useEffect(() => {
    if (!pressed) {
      return
    }
    // subscribe to mousemove only when pressed, otherwise it will lag
    // even when you're not dragging
    // TODO: updating the page without any throttling is a bad idea
    // requestAnimationFrame-based throttle would probably be fine,
    // but be aware that naive implementation might make element
    // lag 1 frame behind cursor, and it will appear to be lagging
    // even at 60 FPS
    const handleMouseMove = (event: MouseEvent) => {
      if (!ref.current || !position.current) {
        return
      }
      const pos = position.current
      // it's important to save it into variable here,
      // otherwise we might capture reference to an element
      // that was long gone. not really sure what's correct
      // behavior for a case when you've been scrolling, and
      // the target element was replaced. probably some formulae
      // needed to handle that case. TODO
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
    // subscribe to mousemove and mouseup on document, otherwise you
    // can escape bounds of element while dragging and get stuck
    // dragging it forever
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
    // if `onDrag` wasn't defined with `useCallback`, we'd have to
    // resubscribe to 2 DOM events here.
  }, [pressed, onDrag])

  // actually it makes sense to return an array only when
  // you expect that on the caller side all of the fields
  // will be usually renamed
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
        'grid place-content-center rounded-md border-2 bg-sky-200 bg-opacity-50 font-medium text-sky-800'
      )}
      style={{ width: '200px', height: '200px' }}
      onMouseDown={handleMouseDown}
    >
      <p>{'Some Box'}</p>
    </div>
  )
}
