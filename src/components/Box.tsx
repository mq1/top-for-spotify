import type { FunctionalComponent } from "preact";

const Box: FunctionalComponent<{className: string}> = ({ children, className }) => (
  <div class={`rounded-xl shadow-md sm:shadow-lg p-6 sm:p-16 ${className}`}>{children}</div>
);

export default Box;
