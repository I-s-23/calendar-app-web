import { configure } from "@storybook/react";
import { setConsoleOptions } from '@storybook/addon-console';

setConsoleOptions({
  panelExclude: []
});

// function loadStories() {
//   let req = require.context("../src/stories", true, /.(tsx|js)$/);
//   req.keys().forEach(filename => req(filename));

//   req = require.context("../src", true, /.stories.(tsx|js)$/);
//   req.keys().forEach(filename => req(filename));
// }

// automatically import all files ending in *.stories.js
configure(require.context("../stories", true, /\.stories\.tsx$/), module);

// configure(loadStories, module);
