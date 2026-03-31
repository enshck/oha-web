import { Suspense } from "react";
import type { ExoticComponent, JSX } from "react";

const Loadable = (Component: ExoticComponent) => (props: JSX.IntrinsicAttributes) => (
  <Suspense fallback={<>Loading...</>}>
    <Component {...props} />
  </Suspense>
);

export default Loadable;
