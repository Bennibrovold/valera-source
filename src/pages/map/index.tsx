import React, { useState, useEffect } from "react";
import styled from "styled-components";
import backgroundImage from "../../assets/carta.png";

const Viewport = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  cursor: grab;
`;

const ImageContainer = styled.div`
  background-image: url(${backgroundImage});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  position: absolute;
  width: 2000px;
  height: 2000px;
`;

export const Map = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startDragPoint, setStartDragPoint] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) =>
      isDragging && handleDragMove(e.clientX, e.clientY);
    const handleMouseUp = () => setIsDragging(false);
    const handleTouchMove = (e) =>
      isDragging && handleDragMove(e.touches[0].clientX, e.touches[0].clientY);
    const handleTouchEnd = () => setIsDragging(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, startDragPoint]);

  const handleDragStart = (clientX, clientY) => {
    setIsDragging(true);
    setStartDragPoint({ x: clientX, y: clientY });
  };

  const handleDragMove = (clientX, clientY) => {
    const dx = clientX - startDragPoint.x;
    const dy = clientY - startDragPoint.y;

    setPosition((prevPosition) => {
      const newX = Math.max(
        Math.min(prevPosition.x + dx, 0),
        window.innerWidth - 2000
      );
      const newY = Math.max(
        Math.min(prevPosition.y + dy, 0),
        window.innerHeight - 2000
      );
      return { x: newX, y: newY };
    });

    setStartDragPoint({ x: clientX, y: clientY });
  };

  return (
    <Viewport
      onMouseDown={(e) => handleDragStart(e.clientX, e.clientY)}
      onTouchStart={(e) =>
        handleDragStart(e.touches[0].clientX, e.touches[0].clientY)
      }
    >
      <ImageContainer
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      />
    </Viewport>
  );
};
