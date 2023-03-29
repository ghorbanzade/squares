import Head from 'next/head'
import { useState } from 'react'
import Box from '@/components/Box'
import Box2, { makeBox } from '@/components/Box2'

interface HeaderProps {
  surface: number
}

function Header(props: HeaderProps) {
  return (
    <header className="bg-slate-900 h-16 p-4 text-white font-medium justify-between flex items-center">
      <div>
        <h1 className="text-xl">Two Squares</h1>
        <h2>Find the intersection between the two boxes</h2>
      </div>
      <span>Surface Area: {props.surface}</span>
    </header>
  )
}

export default function Home() {
  const [surface, setSurface] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [selectedBox, setSelectedBox] = useState<string | null>(null)
  const boxes = [makeBox(1)]
  const handleMouseMove = (ev: React.MouseEvent<HTMLElement>) => {
    setMousePosition({ x: ev.pageX, y: ev.pageY })
    if (selectedBox) {
      console.log('hello')
    }
  }
  const handleMouseDown = (ev: React.MouseEvent<HTMLElement>) => {
    const { x, y } = { x: ev.pageX - 32, y: ev.pageY - 96 }
    const box = boxes.find(
      (box) => x < box.left + box.width && y < box.left + box.height
    )
    if (box) {
      console.log(mousePosition, box.id)
      setSelectedBox(box.id)
    } else {
      console.log('mousedown', ev)
    }
  }
  const handleMouseUp = (ev: React.MouseEvent<HTMLElement>) => {
    console.log('mouseup', ev)
    if (selectedBox) {
      setSelectedBox(null)
    }
  }
  return (
    <>
      <Head>
        <title>Two Squares</title>
        <meta name="description" content="Toy project" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header surface={surface} />
      <main className="bg-slate-100 p-8 min-h-[calc(100vh_-_4rem)]">
        <div
          className="absolute min-w-[calc(100%_-_4rem)]
        min-h-[calc(100%_-_8rem)]"
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          {/* {boxes.map((box) => (
            <Box2 key={box.id} data={box} />
          ))} */}
          <Box />
          <Box />
        </div>
      </main>
    </>
  )
}
