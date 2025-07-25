export function PandaLogo({ className = "" }: { className?: string }) {
  return (
    <div className="w-full mb-4">
      <div className="relative w-32 h-auto mx-auto">
        <img
          src="/panda.png"
          alt="Panda Logo"
          className="w-full h-auto drop-shadow-[0_0_12px_#00ffff] drop-shadow-[0_0_6px_#00ffff] animate-pulse"
        />
      </div>
    </div>
  );
}