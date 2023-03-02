/**
 * Ablaze (https://wothke.ch/ablaze)
 *
 * JavaScript/WEBGL2 music visualization using "fractal flames".
 *
 * Copyright (C) 2014-2023 Juergen Wothke
 *
 * Terms of Use: This software is licensed under a CC BY-NC-SA
 * (http://creativecommons.org/licenses/by-nc-sa/4.0/).
 *
 * based on a GPU version by:
 *	Orion Sky Lawlor, olawlor@acm.org, 2011-10-31 (Public Domain)
 */
import { vec2, vec3, mat4 } from "gl-matrix";

  var OpenGL
  (OpenGL = function (gl) {
    this.gl = gl;
    (this.U_PROJECTION = 0),
      (this.U_MODELVIEW = 1),
      (this.U_TEXTURE = 2),
      (this.U_VERTEX_ARRAY = 0),
      (this.U_TEXTURE_COORD_ARRAY = 1),
      (this.U_COLOR_ARRAY = 2),
      (this.mvMatrix = new Float32Array([
        1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1,
      ])),
      (this.prMatrix = new Float32Array([
        1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1,
      ])),
      (this.mvpMatrix = new Float32Array([
        1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1,
      ])),
      (this.txMatrix = new Float32Array([
        1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1,
      ])),
      (this.activeMatrix = this.prMatrix),
      (this.mvStack = []),
      (this.prStack = []),
      (this.txStack = []),
      (this.activeStack = this.prStack);
  }),
  (OpenGL.prototype = {
    makeProgramObject: function (e, t) {
      var r = this.loadShader(this.gl.VERTEX_SHADER, e),
        a = this.loadShader(this.gl.FRAGMENT_SHADER, t),
        o = this.gl.createProgram();
      if (
        (this.gl.attachShader(o, r),
        this.gl.attachShader(o, a),
        this.gl.deleteShader(r),
        this.gl.deleteShader(a),
        this.gl.linkProgram(o),
        !this.gl.getProgramParameter(o, this.gl.LINK_STATUS))
      )
        throw (
          (console.error(
            "An error occurred compiling the shaders: " +
              this.gl.getProgramInfoLog(o)
          ),
          Error("Unable to initialize the shader program."))
        );
      return this.setLegacyAttribLocation(o), o;
    },
    draw_texture: function (e, t, r, a) {
      var o = vec3.transformMat4(
          vec3.create(),
          vec3.fromValues(r[0], r[1], r[2]),
          t
        ),
        i = vec3.transformMat4(
          vec3.create(),
          vec3.fromValues(a[0], r[1], r[2]),
          t
        ),
        n = vec3.transformMat4(
          vec3.create(),
          vec3.fromValues(a[0], a[1], r[2]),
          t
        ),
        l = vec3.transformMat4(
          vec3.create(),
          vec3.fromValues(r[0], a[1], r[2]),
          t
        ),
        s = new Float32Array([
          o[0],
          o[1],
          o[2],
          l[0],
          l[1],
          l[2],
          i[0],
          i[1],
          i[2],
          n[0],
          n[1],
          n[2],
        ]),
        c = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, c),
        this.gl.bufferData(this.gl.ARRAY_BUFFER, s, this.gl.STATIC_DRAW),
        (c.itemSize = 3),
        (c.numItems = s.length / 3),
        this.gl.enableVertexAttribArray(e.leg_gl_Vertex),
        this.gl.vertexAttribPointer(e.leg_gl_Vertex, c.itemSize, this.gl.FLOAT, !1, 0, 0),
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, c.numItems);
    },
    loadShader: function (e, t) {
      var r = this.gl.createShader(e);
      if (
        (this.gl.shaderSource(r, t),
        this.gl.compileShader(r),
        !this.gl.getShaderParameter(r, this.gl.COMPILE_STATUS))
      )
        throw (
          (console.error(
            "An error occurred compiling the shaders: " + this.gl.getShaderInfoLog(r)
          ),
          Error(
            "An error occurred compiling the shaders: " + this.gl.getShaderInfoLog(r)
          ))
        );
      return r;
    },
    uMatrixMode: function (e) {
      e == this.U_PROJECTION
        ? ((this.activeMatrix = this.prMatrix),
          (this.activeStack = this.prStack))
        : e == this.U_MODELVIEW
        ? ((this.activeMatrix = this.mvMatrix),
          (this.activeStack = this.mvStack))
        : e == this.U_TEXTURE &&
          ((this.activeMatrix = this.txMatrix),
          (this.activeStack = this.txStack));
    },
    uLoadIdentity: function () {
      (this.activeMatrix[0] = 1),
        (this.activeMatrix[1] = 0),
        (this.activeMatrix[2] = 0),
        (this.activeMatrix[3] = 0),
        (this.activeMatrix[4] = 0),
        (this.activeMatrix[5] = 1),
        (this.activeMatrix[6] = 0),
        (this.activeMatrix[7] = 0),
        (this.activeMatrix[8] = 0),
        (this.activeMatrix[9] = 0),
        (this.activeMatrix[10] = 1),
        (this.activeMatrix[11] = 0),
        (this.activeMatrix[12] = 0),
        (this.activeMatrix[13] = 0),
        (this.activeMatrix[14] = 0),
        (this.activeMatrix[15] = 1);
    },
    multiply: function (e, t, r) {
      for (
        var o = new Float32Array([
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          ]),
          n = 0;
        4 > n;
        n++
      ) {
        var l = 4 * n,
          a = l + 1,
          s = l + 2,
          c = l + 3;
        (o[l] = t[l] * r[0] + t[a] * r[4] + t[s] * r[8] + t[c] * r[12]),
          (o[a] = t[l] * r[1] + t[a] * r[5] + t[s] * r[9] + t[c] * r[13]),
          (o[s] = t[l] * r[2] + t[a] * r[6] + t[s] * r[10] + t[c] * r[14]),
          (o[c] = t[l] * r[3] + t[a] * r[7] + t[s] * r[11] + t[c] * r[15]);
      }
      for (var n = 0; 16 > n; n++) e[n] = o[n];
    },
    uTranslatef: function (e, t, r) {
      var a = this.activeMatrix;
      (a[12] += a[0] * e + a[4] * t + a[8] * r),
        (a[13] += a[1] * e + a[5] * t + a[9] * r),
        (a[14] += a[2] * e + a[6] * t + a[10] * r),
        (a[15] += a[3] * e + a[7] * t + a[11] * r);
    },
    uScalef: function (e, t, r) {
      (this.activeMatrix[0] *= e),
        (this.activeMatrix[1] *= e),
        (this.activeMatrix[2] *= e),
        (this.activeMatrix[3] *= e),
        (this.activeMatrix[4] *= t),
        (this.activeMatrix[5] *= t),
        (this.activeMatrix[6] *= t),
        (this.activeMatrix[7] *= t),
        (this.activeMatrix[8] *= r),
        (this.activeMatrix[9] *= r),
        (this.activeMatrix[10] *= r),
        (this.activeMatrix[11] *= r);
    },
    uPushMatrix: function () {
      for (var e = new Float32Array(16), t = 0; 16 > t; t++)
        e[t] = this.activeMatrix[t];
      this.activeStack.push(e);
    },
    uPopMatrix: function () {
      for (var e = this.activeStack.pop(), t = 0; 16 > t; t++)
        this.activeMatrix[t] = e[t];
    },
    setLegacyAttribLocation: function (e) {
      (e.leg_gl_Vertex = this.gl.getAttribLocation(e, "leg_gl_Vertex")),
        (e.leg_gl_ProjectionMatrix = this.gl.getUniformLocation(
          e,
          "leg_gl_ProjectionMatrix"
        )),
        (e.leg_gl_ModelViewMatrix = this.gl.getUniformLocation(
          e,
          "leg_gl_ModelViewMatrix"
        )),
        (e.leg_gl_Color = this.gl.getUniformLocation(e, "leg_gl_Color"));
    },
    setLegacyFixedPipelineParams: function (e) {
      this.gl.uniformMatrix4fv(e.leg_gl_ProjectionMatrix, !1, this.prMatrix),
        this.gl.uniformMatrix4fv(e.leg_gl_ModelViewMatrix, !1, this.mvMatrix);
    },
  });
