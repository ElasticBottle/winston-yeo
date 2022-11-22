export const defaultTransition: {
  duration: number;
  ease: [number, number, number, number];
} = {
  duration: 1,
  ease: [0.6, 0.01, -0.05, 0.9],
};

export const PopUpVariant = {
  initial: {
    y: 400,
  },
  animate: {
    y: 0,
    transition: defaultTransition,
  },
  exit: {
    y: 100,
    transition: defaultTransition,
  },
};

export const FadeInVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: defaultTransition,
  },
  exit: {
    opacity: 0,
    transition: defaultTransition,
  },
};
export const FadeOutVariant = {
  initial: {
    opacity: 1,
  },
  animate: {
    opacity: 0,
    transition: defaultTransition,
  },
  exit: {
    opacity: 1,
    transition: defaultTransition,
  },
};
