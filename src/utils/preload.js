export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = resolve;
    img.onerror = reject;
    img.src = src;
  });
};

export const preloadImages = (srcs) => {
  return Promise.allSettled(srcs.map(preloadImage));
};
