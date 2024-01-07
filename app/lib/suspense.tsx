import { FunctionComponent, ReactElement } from "react";
/* eslint-disable react/display-name */
export const withSkeleton = (
  Component: FunctionComponent<any>,
  Skeleton: ReactElement
) => {
  return (props: any) => {
    return props.isFallback ? Skeleton : <Component {...props} />;
  };
};
