import { useRef, useState } from "react";

export function useNavHoverIndicator() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [hoverRect, setHoverRect] = useState({ left: 0, width: 0 });
  const navContainerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLElement>>(new Map());

  const updateHoverRect = (key: string) => {
    const el = itemRefs.current.get(key);
    const container = navContainerRef.current;
    if (el && container) {
      const elRect = el.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      setHoverRect({
        left: elRect.left - containerRect.left,
        width: elRect.width,
      });
    }
  };

  const handleMouseEnter = (key: string) => {
    setHoveredItem(key);
    updateHoverRect(key);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  return {
    hoveredItem,
    hoverRect,
    navContainerRef,
    itemRefs,
    handleMouseEnter,
    handleMouseLeave,
  };
}
