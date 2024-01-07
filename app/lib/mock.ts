export const delayReq = <T>(data: T, ms?: number): Promise<T> => {
  return new Promise((resolve) => {
    process.env.NODE_ENV === "production"
      ? resolve(data)
      : setTimeout(() => {
          resolve(data);
        }, ms ?? 0);
  });
};
