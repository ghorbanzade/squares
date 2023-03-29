type HeaderProps = { surface: number }

export default function Header(props: HeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between bg-slate-900 p-4 font-medium text-white">
      <div>
        <h1 className="text-xl">Two Squares</h1>
        <h2>Drag boxes around to find their intersection area</h2>
      </div>
      <span>Intersection Area: {props.surface}%</span>
    </header>
  )
}
