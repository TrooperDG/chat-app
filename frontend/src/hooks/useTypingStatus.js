import { useState, useEffect, useRef } from "react";

export function useTypingStatus(
  handleTypingStart,
  handleTypingStop,
  delay = 1000
) {
  const [isTyping, setIsTyping] = useState(false);
  const timeoutRef = useRef(null);

  const handleTyping = () => {
    if (!isTyping) {
      setIsTyping(true);
      handleTypingStart(); // e.g. emit "user is typing true" to server
    }

    // Reset debounce timer
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      handleTypingStop(); // e.g. emit "user stopped typing" to server
    }, delay);
  };

  // Optional cleanup
  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return handleTyping;
}
