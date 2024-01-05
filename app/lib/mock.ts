export const delayReq = <T>(data: T, ms?: number): Promise<T> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, ms ?? 1000);
  });
