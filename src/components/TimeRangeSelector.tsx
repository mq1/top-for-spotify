import type { FunctionalComponent } from "preact";
import { useStore } from "@nanostores/preact";
import { timeRange as tr } from "../store/timeRange";

const TimeRangeSelector: FunctionalComponent = () => {
  const timeRange = import.meta.env.SSR ? "" : useStore(tr);

  return (
    <select
      value={timeRange}
      onInput={(e) => tr.set(e.target.value)}
      class="border-2 rounded-lg p-2 border-green-500 bg-white dark:bg-black sm:text-xl"
    >
      <option key="short_term" value="short_term">
        Short term
      </option>
      <option key="long_term" value="long_term">
        Long term
      </option>
    </select>
  );
};

export default TimeRangeSelector;