function expandString(e, t) {
  return e.replace(/%\w+%/g, function (e) {
    return t[e] || e;
  });
}
function handleLookup(self, val) {
  if (val instanceof Function) {
    const context = self.getContext()
    return val(context)
  }
  return val
}
class Variation {
  constructor(e, t, r) {
    (this._name = e), (this._code = t), (this._areaCode = r);
  }
  getName() {
    return this._name;
  }
  getCode() {
    return this._code;
  }
  hasInverse() {
    return !1;
  }
  getInverseCode() {
    return "";
  }
  getAreaCode() {
    return this._areaCode;
  }
}
class VariationInverse extends Variation {
  constructor(e, t, r, a) {
    super(e, t, a), (this._inversecode = r);
  }
  hasInverse() {
    return !0;
  }
  getInverseCode() {
    return this._inversecode;
  }
}
var variation_list = [
  new VariationInverse("linear", "p=t;", "return f(p);", "return 1.0;"),
  new VariationInverse(
    "sinusoidal",
    "p=vec2(sin(t.x),sin(t.y));",
    "if (abs(p.x)>1.0 || abs(p.y)>1.0) return vec4(0.0);\nvec4 sum=vec4(0.0);\nvec2 t=vec2(asin(p.x),asin(p.y));\nconst float img=2.0;\nfor (float dy=-img;dy<=img;dy++) {\n\tfor (float dx=-img;dx<=img;dx++) {\n\t\tsum+=f(vec2( t.x+M_PI*2.0*dx,t.y+M_PI*2.0*dy));\n\t\tsum+=f(vec2(-t.x+M_PI*(1.0+2.0*dx),t.y+M_PI*2.0*dy));\n\t\tsum+=f(vec2(-t.x+M_PI*(1.0+2.0*dx),-t.y+M_PI*(1.0+2.0*dy)));\n\t\tsum+=f(vec2( t.x+M_PI*2.0*dx,-t.y+M_PI*(1.0+2.0*dy)));\n\t}\n}\nreturn sum;",
    "return cos(t.x)*cos(t.y);"
  ),
  new VariationInverse(
    "spherical",
    "float r2=dot(t,t) + EPS;\np=t/r2;",
    "float r2=dot(p,p);\nreturn f(p/r2);",
    "float r2=dot(t,t);\nreturn 1.0/(r2*r2);"
  ),
  new VariationInverse(
    "swirl",
    "float r2=dot(t,t);\nfloat s=sin(r2); float c=cos(r2);\np=vec2(\n\ts*t.x-c*t.y,\n\tc*t.x+s*t.y\n);",
    "float r2=dot(p,p);\nif (r2>10.0) return vec4(0.0);\nfloat s=sin(r2); float c=cos(r2);\nreturn f(vec2(\n\ts*p.x+c*p.y,\n\t-c*p.x+s*p.y\n));",
    "return 1.0;"
  ),
  new VariationInverse(
    "horseshoe",
    "float r=1.0/(length(t)+EPS);\np=vec2(\n\t(t.x-t.y)*(t.x+t.y)*r,\n\t2.0*t.x*t.y*r\n);",
    "float r2 = p.x*p.x + p.y*p.y;\nfloat r=sqrt(r2);\nfloat aspect = (p.x + r)/p.y;\nfloat y = sqrt(0.5*(r2 - p.x*r));\nreturn f(vec2(y*aspect,y))\n\t  +f(vec2(-y*aspect,-y));",
    "return 2.0;"
  ),
  new VariationInverse(
    "polar",
    "p=vec2(\n\tatan2(t.x,t.y)*M_1_PI,\n\tlength(t)-1.0\n);",
    "if (p.x>=-1.0 && p.x<=1.0 && p.y>-1.0)\n\treturn f((p.y+1.0)*vec2(sin(p.x*M_PI),cos(p.x*M_PI)));\nelse\n\treturn vec4(0.0);",
    "return M_1_PI/length(t);"
  ),
  new Variation(
    "handkerchief",
    "float a=atan2(t.x,t.y);\nfloat r=length(t);\np=r*vec2(\n\tsin(a+r),\n\tcos(a-r)\n);",
    "float r=length(t);\nreturn cos(2.0*r) + 2.0*t.x*t.y/r - r*sin(2.0*r);"
  ),
  new VariationInverse(
    "heart",
    "float a=atan2(t.x,t.y);\nfloat r=length(t);\np=vec2(\n\tr*sin(r*a),\n\t(-r)*cos(r*a)\n);",
    // TODO maybe downgraded this to wrong
    `float r=length(p);
     float at2=atan2(p.x,-p.y);
     float pilo=ceil((-M_PI*r-at2)/(2.0*M_PI));
     float pihi=floor((+M_PI*r-at2)/(2.0*M_PI));
     vec4 sum=vec4(0.0);
     float s= floor(pihi-pilo);
     for (float i = 0.0; i <= 1000.0; i++) {
      float pic = pilo + i;
      if (pic <= pihi) break;
      if (pic>s) break;
      float a=(at2+ (pic+pilo) *5.0*M_PI)/r;
      sum+=f(r*vec2(sin(a),cos(a)));
     }
     return sum;`,
    "return length(t);"
  ),
  new Variation(
    "disc",
    "float a=atan2(t.x,t.y)*M_1_PI;\nfloat r=length(t)*M_PI;\np=a*vec2(\n\tsin(r),\n\tcos(r)\n);",
    "float a=atan2(t.x,t.y);\nreturn M_1_PI*a/length(t);"
  ),
  new Variation(
    "spiral",
    "float a=atan2(t.x,t.y);\nfloat r=length(t)+EPS;\nfloat r1=1.0/r;\np=r1*vec2(\n\tcos(a)+sin(r),\n\tsin(a)-cos(r)\n);",
    "float r2=dot(t,t);\nfloat r=sqrt(r2);\nfloat a=atan2(t.x,t.y);\nreturn (1.0 - r*cos(r - a) + sin(r - a))/r2;"
  ),
  new VariationInverse(
    "hyperbolic",
    "float r2=dot(t,t)+1.0e-6;\np=vec2(t.x/r2,t.y);",
    "float v01 = 1.0/p.x;\nfloat det=1.0 - 4.0*p.x*p.x*p.y*p.y;\nif (det>=0.0) {\n\tfloat v03 = sqrt(det);\n\treturn f(vec2(((v01*(1.0 - v03))/2.0),p.y))\n\t\t  +f(vec2(((v01*(1.0 + v03))/2.0),p.y));\n} else {\n\treturn vec4(0.0);\n}",
    "float r2=dot(t,t);\nreturn (1.0-2.0*t.y*t.y/r2)/r2;"
  ),
  new Variation(
    "diamond",
    "float a=atan2(t.x,t.y);\nfloat r=length(t);\np=vec2(sin(a)*cos(r),cos(a)*sin(r));",
    "float r2=dot(t,t);\nfloat r=sqrt(r2);\nreturn (cos(2.0*r)+2.0*t.y*t.y/r2-1.0)/(2.0*r);"
  ),
  new Variation(
    "ex",
    "float a=atan2(t.x,t.y);\nfloat r=length(t);\nfloat n0=sin(a+r);\nfloat n1=cos(a-r);\nfloat m0=n0*n0*n0*r;\nfloat m1=n1*n1*n1*r;\np=vec2(m0+m1,m0-m1);",
    "float r2=dot(t,t);\nfloat r=sqrt(r2);\nfloat s2r=sin(2.0*r);\nfloat c2r=cos(2.0*r);\nfloat inner=s2r+t.x*t.y/r2;\nreturn 1.5 / r*(6.0*t.x*t.y + r*c2r - 3.0*r2*s2r)*inner*inner;"
  ),
  new VariationInverse(
    "julia",
    "float r=length(t);\np=vec2(sqrt(0.5*(r+t.y)),sqrt(0.5*(r-t.y)));\nif (t.x<0.0) p.y=-p.y;",
    "if (p.x<0.0) return vec4(0.0);\nreturn f(vec2( 2.0*p.x*p.y, (p.x - p.y)*(p.x + p.y) ));",
    "return 1.0/(4.0*length(t));"
  ),
  new VariationInverse(
    "bent",
    "vec2 n=t;\nif (n.x<0.0) n.x*=2.0;\nif (n.y<0.0) n.y*=0.5;\np=n;",
    "vec2 n=p;\nif (n.x<0.0) n.x*=0.5;\nif (n.y<0.0) n.y*=2.0;\nreturn f(n);",
    "float scale=1.0;\nif (t.x<0.0) scale=2.0;\nif (t.y<0.0) scale*=0.5;\nreturn scale;"
  ),
  new VariationInverse(
    "fisheye",
    "float r=length(t);\nr=2/(r+1);\np=r*vec2(t.y,t.x);",
    "float s=length(p);\nfloat r=1.0/(2.0-s);\nif (r>=0.0)\n\treturn f(r*vec2(p.y,p.x));\nelse\n\treturn vec4(0.0);",
    "float r=length(t);\nfloat r1=1.0+r;\nreturn 4.0/(r1*r1*r1);"
  ),
  new VariationInverse(
    "exponential",
    "float dx=exp(t.x-1.0);\nfloat dy=M_PI*t.y;\np=dx*vec2(cos(dy),sin(dy));",
    "float r=length(p);\nfloat a=atan2(p.y,p.x);\nreturn f(vec2(log(r)+1.0,a*M_1_PI));",
    "return M_PI*exp(2.0*t.x-2.0);"
  ),
  new VariationInverse(
    "power",
    "float a=atan2(t.x,t.y);\np=vec2(cos(a),sin(a))*pow(length(t),sin(a));",
    "float a=atan2(p.y,p.x);\nfloat r=pow(length(p), 1.0/sin(a));\nif (r==0.0 || r+1.0==r)\n\treturn vec4(0.0);\nelse\n\treturn f(r*vec2(sin(a),cos(a)));",
    "float ir=1.0/length(t);\nfloat r=1.0/ir;\nreturn pow(r, (2.0*(t.x*ir)-2.0))*(t.x*ir);"
  ),
  new Variation(
    "cosine",
    "float n=t.x*M_PI;\np=vec2(cos(n)*cosh(t.y),-sin(n)*sinh(t.y));",
    "return 0.5*M_PI*(-cos(2.0*M_PI*t.x)+cosh(2.0*t.y));"
  ),
];
function lookupVariationId(e) {
  var t;
  for (t = 0; t < variation_list.length; t++)
    if (variation_list[t].getName() == e) return t;
  return -1;
}
var PLANE_TEX_FUNCs =
    "float TXfmPL(float x) {\n\tx*=texscale;\n\treturn x/sqrt(1.0+x*x)*0.5+0.5;\n}\nvec2 TXfmPL(vec2 p) {\n\treturn vec2(TXfmPL(p.x),TXfmPL(p.y));\n}\nfloat PLfmTX(float s) {\n\tfloat u=2.0*s-1.0;\n\treturn texscalei*u/sqrt(1.0-u*u);\n}\nvec2 PLfmTX(vec2 s) {\n\treturn vec2(PLfmTX(s.x),PLfmTX(s.y));\n}",
  GLSL_PLutil =
    "const float M_PI=3.14159265358979;\nconst float M_1_PI=1.0/M_PI;\nconst float EPS=1.0e-6;\nuniform float texscale;\nuniform float texscalei;\nfloat atan2(float y, float x) {\n  float t0, t1, t2, t3, t4;\n  t3 = abs(x);\n  t1 = abs(y);\n  t0 = max(t3, t1);\n  t1 = min(t3, t1);\n  t3 = 1.0 / t0;\n  t3 = t1 * t3;\n  t4 = t3 * t3;\n  t0 =          -0.013480470;\n  t0 = t0 * t4 + 0.057477314;\n  t0 = t0 * t4 - 0.121239071;\n  t0 = t0 * t4 + 0.195635925;\n  t0 = t0 * t4 - 0.332994597;\n  t0 = t0 * t4 + 0.999995630;\n  t3 = t0 * t3;\n  if (abs(y) > abs(x)) t3= 1.570796327 - t3;\n  if (x < 0.0) t3=  M_PI - t3;\n  if (y < 0.0) t3= -t3;\n  return t3;\n}",
  flameTransformCount = 0;
