"use client";

import { useEffect } from "react";

export function DashboardCursor() {
  useEffect(() => {
    // Solo per dashboard, cursore semplice e sempre visibile
    const cursor = document.createElement("div");
    cursor.id = "dashboard-cursor";
    cursor.style.position = "fixed";
    cursor.style.top = "0";
    cursor.style.left = "0";
    cursor.style.width = "20px";
    cursor.style.height = "20px";
    cursor.style.borderRadius = "50%";
    cursor.style.backgroundColor = "#FF6B4A"; // arancione
    cursor.style.border = "2px solid white";
    cursor.style.boxShadow = "0 0 0 1px rgba(0,0,0,0.2)";
    cursor.style.zIndex = "999999";
    cursor.style.pointerEvents = "none";
    cursor.style.transform = "translate(-50%, -50%)";
    cursor.style.transition = "width 0.15s, height 0.15s, background 0.15s";
    document.body.appendChild(cursor);

    let targetX = -100, targetY = -100;
    let currentX = -100, currentY = -100;
    let raf: number | null = null;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      const target = e.target as HTMLElement;
      const isInteractive = !!target?.closest("a, button, [role='button'], input, textarea, select");
      const newSize = isInteractive ? 40 : 20;
      cursor.style.width = `${newSize}px`;
      cursor.style.height = `${newSize}px`;
      cursor.style.backgroundColor = isInteractive ? "#A855F7" : "#FF6B4A";
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.25;
      currentY += (targetY - currentY) * 0.25;
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", () => { cursor.style.opacity = "0"; });
    window.addEventListener("mouseenter", () => { cursor.style.opacity = "1"; });

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      cursor.remove();
    };
  }, []);

  return null;
}