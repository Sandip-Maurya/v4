import { useEffect, useRef, useState, type RefObject } from 'react'

interface UseDynamicTextSizeOptions {
  maxLines: number
  minFontSize?: number
  maxFontSize?: number
  lineHeight?: number
}

export function useDynamicTextSize<T extends HTMLElement>(
  options: UseDynamicTextSizeOptions
): { ref: RefObject<T | null>; fontSize: string } {
  const { maxLines, minFontSize = 12, maxFontSize = 72, lineHeight = 1.5 } = options
  const ref = useRef<T | null>(null)
  const [fontSize, setFontSize] = useState<string>('')

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const calculateOptimalFontSize = () => {
      if (!element) return

      const container = element.parentElement
      if (!container) return

      // Store original styles
      const originalOverflow = getComputedStyle(element).overflow
      const originalWhiteSpace = getComputedStyle(element).whiteSpace
      const originalWordBreak = getComputedStyle(element).wordBreak

      // Set temporary styles for measurement (no line-clamp, let it wrap naturally)
      element.style.overflow = 'hidden'
      element.style.whiteSpace = 'normal'
      element.style.wordBreak = 'break-word'
      element.style.lineHeight = `${lineHeight}`

      // Binary search for optimal font size
      let low = minFontSize
      let high = maxFontSize
      let bestSize = minFontSize
      const tolerance = 0.1 // Tighter tolerance for more accurate sizing

      const getLineCount = (testFontSize: number): number => {
        element.style.fontSize = `${testFontSize}px`
        // Force reflow to ensure styles are applied
        void element.offsetHeight
        
        const computedLineHeight = parseFloat(getComputedStyle(element).lineHeight) || testFontSize * lineHeight
        const scrollHeight = element.scrollHeight
        
        // More accurate line count calculation - use ceiling to be conservative
        // Add small tolerance to account for rounding issues
        const lineCount = Math.ceil(scrollHeight / computedLineHeight)
        return lineCount
      }

      while (high - low > tolerance) {
        const mid = (low + high) / 2
        const lineCount = getLineCount(mid)

        if (lineCount <= maxLines) {
          bestSize = mid
          low = mid
        } else {
          high = mid
        }
      }

      // Verify final size and ensure it fits - be more aggressive about reducing size
      let finalLineCount = getLineCount(bestSize)
      let iterations = 0
      const maxIterations = 20 // Prevent infinite loops
      
      while (finalLineCount > maxLines && bestSize > minFontSize && iterations < maxIterations) {
        // Reduce size more aggressively
        bestSize = Math.max(minFontSize, bestSize - 1)
        finalLineCount = getLineCount(bestSize)
        iterations++
      }
      
      // Final safety check - if still too many lines, use minFontSize
      if (finalLineCount > maxLines && bestSize > minFontSize) {
        bestSize = minFontSize
        finalLineCount = getLineCount(bestSize)
      }

      // Clean up temporary styles, restore original styles except fontSize
      element.style.whiteSpace = originalWhiteSpace
      element.style.wordBreak = originalWordBreak
      element.style.overflow = originalOverflow
      // Keep the calculated line height for consistent rendering with our calculation
      element.style.lineHeight = `${lineHeight}`

      // Set the calculated font size
      const finalFontSize = `${bestSize}px`
      setFontSize(finalFontSize)
      element.style.fontSize = finalFontSize
    }

    // Debounce function
    let resizeTimeout: ReturnType<typeof setTimeout> | null = null
    const debouncedCalculate = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(calculateOptimalFontSize, 50)
    }

    // Small delay to ensure DOM is fully rendered
    const initialTimeout = setTimeout(() => {
      calculateOptimalFontSize()
    }, 0)

    // Create ResizeObserver to watch for container size changes
    const resizeObserver = new ResizeObserver(debouncedCalculate)

    const container = element.parentElement || element
    resizeObserver.observe(container)

    // Also listen to window resize as fallback
    window.addEventListener('resize', debouncedCalculate)

    return () => {
      clearTimeout(initialTimeout)
      if (resizeTimeout) clearTimeout(resizeTimeout)
      resizeObserver.disconnect()
      window.removeEventListener('resize', debouncedCalculate)
    }
  }, [maxLines, minFontSize, maxFontSize, lineHeight])

  return { ref, fontSize }
}

