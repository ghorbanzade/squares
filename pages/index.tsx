// SPDX-License-Identifier: Apache-2.0

import Head from 'next/head'
import { useState } from 'react'
import Box, { BoxProps } from '@/components/Box'
import Header from '@/components/Header'

function findIntersectionArea(boxes: BoxProps[]) {
  const [a, b] = [boxes[0], boxes[1]]
  const dx = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x)
  const dy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y)
  const intersection = dx > 0 && dy > 0 ? Math.round(dx * dy) : 0
  const total = Math.min(a.w, b.w) * Math.min(a.h, b.h)
  const percent = Math.round((intersection / total) * 100)
  return percent
}

export default function Home() {
  const [surface, setSurface] = useState(100)
  const boxes: BoxProps[] = [
    { id: 0, x: 0, y: 0, w: 200, h: 200 },
    { id: 1, x: 0, y: 0, w: 250, h: 250 }
  ]
  const handleBoxUpdate = (current: BoxProps) => {
    boxes[current.id].x = current.x
    boxes[current.id].y = current.y
    setSurface(findIntersectionArea(boxes))
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
      <main className="min-h-[calc(100vh_-_4rem)] bg-slate-100 p-8">
        <div
          className="absolute min-h-[calc(100%_-_8rem)]
        min-w-[calc(100%_-_4rem)]"
        >
          <Box data={boxes[0]} onUpdate={handleBoxUpdate} />
          <Box data={boxes[1]} onUpdate={handleBoxUpdate} />
        </div>
      </main>
    </>
  )
}
