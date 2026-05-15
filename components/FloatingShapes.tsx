"use client";

const shapes = [
  { type: "circle", top: "10%", left: "5%", delay: 0, duration: 20, size: "w-32 h-32" },
  { type: "circle", top: "70%", left: "85%", delay: 2, duration: 25, size: "w-24 h-24" },
  { type: "triangle", top: "30%", left: "90%", delay: 5, duration: 22, size: "w-28 h-28" },
];

export function FloatingShapes() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {shapes.map((shape, i) => (
        <div
          key={i}
          className={`absolute ${shape.size} opacity-20 blur-sm`}
          style={{
            top: shape.top,
            left: shape.left,
            animation: `float ${shape.duration}s infinite alternate`,
            animationDelay: `${shape.delay}s`,
          }}
        >
          {shape.type === "circle" && <div className="w-full h-full rounded-full bg-gradient-to-br from-[#FF6B4A] to-[#A855F7]" />}
          {shape.type === "triangle" && (
            <div 
              className="w-full h-full"
              style={{ 
                clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                background: "linear-gradient(135deg, #FF6B4A, #A855F7)"
              }} 
            />
          )}
        </div>
      ))}
      
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          100% { transform: translateY(-40px) rotate(8deg); }
        }
      `}</style>
    </div>
  );
}