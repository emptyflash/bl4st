import {
  FlameConfig,
  FlameTransform,
  variation_list,
  handleLookup,
} from "./ablaze.mjs"
import { vec2 } from "gl-matrix";

export class TransformBuilder {
  constructor() {
    this._name = "linear"
    this._weight = 0.5
    this._wvar = 1
    this._x = [0.5, 0.5]
    this._y = [-1, .5]
    this._o = [0, 0]
    const self = this
    variation_list.forEach((v) => {
      const name = v.getName()
      self[name] = () => {
        self.name(name)
        return self
      }
    })
  }

  name(n) {
    this._name = n
    return this
  }

  weight(w) {
    this._weight = w
    return this
  }

  wvar(w) {
    this._wvar = w
    return this
  }

  x(v) {
    this._x = v
    return this
  }

  y(v) {
    this._y = v
    return this
  }

  o(v) {
    this._o = v
    return this
  }

  _rotate(prop, angle, speed, radius) {
    angle = angle || .1
    speed = speed || .1
    radius = radius || .5
    this[prop] = function ({time}) {
      let amount = handleLookup(this, angle) + handleLookup(this, speed) * time
      return vec2.rotate(
        vec2.create(),
        [handleLookup(this, radius), 0],
        vec2.create(),
        amount
      )
    }
    return this
  }

  rotateX(angle, speed, radius) {
    return this._rotate("_x", angle, speed, radius)
  }

  rotateY(angle, speed, radius) {
    return this._rotate("_y", angle, speed, radius)
  }

  rotateO(angle, speed, radius) {
    return this._rotate("_o", angle, speed, radius)
  }

  build() {
    return new FlameTransform(this._weight, this._name, this._wvar, this._x, this._y, this._o)
  }
}

class NewFlameConfig extends FlameConfig {
  addTransform(t) {
    let transform = t;
    if (transform instanceof TransformBuilder) {
      transform = transform.build()
    }
    this.xf.push(transform);
    return this
  }

  initVal(v) {
    this.screen_initval = v;
    return this
  }

  initScale(s) {
    this.screen_initscale = s;
    return this
  }

  exposure(e) {
    this.map_exposure = e;
    return this;
  }
}

export function transform() {
  return new TransformBuilder()
}

export function flame() {
  return new NewFlameConfig()
}
