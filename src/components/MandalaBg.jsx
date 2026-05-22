import mandala from "@/assets/mandala.png";

export const MandalaBg = ({
  className = "",
  spin = true,
  style,
}) => (
  <div
    className={`pointer-events-none select-none ${className}`}
    style={{ contain: "layout style paint", ...style }}
  >
    <img
      src={mandala}
      alt=""
      aria-hidden
      className={`relative h-full w-full opacity-20 ${
        spin ? "animate-slow-spin" : "animate-reverse-spin"
      }`}
      style={{ willChange: "transform" }}
    />
  </div>
);