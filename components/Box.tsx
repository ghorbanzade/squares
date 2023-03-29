// SPDX-License-Identifier: Apache-2.0

import useDraggable from '@/hooks/useDraggable'
import useWindowDimensions from '@/hooks/useWindowDimensions'
import clsx from 'clsx'
import { useCallback } from 'react'

export type BoxProps = {
  id: number
  x: number
  y: number
  w: number
  h: number
}
export type BoxUpdateHandler = (pos: BoxProps) => void

export default function Box({
  data,
  onUpdate
}: {
  data: BoxProps
  onUpdate: BoxUpdateHandler
}) {
  const windowDimensions = useWindowDimensions()
  const handleDrag = useCallback(({ x, y }: { x: number; y: number }) => {
    const out = {
      ...data,
      x: Math.min(Math.max(0, x), windowDimensions.width - data.w - 32 - 32),
      y: Math.min(Math.max(0, y), windowDimensions.height - data.h - 96 - 32)
    }
    onUpdate(out)
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
        'absolute grid select-none place-content-center rounded-md border-2 bg-sky-200 bg-opacity-50 font-medium text-sky-800'
      )}
      style={{ width: `${data.w}px`, height: `${data.h}px` }}
      onMouseDown={handleMouseDown}
    >
      <span>Box {data.id + 1}</span>
    </div>
  )
}
