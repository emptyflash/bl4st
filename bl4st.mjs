import {
  FlameConfig,
  FlameTransform,
  variation_list,
} from "./ablaze.mjs"

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

  build() {
    return new FlameTransform(this._weight, this._name, this._wvar, this._x, this._y, this._o)
  }
}

export function transform() {
  return new TransformBuilder()
}

export function flame() {
  return new FlameConfig()
}
