// Shared Framer Motion variants used across pages

export const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -20 },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit:    { opacity: 0 },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.88 },
  animate: { opacity: 1, scale: 1 },
  exit:    { opacity: 0, scale: 0.88 },
};

export const slideLeft = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  exit:    { opacity: 0, x: -40 },
};

export const pageTransition = {
  type: "spring",
  stiffness: 280,
  damping: 28,
};

export const floatAnim = (dur = 3, delay = 0) => ({
  animate: { y: [-8, 8, -8], rotate: [-12, 12, -12] },
  transition: { duration: dur, delay, repeat: Infinity, ease: "easeInOut" },
});
