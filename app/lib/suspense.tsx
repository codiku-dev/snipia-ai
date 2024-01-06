import { FunctionComponent, ReactElement } from "react";
/* eslint-disable react/display-name */
export const withSkeletonHoc = (
  Component: FunctionComponent<any>,
  Skeleton: ReactElement
) => {
  return (props: any) => {
    return props.isFallback ? Skeleton : <Component {...props} />;
  };
};
