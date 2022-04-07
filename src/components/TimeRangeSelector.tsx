import type { FunctionalComponent } from "preact";
import { useStore } from "@nanostores/preact";
import { timeRange as tr, timeRanges } from "../store/timeRange";

const TimeRangeSelector: FunctionalComponent = () => {
  const timeRange = import.meta.env.SSR ? "" : useStore(tr);

  const options = timeRanges.map((timeRange) => (
    <option key={timeRange} value={timeRange}>
      {timeRange.replace("_", " ")}
    </option>
  ));

  return (
    <select
      value={timeRange}
      onInput={(e) => tr.set(e.target.value)}
      class="border-2 rounded-lg p-2 border-green-500 bg-white dark:bg-black sm:text-xl capitalize"
    >
      {options}
    </select>
  );
};

export default TimeRangeSelector;