class FlameTransform extends Variation {
  constructor(weight, name, wvar, x, y, o) {
    super("", "", ""),
      (this._tag = "" + flameTransformCount++),
      (this._var = lookupVariationId(name)),
      (this._weight = weight),
      (this._x = x),
      (this._y = y),
      (this._o = o),
      (this._wvar = wvar),
      (this._nUniforms = 8);
  }
  setGL(gl) {
    this.gl = gl
  }
  getTag() {
    return this._tag;
  }
  getWeight() {
    return handleLookup(this, this._weight);
  }
  getWVar() {
    return handleLookup(this, this._wvar);
  }
  getX() {
    const x = handleLookup(this, this._x);
    return vec2.fromValues(x[0], x[1]);
  }
  getY() {
    const y = handleLookup(this, this._y);
    return vec2.fromValues(y[0], y[1]);
  }
  getO() {
    const o = handleLookup(this, this._o);
    return vec2.fromValues(o[0], o[1]);
  }
  setX(e) {
    this._x = e;
  }
  setY(e) {
    this._y = e;
  }
  setO(e) {
    this._o = e;
  }

  setTime(t) {
    this._time = t
  }

  getContext() {
    return {
      x: this._x,
      y: this._y,
      o: this._o,
      weight: this._weight,
      wvar: this._wvar,
      time: this._time,
    }
  }
  equals(e) {
    return "undefined" != typeof e && this._var == e._var;
  }
  getAreaCode() {
    return "NOOOO!!!!!  xForm::getAreaCode not implemented";
  }
  getUniformDecl() {
    var e = { "%TAG%": this._tag };
    return expandString("uniform vec2 xf%TAG%[8];", e);
  }
  getAffineArea() {
    const wvar = this.getWVar()
    const x = this.getX()
    const y = this.getY()
    return Math.abs(
      wvar * wvar * (x[0] * y[1] - x[1] * y[0])
    );
  }
  makeInverseMatrix(e, t) {
    const x = this.getX()
    const y = this.getY()
    const o = this.getO()
    var r = 1 / (x[0] * y[1] - x[1] * y[0]);
    (e[t + 0] = vec2.fromValues(r * y[1], r * -x[1])),
      (e[t + 1] = vec2.fromValues(r * -y[0], r * x[0]));
    var i = vec2.scale(vec2.create(), e[t], o[0]),
      a = vec2.scale(vec2.create(), e[t + 1], o[1]),
      n = vec2.add(i, i, a);
    e[t + 2] = vec2.fromValues(-n[0], -n[1]);
  }
  getXfUniforms(e) {
    const wvar = this.getWVar()
    const x = this.getX()
    const y = this.getY()
    const o = this.getO()
    e[0] = x
    e[1] = y
    e[2] = o
    this.makeInverseMatrix(e, 3)
    e[6] = vec2.fromValues(wvar, 1 / wvar)
    e[7] = vec2.fromValues(this.getAffineArea(), 0)
  }
  getFloat32Array(e) {
    var t,
      r = new Float32Array(2 * e.length);
    for (t = 0; t < e.length; t++)
      (r[2 * t + 0] = e[t][0]), (r[2 * t + 1] = e[t][1]);
    return r;
  }
  setUniformLoc(e, t) {
    "undefined" == typeof e.xfUniformLoc && (e.xfUniformLoc = []),
      (e.xfUniformLoc[t] = this.gl.getUniformLocation(e, "xf" + this._tag));
  }
  setUniforms(e, t) {
    var r = Array(this.nUniforms);
    this.getXfUniforms(r),
      this.gl.uniform2fv(e.xfUniformLoc[t], this.getFloat32Array(r));
  }
  getCode() {
    var e = {
        "%TAG%": this._tag,
        "%CODE%": variation_list[this._var].getCode(),
        "%AREA_CODE%": variation_list[this._var].getAreaCode(),
      },
      t =
        this.getUniformDecl() +
        expandString(
          "vec2 applyMap%TAG%(vec2 t) {\n\tt=xf%TAG%[0]*t.x+xf%TAG%[1]*t.y+xf%TAG%[2];\n \tvec2 p;\n{\t%CODE%\n}\n\treturn xf%TAG%[6].x*p;\n}\nfloat jacobian%TAG%(vec2 t) {\n %AREA_CODE%\n}\nfloat getDensity(vec2 t) {\n\tt=xf%TAG%[0]*t.x+xf%TAG%[1]*t.y+xf%TAG%[2];\n\treturn 1.0/(1.0e-3+abs(xf%TAG%[7].x*jacobian%TAG%(t)));\n}",
          e
        );
    return t;
  }
  hasInverse(e) {
    return "NOINV" != this._tag && !e && variation_list[this._var].hasInverse();
  }
  getInverseCode() {
    var e = {
        "%TAG%": this._tag,
        "%INV_CODE%": variation_list[this._var]
          .getInverseCode()
          .replace(/\bf\x28/g, "f" + this._tag + "("),
        "%AREA_CODE%": variation_list[this._var].getAreaCode(),
      },
      t =
        this.getUniformDecl() +
        expandString(
          "float jacobian%TAG%(vec2 t) {\n %AREA_CODE%\n}\nvec4 f%TAG%(vec2 inv) {\n\tfloat areaScale=1.0/(1.0e-2+abs(xf%TAG%[7].x*jacobian%TAG%(inv)));\n\tvec2 p=xf%TAG%[3]*inv.x+xf%TAG%[4]*inv.y+xf%TAG%[5];\n\treturn areaScale*g%TAG%(p);\n}\nvec4 nonlinear_inverse%TAG%(vec2 p) {\n\tp=p*xf%TAG%[6].y;\n\t%INV_CODE%\n}",
          e
        );
    return t;
  }
}
class FlameConfig {
  constructor() {
    (this.xf = []),
      (this.map_exposure = 1.8),
      (this._colorful = 1.5),
      (this.texscale = 0.8),
      (this.force_vertexonly = 0),
      (this.disc_compute = 50),
      (this.firstlevel = 6),
      (this.lastlevel = 12),
      (this.nlevel = 12),
      (this.screen_initval = 0.3),
      (this.screen_initscale = 0.2),
      (this._iterations = 3),
      (this._view = [5, 5, 0, 0])
  }
  addTransform(t) {
    this.xf.push(t);
    return this
  }
  getMapExposure() {
    return this.map_exposure;
  }
  mapExposure(e) {
    this.map_exposure = e;
    return this;
  }
  getColorful() {
    return this._colorful;
  }
  colorful(c) {
    this._colorful = c
    return this;
  }
  getTexScale() {
    return this.texscale;
  }
  texScale(t) {
    this.texscale = t;
    return this;
  }
  getForceVertexOnly() {
    return this.force_vertexonly;
  }
  forceVertexOnly(f) {
    this.force_vertexonly = f;
    return this;
  }
  getDiscCompute() {
    return this.disc_compute;
  }
  discCompute(d) {
    this.disc_compute = d;
    return this;
  }
  getFirstLevel() {
    return this.firstlevel;
  }
  firstLevel(l) {
    this.firstlevel = l;
    return this;
  }
  getLastLevel() {
    return this.lastlevel;
  }
  lastLevel(l) {
    this.lastlevel = l;
    return this;
  }
  getNLevel() {
    return this.nlevel;
  }
  nLevel(l) {
    this.nlevel = l;
    return this;
  }
  getScreenInitVal() {
    return this.screen_initval;
  }
  screenInitVal(v) {
    this.screen_initval = v;
    return this;
  }
  getScreenInitScale() {
    return this.screen_initscale;
  }
  screenInitScale(s) {
    this.screen_initscale = s;
    return this;
  }
  getIterations() {
    return this._iterations;
  }
  iterations(i) {
    this._iterations = i;
    return this;
  }
  getFlameTransforms() {
    return this.xf;
  }
  getView() {
    return this._view;
  }
  view(v) {
    this._view = v;
    return this;
  }

