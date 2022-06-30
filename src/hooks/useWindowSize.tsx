import {useState, useEffect} from 'react';
// Usage
// function App() {
//   const size = useWindowSize();
//   return (
//     <div>
//       {size.width}px / {size.height}px
//     </div>
//   );
// }
// Hook
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth < window.screen.width ? window.innerWidth : window.screen.width,
        height: window.innerHeight < window.screen.height ? window.innerHeight : window.screen.height,
      });
    }
    // Add event listener
    window.addEventListener('resize', handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}
