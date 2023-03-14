# bl4st

Livecodable real-time fractal flames in the browser.

[Flam3's](https://flam3.com/) are a type of Iterated Function System that
generate fractals that can look similar to flames.

This is a very computationly expensive operation that can be tricky to
parallelize. Thanks to [Orion Sky Lawlor](https://www.cs.uaf.edu/~olawlor/2011/gpuifs/)
and [Juergen Wothke](http://www.wothke.ch/ablaze/) we can build and run flames in 
real-time in the browser.

The goal is to provide a framework to for accelerate exploration of and performance
with fractal flames.


## Guide

Flames configs can be built by calling the `flame` function, and setting various properties
of the flame:
```
flame()
    .colorful(.4)
    .exposure(3)
```

Flames are essentially a set of transforms applied recursively to an initial state. These
transforms apply some affine transformation on the coordinate system using the `x`, `y`, and `o`
vector properties and a `wvar` scalar. The result of this affine transformation is fed into
the a function based on the `variation`, which further alters the coordinate system.

For example, if you wanted to add a linear (just the affine part) transform to a flame you could do:

```
flame()
  .colorful(.4)
  .exposure(3)
  .addTransform(
    transform()
    .linear()
    .x([1.05,0])
    .y([0,1.05])
    .o([0, 0])
  )
```

This is essentially taking the initial state (just a square), stretching it out, and mapping the
output intensity to some color.

Things get more intersting if we start stacking transforms and playing with the `o` vector:

```
flame()
  .colorful(.4)
  .exposure(3)
  .addTransform(
    transform()
    .linear()
    .x([1,0])
    .y([0,1])
    .o([0.1, 0.1])
  )
  .addTransform(
    transform()
    .linear()
    .x([0, -1])
    .y([0.2, 0])
    .o([0, 0])
  )
```

Check out the full list of [supported variations](README.md#Variations)

Transforms can also be animated over time by providing any of the properties a function:
```
flame()
  .colorful(.4)
  .exposure(3)
  .addTransform(
    transform()
    .linear()
    .x([1,0])
    .y([0,1])
    .o([0.1, 0.1])
  )
  .addTransform(
    transform()
    .linear()
    .x(({time}) => [0, Math.sin(time)])
    .y(({time}) => [Math.cos(time), 0])
    .o([0, 0])
  )
```

For convenience, you can also make any of the vectors rotate over time by supplying
`angle`, `speed`, and `radius` (which can also be functions).
```
flame()
  .colorful(.4)
  .exposure(3)
  .addTransform(
    transform()
    .linear()
    .x([1,0])
    .y([0,1])
    .rotateO(1, 1, ({time})=>Math.abs(Math.sin(time)))
  )
  .addTransform(
    transform()
    .linear()
    .x([0, -1])
    .y([0.2, 0])
  )
```


## Variations

The following transform variations are supported:
* linear
* sinusoidal
* spherical
* swirl
* horseshoe
* polar
* handkerchief
* heart
* disc
* spiral
* hyperbolic
* diamond
* ex
* julia
* bent
* fisheye
* exponential
* power
* cosine

This is only a subset of the [standard flam3 variations](https://github.com/scottdraves/flam3/wiki/Catalog-of-Variations#flam3-28-variations)
due to limitations around running on the GPU. If you can come up with the inverse for 
any of these variation functions, please submit a PR!

## More Examples

```
flame()
  .screenInitScale(.2)
  .screenInitVal(.8)
  .colorful(0.4)
  .mapExposure(1.6)
  .addTransform(
    transform()
    .linear()
    .weight(.8)
    .o(({time}) => [Math.sin(time/5), Math.sin(time/3)])
    .build()
  )
  .addTransform(
    transform()
    .weight(.1)
    .fisheye()
    .x([.1,8])
    .y([4,.1])
    .y([7,.1])
    .build()
  )
  .iterations(4)
  .firstLevel(7)
  .lastLevel(12)
```

### Using bl4st in hydra

```
await import("https://emptyfla.sh/bl4st/bundle-global.js")

flameEngine.setConfig(
	flame()
	.colorful(.7)
	.mapExposure(2)
	.addTransform(
		transform()
		.hyperbolic()
		.rotateX()
		.build()
	)
	.addTransform(
		transform()
		.fisheye()
		.rotateY()
		.build()
	)
	.addTransform(
		transform()
		.fisheye()
		.rotateO()
		.build()
	)
)

flameEngine.start()

s0.init({
	src: flameEngine.canvas
})

src(o0)
	.layer(
		src(s0)
		.luma())
	.scale(1.002)
	.modulateRotate(noise(1), .01)
	.out()
```
