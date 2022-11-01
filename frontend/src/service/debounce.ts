// export function debounce<T>(callback: (arg: T) => void, delay = 1000) {
//   let timeout: NodeJS.Timeout;

//   return (arg: T) => {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => {
//       callback(arg);
//     }, delay);
//   };
// };

export const debounce = (callback: any, delay = 1000) => {
  let timeout: NodeJS.Timeout;

  return (...args: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};
