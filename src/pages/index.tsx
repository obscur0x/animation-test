import { motion } from "framer-motion"
import { useState } from "react"

export default function Home() {
  const [hasAnimated, setHasAnimated] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [progress, setProgress] = useState(-100)

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-4 bg-neutral-950">
      <div className="bg-black max-w-xl w-full rounded-xl border border-neutral-800 p-4 flex items-center gap-4">
        <div className="bg-white/50 rounded-full h-8 w-8"/>
        <div className="relative overflow-hidden p-2">
          {isAnimating && (
            <>
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: "400%", opacity: 1 }}
              transition={{ 
                delay: 1,
                duration: 4,
                ease: [0.43, 0.13, 0.23, 0.96],
                opacity: {
                  duration: 5,
                  ease: "linear"
                }
              }}
              className="absolute inset-0 bg-black w-[200px] z-30 blur-md"
            />
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: "600%", opacity: 1 }}
              transition={{ 
                duration: 5,
                ease: [0.43, 0.13, 0.23, 0.96],
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
                  duration: 5,
                  ease: [0.43, 0.13, 0.23, 0.96]
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
                className="absolute inset-0 w-[80%] z-30 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
              />
            </>
          )}
          {(progress > -5) && (
            <div className="absolute left-2 top-2 bg-black w-min z-20 whitespace-nowrap">
              ETH Position: Leveraged long or short
            </div>
          )}
          
              <motion.div
                animate={{
                  opacity: progress > 5 ? 0 : 1
                }}
                transition={{
                  duration: 0.55,
                  ease: "easeInOut"
                }}
              >
                Decide if we should either enter a leveraged ETH position
              </motion.div>
          
        </div>
      </div>
      
      <button 
        onClick={() => {
          setIsAnimating(true)
          setHasAnimated(true)
        }}
        disabled={hasAnimated}
        className={`px-4 py-2 rounded-lg transition-colors ${
          hasAnimated 
            ? 'bg-white/5 cursor-not-allowed' 
            : 'bg-white/10 hover:bg-white/20'
        }`}
      >
        Animate Blur
      </button>
    </div>
  );
}
