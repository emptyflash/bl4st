# bl4st

Livecodable real-time fractal flames in the browser.

[Flam3's](https://flam3.com/) are a type of Iterated Function System that
generate fractals that can look similar to flames (hence the name).

This is a very computationly expensive operation that can be tricky to
parallelize. Thanks to [Orion Sky Lawlor](https://www.cs.uaf.edu/~olawlor/2011/gpuifs/)
and [Juergen Wothke](http://www.wothke.ch/ablaze/) we can build and run flames in 
real-time in the browser.

The goal is to provide a framework to for accelerate exploration of and performance
with fractal flames.

## Example

More examples and explanations to come
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
