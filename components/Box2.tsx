import clsx from 'clsx'

interface BoxProps {
  id: string
  top: number
  left: number
  width: number
  height: number
  zIndex: number
  colors: string
}

export const makeBox = (boxId = 1) => {
  const boxColors = [
    'border-red-200 bg-red-100',
    'border-purple-300 bg-purple-200',
    'border-sky-300 bg-sky-200',
    'border-green-200 bg-green-100'
  ]
  const colors = boxColors[boxId]
  return {
    id: `box-${boxId}`,
    top: boxId === 1 ? 10 : 0,
    left: boxId === 1 ? 20 : 100,
    height: 100,
    width: 200,
    zIndex: boxId,
    colors
  }
}

export default function Box2({ data }: { data: BoxProps }) {
  return (
    <div
      id={data.id}
      className={clsx(
        data.colors,
        'border shadow-md border-gray-500 rounded-md cursor-pointer p-4 grid place-content-center font-medium relative bg-opacity-50'
      )}
      style={{
        width: data.width,
        height: data.height,
        top: data.top,
        left: data.left,
        zIndex: data.zIndex,
        content: data.id
      }}
    />
  )
}
