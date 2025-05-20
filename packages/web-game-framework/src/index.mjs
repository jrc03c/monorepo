import { Component, Thing } from "./classes/thing/index.mjs"
import { Mouse } from "./classes/data/mouse.mjs"
import { Point } from "./classes/data/point.mjs"
import { Rect } from "./classes/data/rect.mjs"
import { Scene } from "./classes/scene/index.mjs"
import { SceneWithUpdateLoop } from "./classes/scene/scene-with-update-loop.mjs"
import { Vector2 } from "@jrc03c/vector2"

Thing.classRegistry["Vector2"] = Vector2

export {
  Component,
  Mouse,
  Point,
  Rect,
  Scene,
  SceneWithUpdateLoop,
  Thing,
  Vector2,
}
