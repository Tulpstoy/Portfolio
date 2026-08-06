// ThoughtBubble.jsx
// Desktop-only caption bubble that follows the cursor while hovering the
// carousel. Purely an overlay (position: absolute) since reflowing the page
// on every mouse move would be jarring — the mobile equivalent lives in
// ThoughtBubbleSlot.jsx, which participates in normal document flow instead.
import React, { useLayoutEffect, useRef, useState } from 'react';
import './ThoughtBubble.css';

const ThoughtBubble = ({ text, containerRef, mouseX, mouseY, isHovering }) => {
  const bubbleRef = useRef(null);
  const [bubbleSize, setBubbleSize] = useState({ width: 240, height: 80 });

  useLayoutEffect(() => {
    if (bubbleRef.current) {
      const rect = bubbleRef.current.getBoundingClientRect();
      setBubbleSize({ width: rect.width, height: rect.height });
    }
  }, [text, isHovering]);

  if (!text) return null;

  const container = containerRef?.current?.getBoundingClientRect();
  const containerWidth = container?.width || 0;
  const containerHeight = container?.height || 0;

  let left = mouseX + 28;
  let top = mouseY - bubbleSize.height - 28;

  left = Math.max(8, Math.min(left, containerWidth - bubbleSize.width - 8));
  top = Math.max(8, Math.min(top, containerHeight - bubbleSize.height - 8));

  return (
    <div
      ref={bubbleRef}
      className={`thought-bubble thought-bubble--desktop ${isHovering ? 'thought-bubble--visible' : ''}`}
      style={{ left: `${left}px`, top: `${top}px` }}
    >
      <p className="thought-bubble__text">{text}</p>
      <span className="thought-bubble__tail thought-bubble__tail--desktop">
        <span className="thought-bubble__dot thought-bubble__dot--1"></span>
        <span className="thought-bubble__dot thought-bubble__dot--2"></span>
        <span className="thought-bubble__dot thought-bubble__dot--3"></span>
      </span>
    </div>
  );
};

export default ThoughtBubble;