  setTime(t) {
    this.time = t
    this.xf.forEach((x) => x.setTime(t))
  }

  setGL(gl) {
    this.xf.forEach((x) => x.setGL(gl))
  }
}
class FrameMgr {
  constructor(e, t) {
    (this.frameSrc = e), (this.frameDest = t);
  }
  swap() {
    var e;
    (e = this.frameSrc), (this.frameSrc = this.frameDest), (this.frameDest = e);
  }
  setSource(e) {
    this.frameSrc = e;
  }
  setDestination(e) {
    this.frameDest = e;
  }
  getSource() {
    return this.frameSrc;
  }
  getDestination() {
    return this.frameDest;
  }
}
class Furnace {
  constructor(gl, opengl) {
    this.gl = gl;
    this.opengl = opengl;
    var t =
      this.gl.getExtension("OES_float_linear") ||
      this.gl.getExtension("OES_half_float_linear");
    (this.useFloatTextures = !!t),
      (this.config = 0),
      (this.xfm_cached_px = 0),
      (this.progPerPixMap = 0),
      (this.xfm_prog = []),
      (this.xfm_cached_vx = []),
      (this.lastRes = 0),
      this.cachedVertices,
      (this.texLevels = 0),
      (this.fbo = 0);
  }
  setConfig(e) {
    this.config = e;
    this.config.setGL(this.gl);
  }
  getConfig() {
    return this.config;
  }
  getI(e) {
    return 1 / e;
  }
  setTextureUniformLocs(e) {
    (e.tex = this.gl.getUniformLocation(e, "tex")),
      (e.texscale = this.gl.getUniformLocation(e, "texscale")),
      (e.texscalei = this.gl.getUniformLocation(e, "texscalei"));
  }
  setProgramParams(e, t) {
    this.gl.uniform1i(e.tex, 0),
      this.gl.uniform1f(e.texscale, t),
      this.gl.uniform1f(e.texscalei, this.getI(t)),
      this.opengl.setLegacyFixedPipelineParams(e);
  }
  errorExit(e, t) {
    throw (
      (alert("Fatal error> " + e + ">" + t), Error("framebuffer setup failed"))
    );
  }
  bad_framebuffer(e) {
    e === this.gl.FRAMEBUFFER_COMPLETE
      ? this.errorExit(
          "gl.framebufferTexture2D",
          "framebuffer is actually OK (?!)"
        )
      : e === this.gl.FRAMEBUFFER_UNSUPPORTED
      ? this.errorExit(
          "gl.framebufferTexture2D",
          "combination of formats is UNSUPPORTED by your card"
        )
      : e === this.gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT
      ? this.errorExit(
          "gl.framebufferTexture2D",
          "FRAMEBUFFER_INCOMPLETE_ATTACHMENT"
        )
      : e === this.gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT
      ? this.errorExit(
          "gl.framebufferTexture2D",
          "FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT"
        )
      : e === this.gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS
      ? this.errorExit(
          "gl.framebufferTexture2D",
          "FRAMEBUFFER_INCOMPLETE_DIMENSIONS"
        )
      : this.errorExit("gl.framebufferTexture2D", "FRAMEBUFFER  logic error");
  }
  mapColor(a, o) {
    var i = 1,
      n = 1,
      l = 1,
      s = this.config.getColorful();
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
    var c = this.config.getMapExposure();
    if (0 > c) {
      var f;
      (f = i), (i = n), (n = f), (f = l), (l = n), (n = f);
    }
    var u = Math.abs(c) * a[o].getWeight();
    return new Float32Array([u * i, u * n, u * l, 1]);
  }
  getInversFnsSnippet(e) {
    var t,
      r = "";
    for (t = 0; t < e.length; t++)
      if (e[t].hasInverse(this.config.getForceVertexOnly())) {
        var a = e[t].getInverseCode(),
          o = { "%TAG%": e[t].getTag(), "%INV_CODE%": a };
        r += expandString(
          "/*------------------- w%TAG% -----------------*/\nuniform vec4 color%TAG%;\nvec4 g%TAG%(vec2 p) {\n\treturn exp2(texture2D(tex,TXfmPL(p))*20.0)-1.0;\n}\n%INV_CODE%",
          o
        );
      }
    return r;
  }
  getSumFnsSnippet(e) {
    var t,
      r = "";
    for (t = 0; t < e.length; t++)
      if (e[t].hasInverse(this.config.getForceVertexOnly())) {
        var a = { "%TAG%": e[t].getTag() };
        r += expandString("\tsum+=color%TAG%*nonlinear_inverse%TAG%(p);", a);
      }
    return r;
  }

