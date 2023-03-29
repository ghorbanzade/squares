import Head from "next/head";
import clsx from "clsx";
import { useState } from "react";
import DraggableComponent from "@/components/Box";

interface BoxProps {
  id: string;
  top: number;
  left: number;
  width: number;
  height: number;
  zIndex: number;
  colors: string;
}

interface HeaderProps {
  surface: number;
}

const makeBox = (boxId = 1) => {
  const boxColors = [
    "border-red-200 bg-red-100",
    "border-purple-300 bg-purple-200",
    "border-sky-300 bg-sky-200",
    "border-green-200 bg-green-100",
  ];
  const colors = boxColors[boxId];
  return {
    id: `box-${boxId}`,
    top: boxId === 1 ? 10 : 0,
    left: boxId === 1 ? 20 : 100,
    height: 100,
    width: 200,
    zIndex: boxId,
    colors,
  };
};

function Header(props: HeaderProps) {
  return (
    <header className="bg-slate-900 h-16 p-4 text-white font-medium justify-between flex items-center">
      <div>
        <h1 className="text-xl">Two Squares</h1>
        <h2>Find the intersection between the two boxes</h2>
      </div>
      <span>Surface Area: {props.surface}</span>
    </header>
  );
}

function Box({ data }: { data: BoxProps }) {
  return (
    <div
      id={data.id}
      className={clsx(
        data.colors,
        "border shadow-md border-gray-500 rounded-md cursor-pointer p-4 grid place-content-center font-medium relative bg-opacity-50"
      )}
      style={{
        width: data.width,
        height: data.height,
        top: data.top,
        left: data.left,
        zIndex: data.zIndex,
        content: data.id,
      }}
    />
  );
}

export default function Home() {
  const [surface, setSurface] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedBox, setSelectedBox] = useState<string | null>(null);
  const boxes = [makeBox(1)];
  const handleMouseMove = (ev: React.MouseEvent<HTMLElement>) => {
    setMousePosition({ x: ev.pageX, y: ev.pageY });
    if (selectedBox) {
      console.log("hello");
    }
  };
  const handleMouseDown = (ev: React.MouseEvent<HTMLElement>) => {
    const { x, y } = { x: ev.pageX - 32, y: ev.pageY - 96 };
    const box = boxes.find(
      (box) => x < box.left + box.width && y < box.left + box.height
    );
    if (box) {
      console.log(mousePosition, box.id);
      setSelectedBox(box.id);
    } else {
      console.log("mousedown", ev);
    }
  };
  const handleMouseUp = (ev: React.MouseEvent<HTMLElement>) => {
    console.log("mouseup", ev);
    if (selectedBox) {
      setSelectedBox(null);
    }
  };
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
          {boxes.map((box) => (
            <Box key={box.id} data={box} />
          ))}
          <DraggableComponent />
          <DraggableComponent />
        </div>
      </main>
    </>
  );
}
