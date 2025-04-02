
export const fadeInVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

export const slideUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5
    }
  })
};

export function createIntersectionObserver(
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1
  }
): IntersectionObserver | null {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
    return null;
  }
  
  return new IntersectionObserver(callback, options);
}
