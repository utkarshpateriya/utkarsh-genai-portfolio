import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable custom cursor on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    const interactiveElements = document.querySelectorAll(
      "a, button, [role='button'], input, textarea, select"
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleHoverStart);
      el.addEventListener("mouseleave", handleHoverEnd);
    });

    // Re-observe on DOM changes
    const observer = new MutationObserver(() => {
      const elements = document.querySelectorAll(
        "a, button, [role='button'], input, textarea, select"
      );
      elements.forEach((el) => {
        el.addEventListener("mouseenter", handleHoverStart);
        el.addEventListener("mouseleave", handleHoverEnd);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverStart);
        el.removeEventListener("mouseleave", handleHoverEnd);
      });
      observer.disconnect();
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Main dot */}
      <div
        className="fixed pointer-events-none z-[10000] mix-blend-difference"
        style={{
          left: position.x - (isHovering ? 20 : 6),
          top: position.y - (isHovering ? 20 : 6),
          width: isHovering ? 40 : 12,
          height: isHovering ? 40 : 12,
          borderRadius: "50%",
          border: `2px solid #00f5ff`,
          background: isHovering ? "transparent" : "#00f5ff",
          transition: "width 0.2s, height 0.2s, left 0.05s, top 0.05s, background 0.2s",
          boxShadow: "0 0 10px #00f5ff, 0 0 20px #00f5ff44",
        }}
      />
      {/* Crosshair lines */}
      {!isHovering && (
        <>
          <div
            className="fixed pointer-events-none z-[10000]"
            style={{
              left: position.x - 1,
              top: position.y - 16,
              width: 2,
              height: 8,
              background: "#00f5ff88",
              transition: "left 0.05s, top 0.05s",
            }}
          />
          <div
            className="fixed pointer-events-none z-[10000]"
            style={{
              left: position.x - 1,
              top: position.y + 8,
              width: 2,
              height: 8,
              background: "#00f5ff88",
              transition: "left 0.05s, top 0.05s",
            }}
          />
          <div
            className="fixed pointer-events-none z-[10000]"
            style={{
              left: position.x - 16,
              top: position.y - 1,
              width: 8,
              height: 2,
              background: "#00f5ff88",
              transition: "left 0.05s, top 0.05s",
            }}
          />
          <div
            className="fixed pointer-events-none z-[10000]"
            style={{
              left: position.x + 8,
              top: position.y - 1,
              width: 8,
              height: 2,
              background: "#00f5ff88",
              transition: "left 0.05s, top 0.05s",
            }}
          />
        </>
      )}
    </>
  );
}
