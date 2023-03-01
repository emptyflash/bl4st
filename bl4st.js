var regl = createREGL({
  optionalExtensions: [
    "ext_texture_filter_anisotropic",
  ]
})

const height = window.innerHeight;
const width = window.innerWidth;

const config = createFlameConfigX6();
const furnance = new Furnance(regl._gl)
furnance.setConfig(config)

const seedShader = furnance.getSeedShaderCode()

const texScale = config.getTexScale();
const screenInitScale = config.getScreenInitScale()
const screenInitVal = config.getScreenInitVal()
const texCoord = screenInitScale * (furnance.TXfmPL(1, texScale) - furnance.TXfmPL(0, texScale))
const vertices = regl.buffer([
  0, 0, 0, 0,
  texCoord, 0, texCoord, 0,
  0, texCoord, texCoord, 0,
])
const matrix = [ // TODO does it matter if this is hardcoded
  2, 0, 0, 0,
  0, 2, 0, 0,
  0, 0, 0.009999999776482582, 0,
  0, 0, 0, 1,
]
const color = [screenInitVal, screenInitVal, screenInitVal, 1]

const drawSeedTexture = regl({
  vert: seedShader["vert"],
  frag: seedShader["frag"],
  attributes: {
    a_Vertex: {
      buffer: vertices,
      size: 3,
    }
  },
  uniforms: {
    u_color: color,
    mvp_matrix: matrix,
  },
  primitive: "triangle strip",
  count: 4,
  depth: {
    enable: false
  },
  blend: {
    enable: true,
    color: [0, 0, 0, 0],
    func: {
      dstAlpha: 1,
      dstRGB: 1,
      srcAlpha: 1,
      srcRGB: 1,
    },
    equation: {
      alpha: "add",
      rgb: "add",
    }
  }
})


const perPixelMapShader = furnance.getPerPixelMapShaderCode(config.getFlameTransforms())
function mapColor(config, o) {
  var i = 1,
    n = 1,
    l = 1,
    s = config.getColorful();
  const xfms = config.getFlameTransforms()
  switch (o % 3) {
    case 0:
      i -= s;
      break;
    case 1:
      n -= s;
      break;
    case 2:
      l -= s;
  }
  var c = config.getMapExposure();
  if (0 > c) {
    var f;
    (f = i), (i = n), (n = f), (f = l), (l = n), (n = f);
  }
  var u = Math.abs(c) * xfms[o].getWeight();
  return new Float32Array([u * i, u * n, u * l, 1]);
}
function buildPerPixelUniforms(config) {
  const uniforms = {};
  const xfms = config.getFlameTransforms()
  for (let i = 0; i < xfms.length; i++) {
    const xfm = xfms[i]
    const xfUniform = []
    xfm.getXfUniforms(xfUniform)
    xfUniform.forEach((v, k) => {
      uniforms[`xf${xfm.getTag()}[${k}]`] = v
    })
    uniforms[`color${xfm.getTag()}`] = mapColor(config, i)
  }
  return uniforms;
}
const drawPerPixelMaps = regl({
  vert: perPixelMapShader["vert"],
  frag: perPixelMapShader["frag"],
  uniforms: {
    tex: regl.prop("texture"),
    texscale: config.getTexScale(),
    texscalei: 1/config.getTexScale(),
    leg_gl_ModelViewMatrix: [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ],
    leg_gl_ProjectionMatrix: [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ],
    ...buildPerPixelUniforms(config),
  },
  attributes: {
    leg_gl_Vertex: {
      buffer: [
        -1, -1, 0.5, -1,
        1, 0.5, 1, -1,
        0.5, 1, 1, 0.5
      ],
      size: 3,
    }
  },
  primitive: "triangle strip",
  count: 4,
  depth: {
    enable: false
  },
  blend: {
    enable: false,
    color: [0, 0, 0, 0],
    func: {
      dstAlpha: 1,
      dstRGB: 1,
      srcAlpha: 1,
      srcRGB: 1,
    },
    equation: {
      alpha: "add",
      rgb: "add",
    }
  }
})

function getTextureLevels(config) {
  const endLevel = config.getNLevel();
  const textureLevels = Array(endLevel+1).fill(0).map(_ => []);
  for (let i = 0; i <= endLevel; i++) {
    const size = 1 << i
    for (let j = 0; j < 2; j++) {
      textureLevels[i][j] = regl.framebuffer({
        color: regl.texture({
          width: size,
          height: size,
          mag: "linear",
          min: "mipmap",
          wrap: ["repeat", "repeat"],
          anisotropic: 16, // TODO seems like this isn't getting set
          depthStencil: false
        })
      })
    }
  }
  return textureLevels;
}
const textureLevels = getTextureLevels(config)

regl.frame(function ({tick}) {
    for (let l = config.getFirstLevel(); l <= config.getLastLevel(); l++) {
      for (let i = 0; i < config.getIterations(); i++) {
        textureLevels[l][i%2].use(() => {
          if (i === 0 ) {
            if (l === config.getFirstLevel()) {
              regl.clear({
                  color: [0, 0, 0, 1]
              })
              drawSeedTexture()
            } else {
              drawPerPixelMaps({ texture: textureLevels[l-1][1] })
            }
          } else {
            drawPerPixelMaps({ texture: textureLevels[l][(i+1)%2] })
          }
        })
      }
    }
    drawPerPixelMaps({ texture: textureLevels[config.getLastLevel()][0] })
})
