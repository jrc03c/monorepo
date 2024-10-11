import { plot } from "./src/index.mjs"
plot.browserCommand = "xdg-open $FILE"
global.plot = plot