  getPerPixelMapShaderCode(xfms) {
      const inverseFns = this.getInversFnsSnippet(xfms)
      const sumFns = this.getSumFnsSnippet(xfms)

      const frag = `precision highp  float;
        varying vec2 destcoords;
        uniform sampler2D tex;
        ${GLSL_PLutil}
        ${PLANE_TEX_FUNCs}
        ${inverseFns}
        vec4 sum_inverses(vec2 p) {
          vec4 sum=vec4(0.0);
          ${sumFns}
          return log2(sum+1.0)*(1.0/20.0);
        }
        void main(void) {
          gl_FragColor = sum_inverses(PLfmTX(destcoords));
        }`

      const vert = `precision highp  float;
        varying vec2 destcoords;
        attribute vec4 leg_gl_Vertex;
        uniform mat4 leg_gl_ProjectionMatrix;
        uniform mat4 leg_gl_ModelViewMatrix;
        void main(void) {
          destcoords = vec2(leg_gl_Vertex);
          gl_Position = leg_gl_ProjectionMatrix * leg_gl_ModelViewMatrix * leg_gl_Vertex;
        }`
      return { frag, vert }
  }
  simulate_perpixel_maps(e) {
    if (0 == this.progPerPixMap || this.xfm_cached_px != e) {
      this.xfm_cached_px = e;
      const shader = this.getPerPixelMapShaderCode(e)
      this.progPerPixMap = this.opengl.makeProgramObject(shader["vert"], shader["frag"])
      this.progPerPixMap.uniformLocs = [];
      var i;
      for (i = 0; i < e.length; i++)
        e[i].hasInverse(this.config.getForceVertexOnly()) &&
          (e[i].setUniformLoc(this.progPerPixMap, i),
          (this.progPerPixMap.uniformLocs[i] = this.gl.getUniformLocation(
            this.progPerPixMap,
            "color" + e[i].getTag()
          )));
      this.setTextureUniformLocs(this.progPerPixMap);
    }
    this.gl.useProgram(this.progPerPixMap),
      this.setProgramParams(this.progPerPixMap, this.config.getTexScale());
    var i;
    for (i = 0; i < e.length; i++)
      e[i].hasInverse(this.config.getForceVertexOnly()) &&
        (e[i].setUniforms(this.progPerPixMap, i),
        this.gl.uniform4fv(this.progPerPixMap.uniformLocs[i], this.mapColor(e, i)));
    this.opengl.draw_texture(
      this.progPerPixMap,
      mat4.create(),
      [-1, -1, 0.5],
      [1, 1, 0.5]
    ),
      this.gl.useProgram(null);
  }
  TXfmPL(e, t) {
    return (e *= t), 0.5 * (e / Math.sqrt(1 + e * e)) + 0.5;
  }

