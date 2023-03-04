import { flame, transform } from "./bl4st.mjs"
import { Engine } from "./ablaze.mjs"

if (!window.flameEngine) {
  const canvas = document.createElement("canvas")
  window.flameEngine = new Engine(canvas)
  window.flameEngine.init()
}

window.flame = flame
window.transform = transform
