// @ts-nocheck
import { useRef, useEffect } from "react";
import * as d3 from "d3";

//https://www.pluralsight.com/guides/using-d3.js-inside-a-react-app

export const useD3 = (renderChartFn, dependencies) => {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    renderChartFn(d3.select(ref.current));
    return () => {};
  }, dependencies);
  return ref;
};
