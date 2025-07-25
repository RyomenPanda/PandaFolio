export function ScanLines() {
  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 255, 0, 0.1) 2px,
            rgba(0, 255, 0, 0.1) 4px
          )`,
        }}
      />
    </div>
  )
}
