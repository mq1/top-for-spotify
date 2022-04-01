import type { ComponentChildren, FunctionalComponent } from "preact";

type Props = {
  children: ComponentChildren;
  className: string;
}

const Box: FunctionalComponent = ({ children, className }: Props) => (
  <div class={`rounded-xl shadow-md sm:shadow-lg p-6 sm:p-16 ${className}`}>{children}</div>
);

export default Box;
