import type { FunctionalComponent } from "preact";
import { useStore } from "@nanostores/preact";
import { obscurity } from "../store/obscurity";

const Obscurity: FunctionalComponent = () => {
  const obscurityRating = import.meta.env.SSR ? 0 : useStore(obscurity);

  return (
    <div class="box flex flex-col gap-y-8 bg-black font-bold text-white">
      <h2 class="text-5xl sm:text-7xl uppercase">Obscurity</h2>
      <div class="text-7xl sm:text-9xl">{obscurityRating} %</div>
    </div>
  );
};

export default Obscurity;