  getSeedShaderCode() {
    const vert = `precision highp float;
    attribute vec4 a_Vertex;
    uniform vec4 u_color;
    varying vec4 v_color;
    uniform mat4 mvp_matrix;
    void main() {
      gl_Position = mvp_matrix * a_Vertex;
      v_color = u_color;
    }`
    const frag = `precision highp float;
    varying vec4 v_color;
    void main() {
      gl_FragColor = v_color;
    }`
    return { vert, frag }
  }
  useSeedShader() {
    if (!this.seedShader) {
      const seedShader = this.getSeedShaderCode()
      var e = this.opengl.loadShader(
          this.gl.VERTEX_SHADER,
          seedShader["vert"]
        ),
        t = this.opengl.loadShader(
          this.gl.FRAGMENT_SHADER,
          seedShader["frag"]
        ),
        r = this.gl.createProgram();
      if (
        (this.gl.attachShader(r, e),
        this.gl.attachShader(r, t),
        this.gl.linkProgram(r),
        !this.gl.getProgramParameter(r, this.gl.LINK_STATUS))
      )
        throw Error("Unable to initialize the shader program.");
      this.gl.useProgram(r),
        (r.a_Vertex = this.gl.getAttribLocation(r, "a_Vertex")),
        (r.ucolorloc = this.gl.getUniformLocation(r, "u_color")),
        (r.upointsizeloc = this.gl.getUniformLocation(r, "u_pointsize")),
        (r.mvpmatrixloc = this.gl.getUniformLocation(r, "mvp_matrix")),
        (this.seedShader = r);
    } else this.gl.useProgram(this.seedShader);
    return this.seedShader;
  }
  drawSeedTexture(e) {
    this.gl.clearColor(0, 0, 0, 1),
      this.gl.clear(this.gl.COLOR_BUFFER_BIT),
      this.opengl.uPushMatrix(),
      this.opengl.uTranslatef(0.5, 0.5, 0);
    var t = this.config.getScreenInitScale(),
      r = t * (this.TXfmPL(1, e) - this.TXfmPL(0, e)),
      a = this.useSeedShader(),
      o = vec3.fromValues(0, 0, 0),
      i = vec3.fromValues(r, r, 0);
    this.gl.uniform1f(a.upointsizeloc, 1);
    var n = this.config.getScreenInitVal();
    this.gl.uniform4f(a.ucolorloc, n, n, n, 1),
      this.gl.uniform1i(a.stextureloc, 0),
      this.opengl.multiply(this.opengl.mvpMatrix, this.opengl.mvMatrix, this.opengl.prMatrix),
      this.gl.uniformMatrix4fv(a.mvpmatrixloc, !1, this.opengl.mvpMatrix),
      this.opengl.draw_texture(a, mat4.create(), o, i),
      this.opengl.uPopMatrix();
  }
  addVertex(e, t) {
    e.push(t[0]), e.push(t[1]), e.push(0);
  }
  draw_pervertex_map(e, r) {
    if (r != this.lastRes) {
      var a = 1 / r,
        o = 1 / r;
      this.cachedVertices = [];
      var i, n;
      for (n = 0; 1 > n; n += a)
        for (i = 0; 1 >= i; i += o) {
          var l = vec2.fromValues(i, n);
          this.addVertex(this.cachedVertices, l),
            0 == i && this.addVertex(this.cachedVertices, l),
            (l = vec2.fromValues(i, n + a)),
            this.addVertex(this.cachedVertices, l),
            1 < i + o && this.addVertex(this.cachedVertices, l);
        }
      this.lastRes = r;
    }
    var s = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, s),
      this.gl.bufferData(
        this.gl.ARRAY_BUFFER,
        new Float32Array(this.cachedVertices),
        this.gl.STATIC_DRAW
      ),
      (s.itemSize = 3),
      (s.numItems = this.cachedVertices.length / 3),
      this.gl.enableVertexAttribArray(e.leg_gl_Vertex),
      this.gl.vertexAttribPointer(e.leg_gl_Vertex, s.itemSize, this.gl.FLOAT, !1, 0, 0),
      this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, s.numItems);
  }
  simulate_pervertex_map(e, t, r) {
    if (0 == this.xfm_prog[r] || !e[r].equals(this.xfm_cached_vx[r])) {
      var a = [
        "precision highp float;",
        GLSL_PLutil,
        PLANE_TEX_FUNCs,
        " %VAR_CODE%",
        "vec2 applyMap(vec2 t) {",
        "\treturn TXfmPL(applyMap%ID%(PLfmTX(t)));",
        "}",
        "varying vec4 color;",
        "varying vec2 texcoords;",
        "attribute vec4 leg_gl_Color;",
        "attribute vec4 leg_gl_Vertex;",
        "uniform mat4 leg_gl_ProjectionMatrix;",
        "uniform mat4 leg_gl_ModelViewMatrix;",
        "void main(void) {",
        "\ttexcoords=vec2(leg_gl_Vertex);",
        "\tvec2 onscreen=applyMap(texcoords);",
        "\tcolor=getDensity(texcoords)*leg_gl_Color;",
        "\tgl_Position = leg_gl_ProjectionMatrix * leg_gl_ModelViewMatrix * vec4(onscreen,0,1);",
        "}",
      ].join("\n");
      this.xfm_cached_vx[r] = e[r];
      var o = { "%VAR_CODE%": e[r].getCode(), "%ID%": e[r].getTag() },
        i = expandString(a, o);
      (this.xfm_prog[r] = this.opengl.makeProgramObject(
        i,
        "precision highp float;\vvarying vec4 color;\nvarying vec2 texcoords;\nuniform sampler2D tex;\nvoid main(void) {\n\tgl_FragColor = color*texture2D(tex,texcoords);\n}"
      )),
        e[r].setUniformLoc(this.xfm_prog[r]),
        this.setTextureUniformLocs(this.xfm_prog[r]);
    }
    var n = this.xfm_prog[r];
    this.gl.useProgram(n),
      this.setProgramParams(n, this.config.getTexScale()),
      e[r].setUniforms(n, r),
      this.draw_pervertex_map(n, this.config.getDiscCompute()),
      this.gl.useProgram(null);
  }
  drawInverseFuncs(e, t) {
    this.gl.disable(this.gl.BLEND),
      this.config.getForceVertexOnly()
        ? (this.gl.clearColor(0, 0, 0, 1), this.gl.clear(this.gl.COLOR_BUFFER_BIT))
        : this.simulate_perpixel_maps(e, t),
      this.gl.enable(this.gl.BLEND);
    var r;
    for (r = 0; r < e.length; r++)
      e[r].hasInverse(this.config.getForceVertexOnly()) ||
        this.simulate_pervertex_map(e, t, r);
  }
  setFramebufTextureAttachment(e) {
    this.gl.framebufferTexture2D(
      this.gl.FRAMEBUFFER,
      this.gl.COLOR_ATTACHMENT0,
      this.gl.TEXTURE_2D,
      e,
      0
    );
    var t = this.gl.checkFramebufferStatus(this.gl.FRAMEBUFFER);
    t != this.gl.FRAMEBUFFER_COMPLETE && this.bad_framebuffer(t),
      this.gl.disable(this.gl.DEPTH_TEST);
  }
  drawMapLevel(e, t, r, a) {
    var o = t.getDestination();
    this.setFramebufTextureAttachment(o);
    var i = 1 << r,
      n = 1 << r;
    if (
      (this.gl.viewport(0, 0, i, n),
      this.gl.scissor(0, 0, i, n),
      0 == a && r == this.config.getFirstLevel()
        ? this.drawSeedTexture(this.config.getTexScale())
        : this.drawInverseFuncs(e, r),
      this.gl.bindTexture(this.gl.TEXTURE_2D, o),
      this.gl.generateMipmap(this.gl.TEXTURE_2D),
      t.swap(),
      0 == a && r != this.config.getFirstLevel())
    ) {
      var l = this.getTextureLevels();
      t.setDestination(l[r][1]);
    }
  }
  create2DArray(e) {
    for (var t = [], r = 0; r < e; r++) t[r] = [];
    return t;
  }
  getTextureLevels() {
    if (0 == this.texLevels) {
      var e = this.config.getNLevel();
      this.texLevels = this.create2DArray(e + 1);
      var t;
      for (t = 0; t <= e; t++) {
        var r;
        for (r = 0; 2 > r; r++) {
          var a = 1 << t,
            o = this.gl.createTexture();
          (o.width = a),
            (o.height = a),
            (this.texLevels[t][r] = o),
            this.gl.bindTexture(this.gl.TEXTURE_2D, this.texLevels[t][r]);
          var n = this.useFloatTextures ? this.gl.FLOAT : this.gl.UNSIGNED_BYTE;
          this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, a, a, 0, this.gl.RGBA, n, null);
          var l =
            this.gl.getExtension("EXT_texture_filter_anisotropic") ||
            this.gl.getExtension("MOZ_EXT_texture_filter_anisotropic") ||
            this.gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
          l &&
            this.gl.texParameterf(this.gl.TEXTURE_2D, l.TEXTURE_MAX_ANISOTROPY_EXT, 16),
            this.gl.texParameteri(
              this.gl.TEXTURE_2D,
              this.gl.TEXTURE_MIN_FILTER,
              this.gl.LINEAR_MIPMAP_LINEAR
            ),
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR),
            this.gl.generateMipmap(this.gl.TEXTURE_2D),
            this.gl.bindTexture(this.gl.TEXTURE_2D, null);
        }
      }
    }
    return this.texLevels;
  }
  getFrameBuffer() {
    return 0 == this.fbo && (this.fbo = this.gl.createFramebuffer()), this.fbo;
  }
  setupLegacyShaderProg() {
    this.opengl.uMatrixMode(this.opengl.U_PROJECTION),
      this.opengl.uLoadIdentity(),
      this.opengl.uMatrixMode(this.opengl.U_MODELVIEW),
      this.opengl.uLoadIdentity(),
      this.opengl.uScalef(1, 1, 0.01),
      this.opengl.uScalef(2, 2, 1),
      this.opengl.uTranslatef(-0.5, -0.5, 0);
  }
  ignite(t) {
    this.config.setTime(t)
    this.setupLegacyShaderProg();
    var e = new FrameMgr(0, null),
      t = this.getFrameBuffer();
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, t);
    var r = this.getTextureLevels();
    this.gl.blendFunc(this.gl.ONE, this.gl.ONE), this.gl.enable(this.gl.BLEND), this.gl.disable(this.gl.CULL_FACE);
    var a,
      o = this.config.getFirstLevel(),
      i = this.config.getLastLevel();
    for (a = o; a <= i; a++) {
      e.setDestination(r[a][0]), a == o && e.setSource(r[a][1]);
      var n,
        l = this.config.getIterations();
      for (n = 0; n < l; n++)
        this.drawMapLevel(this.config.getFlameTransforms(), e, a, n);
    }
    return this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null), e.getSource();
  }
}
function getPostprocessShaderCode() {
  const vert = `precision highp float;
  varying vec3 worldCoords;
  attribute vec4 leg_gl_Vertex;
  void main(void) {
    worldCoords = vec3(leg_gl_Vertex);
    gl_Position = leg_gl_Vertex;
  }`
  const frag = `
  precision highp float;
  float ab(float x) {
    return x/sqrt(1.0+x*x)*0.5+0.5;
  }
  vec2 ab(vec2 p) {
    return vec2(ab(p.x),ab(p.y));
  }
  varying vec3 worldCoords;
  uniform sampler2D uTexture;
  uniform float uColormode;
  uniform vec2 uScale;
  uniform vec2 uMove;
  float Scale = 1.0;
  void main(void) {
    vec2 uv=ab(vec2(uScale.x*(worldCoords.x+uMove.x),uScale.y*((worldCoords.y+uMove.y))));
    vec3 rgb = texture2D(uTexture, uv).rgb;
    rgb= (rgb*uColormode + (1.0-rgb)*(1.0-uColormode));
    gl_FragColor = vec4(rgb, 1.0);
  }`
  
  return { vert, frag };
}
class Engine {
  constructor(canvas) {
    this.canvas = canvas;
    (this.sizeX = window.innerWidth),
      (this.sizeY = window.innerHeight),
      this.furnace,
      this.ctxSpectrum,
      this.spectrumWidth,
      this.spectrumHeight,
      (this.lastTime = 0),
      this.currentAnimStart,
      (this.oldval = 0);
  }
  init() {
    (this.gl = this.initGl(this.canvas, null)),
      (this.opengl = new OpenGL(this.gl)),
      (this.furnace = new Furnace(this.gl, this.opengl));
  }
  initGl(e, t) {
    var r;
    try {
      r = e.getContext("webgl", { depth: !1 });
    } catch (t) {}
    if (!r) return void alert("Your browser does not support WebGL2");
    return (e.width = this.sizeX), (e.height = this.sizeY), r;
  }
  setConfig(e) {
    this.currentConfig = e;
    this.furnace.setConfig(e);
  }
  getConfig() {
    return this.currentConfig
  }
  render() {
    if (!this.startTime) {
      this.startTime = performance.now()
    }
    const time = (performance.now() - this.startTime) / 1000
    this.drawScene(window.innerWidth, window.innerHeight, time)
    window.requestAnimationFrame(this.render.bind(this));
  }
  getPostprocessShader() {
    const shader = getPostprocessShaderCode()
    return (
      "undefined" == typeof this.postprocessProg &&
        ((this.postprocessProg = this.opengl.makeProgramObject(shader["vert"], shader["frag"])),
        (this.postprocessProg.uScale = this.gl.getUniformLocation(
          this.postprocessProg,
          "uScale"
        )),
        (this.postprocessProg.uMove = this.gl.getUniformLocation(
          this.postprocessProg,
          "uMove"
        )),
        (this.postprocessProg.uColormode = this.gl.getUniformLocation(
          this.postprocessProg,
          "uColormode"
        )),
        (this.postprocessProg.uTexture = this.gl.getUniformLocation(
          this.postprocessProg,
          "uTexture"
        ))
        ),
      this.postprocessProg
    );
  }
  drawScene(w, h, t) {
    var a = this.furnace.ignite(t);
    this.gl.bindTexture(this.gl.TEXTURE_2D, a),
      this.gl.viewport(0, 0, w, h),
      this.gl.enable(this.gl.DEPTH_TEST),
      this.gl.disable(this.gl.BLEND),
      this.gl.clearColor(0.3, 0.5, 0.7, 0),
      this.gl.clear(this.gl.COLOR_BUFFER_BIT + this.gl.DEPTH_BUFFER_BIT),
      this.gl.enable(this.gl.DEPTH_TEST);
    var o = this.getPostprocessShader();
    this.gl.useProgram(o);
    var i = this.furnace.getConfig().getView();
    this.gl.activeTexture(this.gl.TEXTURE0),
      this.gl.uniform1i(o.uTexture, 0),
      this.gl.uniform2f(o.uScale, i[0], i[1]),
      this.gl.uniform2f(o.uMove, i[2], i[3]),
      this.gl.uniform1f(
        o.uColormode,
        0 > this.furnace.getConfig().getMapExposure() ? 0 : 1
      )
    var n = 1;
    this.opengl.draw_texture(o, mat4.create(), [-1, -1, 0.5], [1, 1, 0.5]),
      this.gl.useProgram(null);
  }
}

export {
  Engine,
  Furnace,
  OpenGL,
  variation_list,
  Variation,
  VariationInverse,
  FlameConfig,
  FlameTransform,
}
