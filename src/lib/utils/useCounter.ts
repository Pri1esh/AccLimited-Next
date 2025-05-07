import { useState, useEffect } from "react"

interface UseCounterProps {
  end: number
  duration?: number
  start?: number
}

const formatMillions = (value: number) => {
    return `${(value / 1000000).toFixed(2)} Million`
  }

  const formatK = (value: number) => {
    return value.toLocaleString();
  }



function useCounter({ end, duration = 2000, start = 0 }: UseCounterProps) {
  const [count, setCount] = useState(start)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) {
        startTime = currentTime
      }

      const progress = (currentTime - startTime) / duration

      if (progress < 1) {
        setCount(Math.floor(progress * (end - start) + start))
        animationFrame = requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, start])

  if(count > 999999){
    return formatMillions(count);
  }
  return formatK(count);
}

export default useCounter;

