import { useEffect, useRef, useState } from 'react';

export const useObserver = (options) => {
  const [elements, setElements] = useState([]);
  const [entries, setEntries] = useState([]);

  const observer = useRef(new IntersectionObserver(observedEntries => {
    setEntries(observedEntries);
  }, options));

  useEffect(() => {
    const { current: currentObserver } = observer;
    currentObserver.disconnect();
    elements.forEach(element => currentObserver.observe(element));
    return () => currentObserver.disconnect();
  }, [elements]);

  return {
    observer: observer.current,
    setElements,
    entries
  };
};