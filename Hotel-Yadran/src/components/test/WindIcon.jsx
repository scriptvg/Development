import { motion, useAnimation } from 'framer-motion';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

const windVariants = {
  normal: (custom) => ({
    pathLength: 1,
    opacity: 1,
    pathOffset: 0,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
      delay: custom,
    },
  }),
  animate: (custom) => ({
    pathLength: [0, 1],
    opacity: [0, 1],
    pathOffset: [1, 0],
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
      delay: custom,
    },
  }),
};

const AirVentIcon = forwardRef(({ className, size = 28, ...props }, ref) => {
  const controls = useAnimation();
  const isControlledRef = useRef(false);

  useImperativeHandle(ref, () => {
    isControlledRef.current = true;
    return {
      startAnimation: () => controls.start('animate'),
      stopAnimation: () => controls.start('normal'),
    };
  });

  const handleMouseEnter = useCallback(() => {
    if (!isControlledRef.current) {
      controls.start('animate');
    }
  }, [controls]);

  const handleMouseLeave = useCallback(() => {
    if (!isControlledRef.current) {
      controls.start('normal');
    }
  }, [controls]);

  return (
    <div
      className={`cursor-pointer select-none p-2 hover:bg-gray-200 rounded-md transition-colors duration-200 flex items-center justify-center ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 12H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
        <path d="M6 8h12" />
        <motion.path
          d="M18.3 17.7a2.5 2.5 0 0 1-3.16 3.83 2.53 2.53 0 0 1-1.14-2V12"
          variants={windVariants}
          initial="normal"
          animate={controls}
          custom={0}
        />
        <motion.path
          d="M6.6 15.6A2 2 0 1 0 10 17v-5"
          variants={windVariants}
          initial="normal"
          animate={controls}
          custom={0.2}
        />
      </svg>
    </div>
  );
});

export default AirVentIcon;
