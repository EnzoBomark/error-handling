import { makeProject } from "@motion-canvas/core";
import { fetchExample, intro, javascriptPitFall } from "./scenes";

export default makeProject({
  experimentalFeatures: true,
  scenes: [intro, fetchExample, javascriptPitFall],
});
