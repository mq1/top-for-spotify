import type { FunctionalComponent } from "preact";
import { useStore } from "@nanostores/preact";
import { timeRange as tr } from "../store/timeRange";

const TimeRangeSelector: FunctionalComponent = () => {
  const timeRange = import.meta.env.SSR ? "" : useStore(tr);

  return (
    <select
      value={timeRange}
      onInput={(e) => tr.set(e.target.value)}
      class="selector"
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
