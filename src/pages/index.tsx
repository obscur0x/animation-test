import { motion } from "framer-motion"
import { useState, useRef, useEffect } from "react"

export default function Home() {
  const [hasAnimated, setHasAnimated] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [progress, setProgress] = useState(-100)
  const textRef = useRef<HTMLDivElement>(null)
  const [textWidth, setTextWidth] = useState(0)
  const [initialText, setInitialText] = useState("Use ")
  const [finalText, setFinalText] = useState("test whatever text your heart desires")

  useEffect(() => {
    if (textRef.current) {
      setTextWidth(textRef.current.offsetWidth)
    }
  }, [textRef.current, initialText, finalText])

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-4 bg-neutral-950">
      <div className="flex flex-col gap-2 w-full max-w-xl">
        <input
          type="text"
          value={initialText}
          onChange={(e) => setInitialText(e.target.value)}
          disabled={isAnimating || hasAnimated}
          placeholder="Enter initial text..."
          className="w-full px-4 py-2 bg-black rounded-lg border border-neutral-800 text-white placeholder:text-neutral-500 disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <input
          type="text"
          value={finalText}
          onChange={(e) => setFinalText(e.target.value)}
          disabled={isAnimating || hasAnimated}
          placeholder="Enter final text..."
          className="w-full px-4 py-2 bg-black rounded-lg border border-neutral-800 text-white placeholder:text-neutral-500 disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      <div className="bg-black max-w-xl w-full rounded-xl border border-neutral-800 p-4 flex items-center gap-4">
        <div className="bg-white/50 rounded-full h-8 w-8"/>
        <div className="relative overflow-hidden w-full p-2" ref={textRef}>
          {isAnimating && (
            <>
              <motion.div
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: `${500 + (textWidth / 3)}%`, opacity: 1 }}
                transition={{ 
                  duration: 5,
                  ease: [0.3, 0.13, 0.23, 0.96],
                  opacity: {
                    duration: 5,
                    ease: "linear"
                  }
                }}
                className="absolute inset-0 bg-black w-[50px] z-30 blur-md"
              />

              <motion.div
                initial={{ x: "-100%", backdropFilter: "blur(1px)" }}
                animate={{ x: "100%" }}
                transition={{ 
                  duration: 6,
                  ease: [0.3, 0.13, 0.23, 0.96]
                }}
                whileInView={{
                  backdropFilter: ["blur(1px)", "blur(7px)", "blur(1px)"],
                  transition: {
                    backdropFilter: {
                      duration: 3.5,
                      times: [0, 0.5, 1]
                    }
                  }
                }}
                onUpdate={({ x }) => {
                  setProgress(parseFloat(x.toString().replace('%', '')))
                }}
                onAnimationComplete={() => {
                  setIsAnimating(false)
                }}
                className="absolute inset-0 w-full z-30 w-full [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
              />
            </>
          )}

          {progress > -5 && (
            <div className="absolute left-2 top-2 w-min z-20 whitespace-nowrap bg-black">
                <div className="relative">
                  {initialText}
              </div>
            </div>
          )}
          
          <motion.div
            animate={{
              opacity: progress > -20 ? 0 : 1
            }}
            initial={{ opacity: 1 }}
            transition={{
              duration: 0.4,
              ease: "easeInOut"
            }}
          >
            {finalText}
          </motion.div>
        </div>
      </div>
      
      <button 
        onClick={() => {
          if (initialText && finalText) {
            setIsAnimating(true)
            setHasAnimated(true)
          }
        }}
        disabled={hasAnimated || !initialText || !finalText}
        className={`px-4 py-2 rounded-lg transition-colors ${
          hasAnimated || !initialText || !finalText
            ? 'bg-white/5 cursor-not-allowed' 
            : 'bg-white/10 hover:bg-white/20'
        }`}
      >
        Animate Blur
      </button>
    </div>
  )
}
