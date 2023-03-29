import Head from 'next/head'
import { useState } from 'react'
import Box, { BoxProps } from '@/components/Box'

type HeaderProps = { surface: number }

function Header(props: HeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between bg-slate-900 p-4 font-medium text-white">
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
  const update = (current: BoxProps) => {
    boxes[current.id].x = current.x
    boxes[current.id].y = current.y
    setSurface(Math.round(Math.random()))
  }
  const boxes: BoxProps[] = [
    { id: 0, x: 0, y: 0, w: 200, h: 200, update },
    { id: 1, x: 0, y: 0, w: 200, h: 200, update }
  ]
  return (
    <>
      <Head>
        <title>Two Squares</title>
        <meta name="description" content="Toy project" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header surface={surface} />
      <main className="min-h-[calc(100vh_-_4rem)] bg-slate-100 p-8">
        <div
          className="absolute min-h-[calc(100%_-_8rem)]
        min-w-[calc(100%_-_4rem)]"
        >
          <Box data={boxes[0]} />
          <Box data={boxes[1]} />
        </div>
      </main>
    </>
  )
}
