import { FunctionComponent, ReactElement } from "react";
/* eslint-disable react/display-name */
export const withSkeleton = (
  Component: FunctionComponent<any>,
  Skeleton: ReactElement
) => {
  return (p: any) => {
    return p.isFallback ? Skeleton : <Component {...p} />;
  };
};
