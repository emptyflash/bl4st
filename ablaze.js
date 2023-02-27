/**
 * Ablaze
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
  (OpenGL = function () {
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
      var r = this.loadShader(gl.VERTEX_SHADER, e),
        a = this.loadShader(gl.FRAGMENT_SHADER, t),
        o = gl.createProgram();
      if (
        (gl.attachShader(o, r),
        gl.attachShader(o, a),
        gl.deleteShader(r),
        gl.deleteShader(a),
        gl.linkProgram(o),
        !gl.getProgramParameter(o, gl.LINK_STATUS))
      )
        throw (
          (console.error(
            "An error occurred compiling the shaders: " +
              gl.getProgramInfoLog(o)
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
        c = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, c),
        gl.bufferData(gl.ARRAY_BUFFER, s, gl.STATIC_DRAW),
        (c.itemSize = 3),
        (c.numItems = s.length / 3),
        gl.enableVertexAttribArray(e.leg_gl_Vertex),
        gl.vertexAttribPointer(e.leg_gl_Vertex, c.itemSize, gl.FLOAT, !1, 0, 0),
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, c.numItems);
    },
    loadShader: function (e, t) {
      var r = gl.createShader(e);
      if (
        (gl.shaderSource(r, t),
        gl.compileShader(r),
        !gl.getShaderParameter(r, gl.COMPILE_STATUS))
      )
        throw (
          (console.error(
            "An error occurred compiling the shaders: " + gl.getShaderInfoLog(r)
          ),
          Error(
            "An error occurred compiling the shaders: " + gl.getShaderInfoLog(r)
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
      (e.leg_gl_Vertex = gl.getAttribLocation(e, "leg_gl_Vertex")),
        (e.leg_gl_ProjectionMatrix = gl.getUniformLocation(
          e,
          "leg_gl_ProjectionMatrix"
        )),
        (e.leg_gl_ModelViewMatrix = gl.getUniformLocation(
          e,
          "leg_gl_ModelViewMatrix"
        )),
        (e.leg_gl_Color = gl.getUniformLocation(e, "leg_gl_Color"));
    },
    setLegacyFixedPipelineParams: function (e) {
      gl.uniformMatrix4fv(e.leg_gl_ProjectionMatrix, !1, this.prMatrix),
        gl.uniformMatrix4fv(e.leg_gl_ModelViewMatrix, !1, this.mvMatrix);
    },
  });
function expandString(e, t) {
  return e.replace(/%\w+%/g, function (e) {
    return t[e] || e;
  });
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
    "float r=length(p);\nfloat at2=atan2(p.x,-p.y);\nfloat pilo=ceil((-M_PI*r-at2)/(2.0*M_PI));\nfloat pihi=floor((+M_PI*r-at2)/(2.0*M_PI));\nvec4 sum=vec4(0.0);\nfloat s= floor(pihi-pilo);\nfor (float pic=pilo; pic<=pihi; pic++) {\n\tif (pic>s) break;\n\tfloat a=(at2+ (pic+pilo) *5.0*M_PI)/r;\n\tsum+=f(r*vec2(sin(a),cos(a)));\n}\nreturn sum;",
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
  constructor(e, t, r, a, i, n) {
    super("", "", ""),
      (this._tag = "" + flameTransformCount++),
      (this._var = lookupVariationId(t)),
      (this._weight = e),
      (this._x = a),
      (this._y = i),
      (this._o = n),
      (this._wvar = r),
      (this._nUniforms = 8);
  }
  getTag() {
    return this._tag;
  }
  getWeight() {
    return this._weight;
  }
  getX() {
    return vec2.fromValues(this._x[0], this._x[1]);
  }
  getY() {
    return vec2.fromValues(this._y[0], this._y[1]);
  }
  getO() {
    return vec2.fromValues(this._o[0], this._o[1]);
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
    return Math.abs(
      this._wvar *
        this._wvar *
        (this._x[0] * this._y[1] - this._x[1] * this._y[0])
    );
  }
  makeInverseMatrix(e, t) {
    var r = 1 / (this._x[0] * this._y[1] - this._x[1] * this._y[0]);
    (e[t + 0] = vec2.fromValues(r * this._y[1], r * -this._x[1])),
      (e[t + 1] = vec2.fromValues(r * -this._y[0], r * this._x[0]));
    var i = vec2.scale(vec2.create(), e[t], this._o[0]),
      a = vec2.scale(vec2.create(), e[t + 1], this._o[1]),
      n = vec2.add(i, i, a);
    e[t + 2] = vec2.fromValues(-n[0], -n[1]);
  }
  getXfUniforms(e) {
    (e[0] = this._x),
      (e[1] = this._y),
      (e[2] = this._o),
      this.makeInverseMatrix(e, 3),
      (e[6] = vec2.fromValues(this._wvar, 1 / this._wvar)),
      (e[7] = vec2.fromValues(this.getAffineArea(), 0));
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
      (e.xfUniformLoc[t] = gl.getUniformLocation(e, "xf" + this._tag));
  }
  setUniforms(e, t) {
    var r = Array(this.nUniforms);
    this.getXfUniforms(r),
      gl.uniform2fv(e.xfUniformLoc[t], this.getFloat32Array(r));
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
function smooth(e, t, r) {
  t.push(e), t.length > r && t.shift();
  var a,
    o = 0;
  for (a = 0; a < t.length; a++) o += t[a];
  return o / t.length;
}
function createFlameConfigX1() {
  return new (class extends FlameConfig {
    constructor() {
      super([
        [
          0.14,
          "linear",
          1,
          [-0.4999998, -0.8660256],
          [0.8660256, -0.4999998],
          [0, 0],
        ],
        [0.22, "linear", 1, [0.5, -0.8660254], [0.8660254, 0.5], [0, 0]],
        [0.5, "linear", 1.22, [-1, 0], [10, -1], [-1.732051, -0.2]],
        [
          0.4,
          "spherical",
          0.4,
          [0.8689958, 0.101100525],
          [-0.01100525, 0.8689958],
          [0.02201051, -1.737992],
        ],
      ]);
    }
    getMapExposure() {
      return 0.66;
    }
    getColorful() {
      return -1.7731;
    }
    getTexScale() {
      return 5.2;
    }
    getFirstLevel() {
      return 5;
    }
    getLastLevel() {
      return 10;
    }
    getScreenInitVal() {
      return 0.86;
    }
    getScreenInitScale() {
      return 0.650042;
    }
    getIterations() {
      return 5;
    }
    animate(e) {
      this.defaultAnimate(e);
    }
    getView() {
      var e = 1,
        t = 4.2 - 1 * e;
      return [t, t, 0, 0];
    }
  })();
}
function createFlameConfigX2() {
  return new (class extends FlameConfig {
    constructor() {
      super([
        [0.119449, "linear", 0.9, [0.31, -3.71], [0.1, 0.5], [0.35, 0.8]],
        [0.2015748, "linear", 0.7, [0.5, 0], [0, 0.5], [-0.5, 0]],
        [0.8976378, "spherical", 0.1, [0.8, -0.4], [0.4, 0.8], [0.2, 0.4]],
        [
          0.6929134,
          "spherical",
          0.2,
          [-0.8, 0.4],
          [-0.4, -10.8],
          [0.02, -0.04],
        ],
      ]);
    }
    getMapExposure() {
      return 0.63749;
    }
    getColorful() {
      return 0.33323;
    }
    getTexScale() {
      return 1;
    }
    getFirstLevel() {
      return 7;
    }
    getLastLevel() {
      return 10;
    }
    getScreenInitVal() {
      return 0.074;
    }
    getScreenInitScale() {
      return 13.2;
    }
    getIterations() {
      return 5;
    }
    animate(e) {
      this.defaultAnimate(e);
    }
    getView() {
      var e = 1,
        t = 0.7 - 0.15 * e;
      return [t, t, 0, 0];
    }
  })();
}
function createFlameConfigX3() {
  return new (class extends FlameConfig {
    constructor() {
      super([
        [0.1, "spherical", 0.66, [10.5, 10], [10, 0.5], [-1.35, 0]],
        [0.6, "fisheye", 0.22, [10.8, -0.4], [0.14, 0.8], [-0.2, 0.2]],
        [0.5, "swirl", 0.5, [-0.1, 0.4], [-0.1, -0.2], [10.2, 0.1]],
        [0.2, "spiral", 0.3, [0.4, 0], [-0.1, 0.1], [-0.2, 0]],
      ]);
    }
    getMapExposure() {
      return 7.4;
    }
    getColorful() {
      return 0.5323;
    }
    getTexScale() {
      return 0.61;
    }
    getFirstLevel() {
      return 7;
    }
    getLastLevel() {
      return 10;
    }
    getScreenInitVal() {
      return 0.1;
    }
    getScreenInitScale() {
      return 1.3;
    }
    getIterations() {
      return 5;
    }
    animate(e) {
      this.defaultAnimate(e);
    }
    getView() {
      var e = 1,
        t = 2.2 - 0.5 * e;
      return [t, t, 0, 0];
    }
  })();
}
function createFlameConfigX4() {
  return new (class extends FlameConfig {
    constructor() {
      super([
        [0.2, "linear", 1, [0.5, 0], [0, 0.5], [0.5, 0]],
        [0.55, "linear", 1, [0.5, 0], [0, 0.5], [-0.5, 0]],
        [0.8, "spherical", 1.8, [0.8, -0.4], [0.4, 0.8], [0.2, 0.4]],
        [0.8, "spherical", 0.4, [-0.8, 0.4], [-0.4, -0.8], [0.2, 0.4]],
      ]);
    }
    getMapExposure() {
      return 0.6;
    }
    getColorful() {
      return 0.6323;
    }
    getTexScale() {
      return 0.5;
    }
    getFirstLevel() {
      return 7;
    }
    getLastLevel() {
      return 10;
    }
    getScreenInitVal() {
      return 10.4;
    }
    getScreenInitScale() {
      return 0.122;
    }
    animate(e) {
      this.defaultAnimate(e);
    }
    getView() {
      var e = 1,
        t = 2.2 - 0.3 * e;
      return [t, t, 0, 0];
    }
  })();
}
function createFlameConfigX5() {
  return new (class extends FlameConfig {
    constructor() {
      super([
        [0.33, "linear", 1.3, [0.5, 0], [0, 0.5], [0.5, 0]],
        [0.33, "spherical", 0.3, [1, 0.5], [-0.5, 1], [0, -0.5]],
        [0.43, "spherical", 0.4, [-1, -0.5], [0.5, -1], [1, 1]],
      ]);
    }
    getMapExposure() {
      return 2.1;
    }
    getColorful() {
      return 0.7323;
    }
    getTexScale() {
      return 0.5;
    }
    getFirstLevel() {
      return 7;
    }
    getLastLevel() {
      return 10;
    }
    getScreenInitVal() {
      return 10.4;
    }
    getScreenInitScale() {
      return 0.122;
    }
    getIterations() {
      return 2;
    }
    animate(e) {
      this.defaultAnimate(e);
    }
    getView() {
      var e = 1,
        t = 0.8 - 0.1 * e;
      return [t, t, 0.25, -0.25];
    }
  })();
}
function createFlameConfigX6() {
  return new (class extends FlameConfig {
    constructor() {
      super([
        [
          0.35,
          "linear",
          0.7,
          [0.361507, 0.1303464],
          [-0.1303464, 0.361507],
          [0.625, 0],
        ],
        [
          0.85,
          "linear",
          0.9,
          [0.08563109, 0.7551379],
          [-0.7551379, 0.08563109],
          [0, 0],
        ],
        [
          0.35,
          "linear",
          1,
          [0.5003027, 0.8662202],
          [-0.8662202, 0.5003027],
          [0, 0],
        ],
      ]);
    }
    getMapExposure() {
      return 2.4;
    }
    getColorful() {
      return 0.8323;
    }
    getTexScale() {
      return 1;
    }
    getFirstLevel() {
      return 7;
    }
    getLastLevel() {
      return 10;
    }
    getScreenInitVal() {
      return 2.4;
    }
    getScreenInitScale() {
      return 0.09;
    }
    getIterations() {
      return 4;
    }
    animate(e) {
      this.defaultAnimate(e);
    }
    getView() {
      var e = 1,
        t = 1.5 - 0.25 * e;
      return [t, t, 0, 0];
    }
  })();
}
function createFlameConfigX() {
  return new (class extends FlameConfig {
    constructor() {
      super([
        [0.3333, "swirl", 0.4, [6.5, 10], [0.44, 0.5], [0.33, 0.4]],
        [0.1333, "spherical", 0.4, [0.7888, 0.9], [0.3, 0.8], [0.566, 0.5]],
        [0.63333, "diamond", 0.6, [0.5, 0], [0, 0.5], [0, 10.551]],
      ]);
    }
    getMapExposure() {
      return 30.4;
    }
    getColorful() {
      var e = 1;
      return e / 2 + 50.2;
    }
    getFirstLevel() {
      return 8;
    }
    getLastLevel() {
      return 12;
    }
    getIterations() {
      return 5;
    }
    animate(e) {
      this.defaultAnimate(e);
    }
    getView() {
      var e = 1,
        t = 7.2 - 1.5 * e;
      return [t, t, 0, 0];
    }
  })();
}
function createFlameConfig0() {
  return new (class extends FlameConfig {
    constructor() {
      super([
        [0.3333, "spherical", 0.4, [0.5, 0], [0, 0.5], [-0.566, 0.4]],
        [0.2333, "spherical", 0.4, [0.5, 0], [0, 0.5], [0.566, 0.4]],
        [0.3333, "hyperbolic", 0.4, [0.5, 0], [0, 0.5], [0, -0.551]],
      ]),
        initAbsRotation(this);
    }
    getMapExposure() {
      return 3.4;
    }
    getColorful() {
      var e = 1;
      return e / 2 + 0.3;
    }
    getFirstLevel() {
      return 8;
    }
    getLastLevel() {
      return 12;
    }
    getIterations() {
      return 5;
    }
    getScreenInitVal() {
      return 0.9;
    }
    animate(e) {
      skipAnimate(this, e, 120);
    }
    getAnimRates() {
      return [0.2, 0.3, -0.4];
    }
    getView() {
      var e = 1;
        t = 8.2 - 1.3 * e;
      return [t, t, 0, 0];
    }
  })();
}
function createFlameConfig1() {
  return new (class extends FlameConfig {
    constructor() {
      super([
        [0.3333, "spherical", 0.4, [0.5, 0], [0, 0.5], [-0.566, 0.4]],
        [0.3333, "spherical", 0.4, [0.5, 0], [0, 0.5], [0.566, 0.4]],
        [0.3333, "spherical", 0.4, [0.5, 0], [0, 0.5], [0, -0.551]],
      ]);
    }
    getMapExposure() {
      return 1.7;
    }
    getColorful() {
      return 0.5;
    }
    getFirstLevel() {
      return 7;
    }
    getLastLevel() {
      return 11;
    }
    getIterations() {
      return 4;
    }
    getScreenInitScale() {
      return 4;
    }
    getTexScale() {
      return 4;
    }
    animate(e) {
      this.defaultAnimate(e);
    }
    getView() {
      var e = 1,
        t = 7.2 - 0.75 * e;
      return [t, t, 0, 0];
    }
  })();
}
function createFlameConfig2() {
  return new (class extends FlameConfig {
    constructor() {
      super([
        [
          0.3333,
          "horseshoe",
          1.2,
          [-0.9970145, -0.984873],
          [0.16221, 0.946498],
          [-0.606021, 0.7473919],
        ],
        [
          0.6333,
          "spherical",
          0.7,
          [0.235448, -0.599886],
          [0.571187, 0.322248],
          [-0.871327, 0.469188],
        ],
      ]),
        (this.animRate = [3, 5]);
    }
    getMapExposure() {
      return 1.9096749;
    }
    getColorful() {
      var e = 1;
      return 0.4 - e;
    }
    getTexScale() {
      return -0.8790305;
    }
    getFirstLevel() {
      return 8;
    }
    getLastLevel() {
      return 10;
    }
    getScreenInitVal() {
      return 0.6;
    }
    getScreenInitScale() {
      return 0.60042;
    }
    getIterations() {
      return 3;
    }
    getAnimRates() {
      return this.animRate;
    }
    getView() {
      var e = 1,
        t = 5 - 0.75 * e;
      return [t, t, 0.3, -0.3];
    }
  })();
}
function createFlameConfig4() {
  return new (class extends FlameConfig {
    constructor() {
      super([
        [
          0.533,
          "sinusoidal",
          0.9,
          [4.172915, 9.464352],
          [-9.464352, 4.172915],
          [4.741241, -2.293564],
        ],
        [
          0.333,
          "spherical",
          1,
          [0.4997272, 0.2070764],
          [-0.2070764, 0.4997272],
          [0, 0],
        ],
        [0.333, "julia", 1, [4.001953, 17e-8], [-17e-8, 4.001953], [0, 0]],
      ]);
    }
    getMapExposure() {
      return 0.9096749;
    }
    getColorful() {
      return 0.53;
    }
    getTexScale() {
      var e = 1;
      return 1 - 0.2 * e;
    }
    getFirstLevel() {
      return 6;
    }
    getLastLevel() {
      return 10;
    }
    getScreenInitVal() {
      return 1;
    }
    getScreenInitScale() {
      return 0.9;
    }
    getIterations() {
      return 3;
    }
  })();
}
var x = 0;
function createFlameConfig5() {
  return new (class extends FlameConfig {
    constructor() {
      super([
        [1.233, "julia", -3.53, [4.001953, 17e-8], [-17e-8, 4.001953], [0, 0]],
        [
          0.13,
          "sinusoidal",
          1.532,
          [4.172915, 9.464352],
          [-9.464352, 4.172915],
          [4.741241, -2.293564],
        ],
        [
          0.333,
          "spherical",
          0.4,
          [0.7997272, 0.2070764],
          [-0.2070764, 0.7997272],
          [0, 0],
        ],
      ]),
        (this.sc = 0.1),
        (this.animRate = [3, 5, 5]);
    }
    getMapExposure() {
      return 1.4096749;
    }
    getColorful() {
      var e = 1;
      return 1.13 - 0.5 * e;
    }
    getTexScale() {
      return this.sc;
    }
    getFirstLevel() {
      return 7;
    }
    getLastLevel() {
      return 10;
    }
    getScreenInitVal() {
      return 1;
    }
    getScreenInitScale() {
      return 0.9;
    }
    getIterations() {
      return 3;
    }
    getAnimRates() {
      return this.animRate;
    }
    animate(e) {
      this.defaultAnimate(e), (x += e);
      var t = Math.sin(x / 1e3 / 4) + 1;
      this.sc = 0.13 + 2 * t;
    }
  })();
}
function createFlameConfig6() {
  return new (class extends FlameConfig {
    constructor() {
      super([
        [0.333, "hyperbolic", 0.45, [-5e-8, 1.25], [-1.25, -5e-8], [0.2, -0.4]],
        [
          1.233,
          "julia",
          4,
          [0.7457995, -0.06098665],
          [0.06098665, 0.7457995],
          [0.06173, -0.24791667],
        ],
      ]),
        (this.animRate = [3, 7]);
    }
    getMapExposure() {
      return 2.4096749;
    }
    getColorful() {
      var e = 1;
      return 7.13 + 3 * e;
    }
    getTexScale() {
      return 0.55;
    }
    getFirstLevel() {
      return 6;
    }
    getLastLevel() {
      return 9;
    }
    getScreenInitVal() {
      return 0.3;
    }
    getScreenInitScale() {
      return 0.1;
    }
    getIterations() {
      return 5;
    }
    getAnimRates() {
      return this.animRate;
    }
    getView() {
      var e = 1,
        t = 5.1 - 1.5 * e;
      return [t, t, 1, -1];
    }
  })();
}
function createFlameConfig7() {
  return new (class extends FlameConfig {
    constructor() {
      super([
        [0.533, "hyperbolic", 1.5, [-5e-8, 1.25], [-1.25, -5e-8], [0, 0]],
        [
          0.533,
          "spherical",
          1,
          [0.7457995, -0.06098665],
          [0.06098665, 0.7457995],
          [0.06173, -0.4791667],
        ],
      ]),
        (this.animRate = [1, 2]);
    }
    getMapExposure() {
      return 0.813749;
    }
    getColorful() {
      return -2.033323;
    }
    getTexScale() {
      return 1.3;
    }
    getFirstLevel() {
      return 4;
    }
    getLastLevel() {
      return 10;
    }
    getScreenInitVal() {
      return 0.3;
    }
    getScreenInitScale() {
      return 0.2;
    }
    getIterations() {
      return 4;
    }
    getAnimRates() {
      return this.animRate;
    }
    getView() {
      var e = 1,
        t = 4.2 - 0.75 * e;
      return [t, t, 0, 0];
    }
  })();
}
function createFlameConfig8() {
  return new (class extends FlameConfig {
    constructor() {
      super([
        [0.4409449, "linear", 1, [0.5, 0], [0, 0.5], [0.5, 0]],
        [0.4015748, "linear", 1, [0.5, 0.55], [0.4, 0.5], [-0.5, 0]],
        [0.8976378, "spherical", 0.5, [0.8, -0.4], [0.4, 0.8], [0.2, 0.4]],
        [0.6929134, "spherical", 0.2, [-0.8, 0.4], [-0.4, -0.8], [0.2, 0.4]],
      ]),
        (this.animRate = [1, 2, 1, 2]);
    }
    getMapExposure() {
      return -12.36133749;
    }
    getColorful() {
      return 2.5363323;
    }
    getTexScale() {
      return 2.9;
    }
    getFirstLevel() {
      return 7;
    }
    getLastLevel() {
      return 12;
    }
    getScreenInitVal() {
      return 0.1;
    }
    getScreenInitScale() {
      return 2.6;
    }
    getIterations() {
      return 4;
    }
    getAnimRates() {
      return this.animRate;
    }
    getView() {
      var e = 1,
        t = 5.2 - 1.2 * e;
      return [t, t, 0, 0];
    }
  })();
}
function createFlameConfig9() {
  return new (class extends FlameConfig {
    constructor() {
      super([
        [0.2, "linear", 1.4, [10.5, 0], [0, 0.5], [0.5, 0]],
        [0.2, "linear", 1, [0.5, 0], [10, 0.5], [-0.5, 0]],
        [0.8, "spherical", 0.8, [0.1, -0.4], [0.4, 0.41], [0.333, 0.4]],
        [0.8, "spherical", 0.4, [-10.8, 0.4], [-0.4, -110.8], [0.2, 0.4]],
      ]),
        (this.animRate = [-1, -1, -1, -1]);
    }
    getMapExposure() {
      return 1.9;
    }
    getColorful() {
      return 13.8323;
    }
    getTexScale() {
      return 1;
    }
    getFirstLevel() {
      return 7;
    }
    getLastLevel() {
      return 10;
    }
    getScreenInitVal() {
      return 0.1;
    }
    getScreenInitScale() {
      return 1.2;
    }
    getIterations() {
      return 5;
    }
    getAnimRates() {
      return this.animRate;
    }
    getView() {
      var e = 1,
        t = 6.2 - 1 * e;
      return [t, t, 0, 0];
    }
  })();
}
function createFlameConfig10() {
  return new (class extends FlameConfig {
    constructor() {
      super([
        [0.33, "linear", 1.3, [0.5, 0], [0, 0.5], [0.5, 0]],
        [0.43, "heart", 1.1, [1, 0.5], [-0.5, 1], [0, -0.5]],
        [0.43, "spherical", 0.4, [-1, -0.5], [0.5, -1], [1, 1]],
      ]),
        (this.animRate = [2, 2, 2, 2]);
    }
    getMapExposure() {
      return 2.2289143;
    }
    getColorful() {
      return 0.61129321418323;
    }
    getTexScale() {
      return 1;
    }
    getFirstLevel() {
      return 7;
    }
    getLastLevel() {
      return 10;
    }
    getScreenInitVal() {
      return 1;
    }
    getScreenInitScale() {
      return 0.1;
    }
    getIterations() {
      return 5;
    }
    getAnimRates() {
      return this.animRate;
    }
    getView() {
      var e = 1,
        t = 4.2 - 1 * e;
      return [t, t, 0.3, -0.2];
    }
  })();
}
var s = 1.3;
function createFlameConfig11() {
  return new (class extends FlameConfig {
    constructor() {
      super([
        [
          0.3333,
          "swirl",
          1,
          [-0.484358, 0.88212],
          [0.124088, 0.484358],
          [0, 0],
        ],
        [
          0.3333,
          "linear",
          1,
          [0.0438976, -0.498069],
          [0.498069, 0.0438976],
          [1.3, 0],
        ],
        [0.333, "linear", 1, [0.5, 0], [0, 0.5], [0.3 * s, -s]],
      ]),
        (this.animRate = [10, 5, 1]);
    }
    getMapExposure() {
      return 1.91;
    }
    getColorful() {
      return -3.294;
    }
    getTexScale() {
      return 0.179537;
    }
    getFirstLevel() {
      return 10;
    }
    getLastLevel() {
      return 11;
    }
    getScreenInitVal() {
      return 1;
    }
    getScreenInitScale() {
      return 2.23622;
    }
    getIterations() {
      return 5;
    }
    getAnimRates() {
      return this.animRate;
    }
    getView() {
      var e = 1,
        t = 0.5 - 0.1 * e;
      return [t, t, 0.3, -0.2];
    }
  })();
}
function createFlameConfig12() {
  return new (class extends FlameConfig {
    constructor() {
      super([
        [0.33, "hyperbolic", 0.4, [0.5, 0], [0, 0.5], [-0.566, 0.4]],
        [0.33, "spherical", 0.4, [0.5, 0], [0, 0.5], [0.566, 0.4]],
        [0.33, "spherical", 0.4, [0.5, 0], [0, 0.5], [0, -0.551]],
      ]),
        (this.animRate = [1, 1, 1, 1]);
    }
    getMapExposure() {
      return 2.46727;
    }
    getColorful() {
      return 0.579314;
    }
    getTexScale() {
      return 0.75;
    }
    getFirstLevel() {
      return 7;
    }
    getLastLevel() {
      return 10;
    }
    getScreenInitVal() {
      return 0.351317;
    }
    getScreenInitScale() {
      return 66;
    }
    getIterations() {
      return 4;
    }
    getAnimRates() {
      return this.animRate;
    }
    getView() {
      var e = 1,
        t = 2.2 - 0.2 * e;
      return [t, t, 0.2, -0.2];
    }
  })();
}
function createFlameConfig13() {
  return new (class extends FlameConfig {
    constructor() {
      super([
        [0.28393, "spherical", 0.5, [0.5, 0], [0, 0.5], [-0.566, 0.4]],
        [0.21053, "spherical", 0.5, [0.5, 0], [0, 0.5], [0.566, 0.4]],
        [0.143482, "horseshoe", 0.9, [0.5, 0], [0, 0.5], [0, -0.551]],
      ]),
        (this.animRate = [1, 1, 1]);
    }
    getMapExposure() {
      return 5.16944;
    }
    getColorful() {
      return 0.741352;
    }
    getTexScale() {
      return 0.47984;
    }
    getFirstLevel() {
      return 7;
    }
    getLastLevel() {
      return 10;
    }
    getScreenInitVal() {
      return 0.0325568;
    }
    getScreenInitScale() {
      return 0.057675;
    }
    getIterations() {
      return 5;
    }
    getAnimRates() {
      return this.animRate;
    }
    getView() {
      var e = 1,
        t = 1.2 - 0.1 * e;
      return [t, t, 0, 0];
    }
  })();
}
function skipAnimate(e, t, r) {
  var a,
    o = e.getFlameTransforms();
  for (a = 0; a < o.length; a++) {
    var i = 2e-4 * e.getAnimRates()[a] * (1 + 0.1234 * a),
      n = (e.angles[a] + i * t) % (2 * Math.PI);
    0 > n && (n = 2 * Math.PI - n);
    var l = Math.PI / 180;
    2 > a && n < l * r && (n = l * r), (e.angles[a] = n);
    var g = Math.cos(n),
      c = Math.sin(n),
      s = vec2.fromValues(e.origX[a][0], e.origX[a][1]),
      f = vec2.fromValues(e.origY[a][0], e.origY[a][1]),
      u = vec2.subtract(
        vec2.create(),
        vec2.scale(s, s, g),
        vec2.scale(f, f, c)
      ),
      p = vec2.fromValues(e.origX[a][0], e.origX[a][1]),
      d = vec2.fromValues(e.origY[a][0], e.origY[a][1]),
      x = vec2.add(vec2.create(), vec2.scale(p, p, c), vec2.scale(d, d, g));
    o[a].setX(u), o[a].setY(x);
  }
}
function initAbsRotation(e) {
  (e.origX = []), (e.origY = []), (e.angles = []);
  var t;
  for (t = 0; t < e.xf.length; t++)
    e.origX.push(e.xf[t].getX()),
      e.origY.push(e.xf[t].getY()),
      e.angles.push(0);
}
function createFlameConfig14() {
  return new (class extends FlameConfig {
    constructor() {
      super([
        [0.333, "spherical", 0.4, [0.5, 0], [0, 0.5], [-0.566, 0.4]],
        [0.333, "spherical", 0.4, [0.5, 0], [0, 0.5], [0.566, 0.4]],
        [-0.00382, "horseshoe", 0.4, [0.5, 0], [0, 0.5], [0, -0.551]],
      ]),
        (this.animRate = [-1, 0.4, 3]),
        initAbsRotation(this);
    }
    getMapExposure() {
      return 5.06021;
    }
    getColorful() {
      return 0.213407;
    }
    getTexScale() {
      return 0.908053;
    }
    getFirstLevel() {
      return 7;
    }
    getLastLevel() {
      return 10;
    }
    getScreenInitVal() {
      return 0.0525668;
    }
    getScreenInitScale() {
      return 0.107675;
    }
    getIterations() {
      return 5;
    }
    getAnimRates() {
      return this.animRate;
    }
    getView() {
      var e = 1,
        t = 3.2 - 0.5 * e;
      return [t, t, 0, 0];
    }
    animate(e) {
      skipAnimate(this, e, 80);
    }
  })();
}
function createFlameConfig15() {
  return new (class extends FlameConfig {
    constructor() {
      super([
        [0.333, "spherical", 0.4, [0.5, 0], [0, 0.5], [-0.566, 0.4]],
        [0.333, "spherical", 0.4, [0.5, 0], [0, 0.5], [0.566, 0.4]],
        [0.333, "swirl", 0.4, [0.5, 0], [0, 0.5], [0, -0.551]],
      ]),
        (this.animRate = [-1, 1, 4]),
        initAbsRotation(this);
    }
    getMapExposure() {
      return 2.66021;
    }
    getColorful() {
      return 0.283407;
    }
    getTexScale() {
      return 0.858053;
    }
    getFirstLevel() {
      return 7;
    }
    getLastLevel() {
      return 10;
    }
    getScreenInitVal() {
      return 0.04704;
    }
    getScreenInitScale() {
      return 53.22;
    }
    getIterations() {
      return 5;
    }
    getAnimRates() {
      var e = 1;
      return (this.animRate[2] = 3 * (e - 0.5)), this.animRate;
    }
    getView() {
      var e = 1,
        t = 2.2 - 0.3 * e;
      return [t, t, 0, 0];
    }
    animate(e) {
      skipAnimate(this, e, 80);
    }
  })();
}
var defaultAnimRates = [1, 1, 1, 1, 1, 1, 1, 1];
makeTransforms = function (t) {
  var r,
    a = [];
  for (r = 0; r < t.length; r++) {
    var o = t[r];
    a.push(new FlameTransform(o[0], o[1], o[2], o[3], o[4], o[5]));
  }
  return a;
};
class FlameConfig {
  constructor(e) {
    (this.xf = makeTransforms(e)),
      (this.map_exposure = 1.8),
      (this.colorful = 1.5),
      (this.texscale = 0.8),
      (this.force_vertexonly = 0),
      (this.disc_compute = 50),
      (this.firstlevel = 6),
      (this.lastlevel = 12),
      (this.nlevel = 12),
      (this.screen_initval = 0.3),
      (this.screen_initscale = 0.2),
      (this.iterations = 3),
      (this.oldval = 0);
  }
  decay(e) {
    return (this.oldval = this.oldval * 0.95 + e * 0.3), this.oldval;
  }
  getMapExposure() {
    return this.map_exposure;
  }
  getColorful() {
    return this.colorful;
  }
  getTexScale() {
    return this.texscale;
  }
  getForceVertexOnly() {
    return this.force_vertexonly;
  }
  getDiscCompute() {
    return this.disc_compute;
  }
  getFirstLevel() {
    return this.firstlevel;
  }
  getLastLevel() {
    return this.lastlevel;
  }
  getNLevel() {
    return this.nlevel;
  }
  getScreenInitVal() {
    return this.screen_initval;
  }
  getScreenInitScale() {
    return this.screen_initscale;
  }
  getIterations() {
    return this.iterations;
  }
  getFlameTransforms() {
    return this.xf;
  }
  getView() {
    return [5, 5, 0, 0];
  }
  animate(e) {
    this.defaultAnimate(e);
  }
  defaultAnimate(e) {
    for (var t = this.getFlameTransforms(), r = 0; r < t.length; r++) {
      var a = 2e-4 * this.getAnimRates()[r] * (1 + 0.1234 * r),
        o = a * e,
        i = Math.cos(o),
        n = Math.sin(o),
        l = t[r].getX(),
        s = t[r].getY();
      (l = vec2.scale(l, l, i)), (s = vec2.scale(s, s, n));
      var c = vec2.subtract(vec2.create(), l, s),
        g = t[r].getX(),
        f = t[r].getY(),
        u = vec2.add(vec2.create(), vec2.scale(g, g, n), vec2.scale(f, f, i));
      t[r].setX(c), t[r].setY(u);
    }
  }
  getAnimRates() {
    return defaultAnimRates;
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
class Furnance {
  constructor(e) {
    gl = e;
    var t =
      gl.getExtension("OES_float_linear") ||
      gl.getExtension("OES_half_float_linear");
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
  }
  getConfig() {
    return this.config;
  }
  getI(e) {
    return 1 / e;
  }
  setTextureUniformLocs(e) {
    (e.tex = gl.getUniformLocation(e, "tex")),
      (e.texscale = gl.getUniformLocation(e, "texscale")),
      (e.texscalei = gl.getUniformLocation(e, "texscalei"));
  }
  setProgramParams(e, t) {
    gl.uniform1i(e.tex, 0),
      gl.uniform1f(e.texscale, t),
      gl.uniform1f(e.texscalei, this.getI(t)),
      opengl.setLegacyFixedPipelineParams(e);
  }
  errorExit(e, t) {
    throw (
      (alert("Fatal error> " + e + ">" + t), Error("framebuffer setup failed"))
    );
  }
  bad_framebuffer(e) {
    e === gl.FRAMEBUFFER_COMPLETE
      ? this.errorExit(
          "gl.framebufferTexture2D",
          "framebuffer is actually OK (?!)"
        )
      : e === gl.FRAMEBUFFER_UNSUPPORTED
      ? this.errorExit(
          "gl.framebufferTexture2D",
          "combination of formats is UNSUPPORTED by your card"
        )
      : e === gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT
      ? this.errorExit(
          "gl.framebufferTexture2D",
          "FRAMEBUFFER_INCOMPLETE_ATTACHMENT"
        )
      : e === gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT
      ? this.errorExit(
          "gl.framebufferTexture2D",
          "FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT"
        )
      : e === gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS
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
          "/*------------------- w%TAG% -----------------*/\nuniform vec4 color%TAG%;\nvec4 g%TAG%(vec2 p) {\n\treturn exp2(texture(tex,TXfmPL(p))*20.0)-1.0;\n}\n%INV_CODE%",
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
  simulate_perpixel_maps(e) {
    if (0 == this.progPerPixMap || this.xfm_cached_px != e) {
      var t = [
        "#version 300 es\n",
        "precision highp  float;",
        "in vec2 destcoords;",
        "uniform sampler2D tex;",
        "out vec4 glColor;",
        GLSL_PLutil,
        PLANE_TEX_FUNCs,
        "%INV_FUNCS%",
        "vec4 sum_inverses(vec2 p) {",
        "\tvec4 sum=vec4(0.0);",
        "%SUM_FUNCS%",
        "\treturn log2(sum+1.0)*(1.0/20.0);",
        "}",
        "void main(void) {",
        "\tglColor = sum_inverses(PLfmTX(destcoords));",
        "}",
      ].join("\n");
      this.xfm_cached_px = e;
      var r = this.getInversFnsSnippet(e),
        a = this.getSumFnsSnippet(e),
        o = expandString(t, { "%INV_FUNCS%": r, "%SUM_FUNCS%": a });
      (this.progPerPixMap = opengl.makeProgramObject(
        "#version 300 es\n\nprecision highp  float;\nout vec2 destcoords;\nin vec4 leg_gl_Vertex;\nuniform mat4 leg_gl_ProjectionMatrix;\nuniform mat4 leg_gl_ModelViewMatrix;\nvoid main(void) {\n\tdestcoords = vec2(leg_gl_Vertex);\n\tgl_Position = leg_gl_ProjectionMatrix * leg_gl_ModelViewMatrix * leg_gl_Vertex;\n}",
        o
      )),
        (this.progPerPixMap.uniformLocs = []);
      var i;
      for (i = 0; i < e.length; i++)
        e[i].hasInverse(this.config.getForceVertexOnly()) &&
          (e[i].setUniformLoc(this.progPerPixMap, i),
          (this.progPerPixMap.uniformLocs[i] = gl.getUniformLocation(
            this.progPerPixMap,
            "color" + e[i].getTag()
          )));
      this.setTextureUniformLocs(this.progPerPixMap);
    }
    gl.useProgram(this.progPerPixMap),
      this.setProgramParams(this.progPerPixMap, this.config.getTexScale());
    var i;
    for (i = 0; i < e.length; i++)
      e[i].hasInverse(this.config.getForceVertexOnly()) &&
        (e[i].setUniforms(this.progPerPixMap, i),
        gl.uniform4fv(this.progPerPixMap.uniformLocs[i], this.mapColor(e, i)));
    opengl.draw_texture(
      this.progPerPixMap,
      mat4.create(),
      [-1, -1, 0.5],
      [1, 1, 0.5]
    ),
      gl.useProgram(null);
  }
  TXfmPL(e, t) {
    return (e *= t), 0.5 * (e / Math.sqrt(1 + e * e)) + 0.5;
  }
  useSeedShader() {
    if (!this.seedShader) {
      var e = opengl.loadShader(
          gl.VERTEX_SHADER,
          "#version 300 es\n\t\t\t\t  precision highp float; \t\t\t\t  in vec4 a_Vertex; \t\t\t\t  uniform vec4 u_color; \t\t\t\t  out vec4 v_color; \t\t\t\t  uniform mat4 mvp_matrix; \t\t\t\t  void main() { \t\t\t\t\t\tgl_Position = mvp_matrix * a_Vertex; \t\t\t\t\t\tv_color = u_color; \t\t\t\t  }"
        ),
        t = opengl.loadShader(
          gl.FRAGMENT_SHADER,
          "#version 300 es\n\t\t\t\t  precision highp float; \t\t\t\t  in vec4 v_color; \t\t\t\t  out vec4 glColor; \t\t\t\t  void main() { \t\t\t\t\t  glColor = v_color; \t\t\t\t  }"
        ),
        r = gl.createProgram();
      if (
        (gl.attachShader(r, e),
        gl.attachShader(r, t),
        gl.linkProgram(r),
        !gl.getProgramParameter(r, gl.LINK_STATUS))
      )
        throw Error("Unable to initialize the shader program.");
      gl.useProgram(r),
        (r.a_Vertex = gl.getAttribLocation(r, "a_Vertex")),
        (r.ucolorloc = gl.getUniformLocation(r, "u_color")),
        (r.upointsizeloc = gl.getUniformLocation(r, "u_pointsize")),
        (r.mvpmatrixloc = gl.getUniformLocation(r, "mvp_matrix")),
        (this.seedShader = r);
    } else gl.useProgram(this.seedShader);
    return this.seedShader;
  }
  drawSeedTexture(e) {
    gl.clearColor(0, 0, 0, 1),
      gl.clear(gl.COLOR_BUFFER_BIT),
      opengl.uPushMatrix(),
      opengl.uTranslatef(0.5, 0.5, 0);
    var t = this.config.getScreenInitScale(),
      r = t * (this.TXfmPL(1, e) - this.TXfmPL(0, e)),
      a = this.useSeedShader(),
      o = vec3.fromValues(0, 0, 0),
      i = vec3.fromValues(r, r, 0);
    gl.uniform1f(a.upointsizeloc, 1);
    var n = this.config.getScreenInitVal();
    gl.uniform4f(a.ucolorloc, n, n, n, 1),
      gl.uniform1i(a.stextureloc, 0),
      opengl.multiply(opengl.mvpMatrix, opengl.mvMatrix, opengl.prMatrix),
      gl.uniformMatrix4fv(a.mvpmatrixloc, !1, opengl.mvpMatrix),
      opengl.draw_texture(a, mat4.create(), o, i),
      opengl.uPopMatrix();
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
    var s = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, s),
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(this.cachedVertices),
        gl.STATIC_DRAW
      ),
      (s.itemSize = 3),
      (s.numItems = this.cachedVertices.length / 3),
      gl.enableVertexAttribArray(e.leg_gl_Vertex),
      gl.vertexAttribPointer(e.leg_gl_Vertex, s.itemSize, gl.FLOAT, !1, 0, 0),
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, s.numItems);
  }
  simulate_pervertex_map(e, t, r) {
    if (0 == this.xfm_prog[r] || !e[r].equals(this.xfm_cached_vx[r])) {
      var a = [
        "#version 300 es\n",
        "precision highp float;",
        GLSL_PLutil,
        PLANE_TEX_FUNCs,
        " %VAR_CODE%",
        "vec2 applyMap(vec2 t) {",
        "\treturn TXfmPL(applyMap%ID%(PLfmTX(t)));",
        "}",
        "out vec4 color;",
        "out vec2 texcoords;",
        "in vec4 leg_gl_Color;",
        "in vec4 leg_gl_Vertex;",
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
      (this.xfm_prog[r] = opengl.makeProgramObject(
        i,
        "#version 300 es\n\nprecision highp float;\nin vec4 color;\nin vec2 texcoords;\nuniform sampler2D tex;\nout vec4 glColor;\nvoid main(void) {\n\tglColor = color*texture(tex,texcoords);\n}"
      )),
        e[r].setUniformLoc(this.xfm_prog[r]),
        this.setTextureUniformLocs(this.xfm_prog[r]);
    }
    var n = this.xfm_prog[r];
    gl.useProgram(n),
      this.setProgramParams(n, this.config.getTexScale()),
      e[r].setUniforms(n, r),
      this.draw_pervertex_map(n, this.config.getDiscCompute()),
      gl.useProgram(null);
  }
  drawInverseFuncs(e, t) {
    gl.disable(gl.BLEND),
      this.config.getForceVertexOnly()
        ? (gl.clearColor(0, 0, 0, 1), gl.clear(gl.COLOR_BUFFER_BIT))
        : this.simulate_perpixel_maps(e, t),
      gl.enable(gl.BLEND);
    var r;
    for (r = 0; r < e.length; r++)
      e[r].hasInverse(this.config.getForceVertexOnly()) ||
        this.simulate_pervertex_map(e, t, r);
  }
  setFramebufTextureAttachment(e) {
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      gl.COLOR_ATTACHMENT0,
      gl.TEXTURE_2D,
      e,
      0
    );
    var t = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    t != gl.FRAMEBUFFER_COMPLETE && this.bad_framebuffer(t),
      gl.disable(gl.DEPTH_TEST);
  }
  drawMapLevel(e, t, r, a) {
    var o = t.getDestination();
    this.setFramebufTextureAttachment(o);
    var i = 1 << r,
      n = 1 << r;
    if (
      (gl.viewport(0, 0, i, n),
      gl.scissor(0, 0, i, n),
      0 == a && r == this.config.getFirstLevel()
        ? this.drawSeedTexture(this.config.getTexScale())
        : this.drawInverseFuncs(e, r),
      gl.bindTexture(gl.TEXTURE_2D, o),
      gl.generateMipmap(gl.TEXTURE_2D),
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
            o = gl.createTexture();
          (o.width = a),
            (o.height = a),
            (this.texLevels[t][r] = o),
            gl.bindTexture(gl.TEXTURE_2D, this.texLevels[t][r]);
          var n = this.useFloatTextures ? gl.FLOAT : gl.UNSIGNED_BYTE;
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, a, a, 0, gl.RGBA, n, null);
          var l =
            gl.getExtension("EXT_texture_filter_anisotropic") ||
            gl.getExtension("MOZ_EXT_texture_filter_anisotropic") ||
            gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
          l &&
            gl.texParameterf(gl.TEXTURE_2D, l.TEXTURE_MAX_ANISOTROPY_EXT, 16),
            gl.texParameteri(
              gl.TEXTURE_2D,
              gl.TEXTURE_MIN_FILTER,
              gl.LINEAR_MIPMAP_LINEAR
            ),
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR),
            gl.generateMipmap(gl.TEXTURE_2D),
            gl.bindTexture(gl.TEXTURE_2D, null);
        }
      }
    }
    return this.texLevels;
  }
  getFrameBuffer() {
    return 0 == this.fbo && (this.fbo = gl.createFramebuffer()), this.fbo;
  }
  setupLegacyShaderProg() {
    opengl.uMatrixMode(opengl.U_PROJECTION),
      opengl.uLoadIdentity(),
      opengl.uMatrixMode(opengl.U_MODELVIEW),
      opengl.uLoadIdentity(),
      opengl.uScalef(1, 1, 0.01),
      opengl.uScalef(2, 2, 1),
      opengl.uTranslatef(-0.5, -0.5, 0);
  }
  ignite() {
    this.setupLegacyShaderProg();
    var e = new FrameMgr(0, null),
      t = this.getFrameBuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, t);
    var r = this.getTextureLevels();
    gl.blendFunc(gl.ONE, gl.ONE), gl.enable(gl.BLEND), gl.disable(gl.CULL_FACE);
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
    return gl.bindFramebuffer(gl.FRAMEBUFFER, null), e.getSource();
  }
}
var gl, demo;
class DemoMain {
  constructor() {
    (this.sizeX = window.innerWidth),
      (this.sizeY = window.innerHeight),
      (this.flameConfigs = [
        [1e3, 15, 1e3, createFlameConfig11()],
        [1e3, 15, 1e3, createFlameConfigX5()],
        [1e3, 15, 1e3, createFlameConfigX6()],
        [1e3, 15, 1e3, createFlameConfigX4()],
        [1e3, 15, 1e3, createFlameConfig14()],
        [1e3, 15, 1e3, createFlameConfigX3()],
        [1e3, 15, 1e3, createFlameConfigX2()],
        [1e3, 15, 1e3, createFlameConfig12()],
        [1e3, 15, 1e3, createFlameConfig10()],
        [1e3, 15, 1e3, createFlameConfigX()],
        [1e3, 15, 1e3, createFlameConfig6()],
        [1e3, 15, 1e3, createFlameConfig2()],
        [1e3, 15, 1e3, createFlameConfig1()],
        [1e3, 15, 1e3, createFlameConfig7()],
        [1e3, 15, 1e3, createFlameConfig9()],
        [1e3, 15, 1e3, createFlameConfig4()],
        [1e3, 15, 1e3, createFlameConfig5()],
        [1e3, 15, 1e3, createFlameConfigX1()],
        [1e3, 15, 1e3, createFlameConfig0()],
        [1e3, 15, 1e3, createFlameConfig8()],
      ]),
      this.furnance,
      (this.currentConfigId = 0),
      this.currentConfig,
      this.ctxSpectrum,
      this.spectrumWidth,
      this.spectrumHeight,
      (this.lastTime = 0),
      this.currentAnimStart,
      (this.oldval = 0);
  }
  init() {
    (window.gl = this.initGl(document.getElementById("canvas2"), null)),
      (window.opengl = new OpenGL()),
      (this.furnance = new Furnance(gl));
  }
  initGl(e, t) {
    var r, a;
    if (
      ((a =
        "undefined" != typeof e && null != e
          ? e
          : document.getElementById("someCanvas")),
      "undefined" != typeof t && null != t)
    )
      r = t;
    else {
      try {
        r = a.getContext("webgl2", { depth: !1 });
      } catch (t) {}
      if (!r) return void alert("Your browser does not support WebGL2");
    }
    return (a.width = this.sizeX), (a.height = this.sizeY), r;
  }
  getNextConfig() {
    return (
      this.currentConfig && this.currentConfigId++,
      this.currentConfigId >= this.flameConfigs.length &&
        (this.currentConfigId = 0),
      (this.currentConfig = this.flameConfigs[this.currentConfigId]),
      this.currentConfig
    );
  }
  getConfig() {
    return this.currentConfig ? this.currentConfig : this.getNextConfig();
  }
  animate() {
    var e = new Date().getTime();
    0 != this.lastTime && this.furnance.getConfig().animate(e - this.lastTime),
      (this.lastTime = e);
  }
  render() {
    var e = new Date().getTime();
    this.currentAnimStart || (this.currentAnimStart = e);
    for (
      var t, r, a, o = this.getConfig();
      (t = this.currentAnimStart + o[0]),
        (r = t + 1e3 * o[1]),
        (a = r + o[2]),
        e >= a;

    )
      (o = this.getNextConfig()), (this.currentAnimStart = e);
    var i = 1;
    e < t
      ? (i = (e - this.currentAnimStart) / o[0])
      : e >= r && (i = 1 - (e - r) / o[2]),
      this.furnance.setConfig(o[3]),
      this.drawScene(window.innerWidth, window.innerHeight, i),
      this.animate();
    window.requestAnimFrame(this.render.bind(this));
  }
  getPostprocessShader() {
    return (
      "undefined" == typeof this.postprocessProg &&
        ((this.postprocessProg = opengl.makeProgramObject(
          "#version 300 es\n\nprecision highp float;\nout vec3 worldCoords;\nin vec4 leg_gl_Vertex;\nvoid main(void) {\n\tworldCoords = vec3(leg_gl_Vertex );\n\tgl_Position = leg_gl_Vertex;\n}",
          "#version 300 es\n\nprecision highp float;\nfloat ab(float x) { return x/sqrt(1.0+x*x)*0.5+0.5; }\nvec2 ab(vec2 p) { return vec2(ab(p.x),ab(p.y)); }\nin vec3 worldCoords;\nout vec4 fragColor;\nuniform sampler2D uTexture;\nuniform float uColormode;\nuniform vec2 uScale;\nuniform vec2 uMove;\nuniform float uFade;\nuniform float uDither[64];\nuniform float uMix;\nfloat Scale = 1.0;\nfloat find_closest(int x, int y, float c0) {\nfloat limit = 0.0;\nif(x < 8) {\nint index = x + y*8;\nlimit = (uDither[index]+1.0)/64.0;\n}\nif(c0 < limit)\n\treturn 0.0;\nreturn 1.0;\n}\nvoid main(void) {\nvec2 uv=ab(vec2(uScale.x*(worldCoords.x+uMove.x) ,uScale.y*((worldCoords.y+uMove.y))));\nvec3 rgb = texture(uTexture, uv).rgb;\nrgb= (rgb*uColormode + (1.0-rgb)*(1.0-uColormode))*uFade;\nvec3 c;\nif (uMix > 0.0) {\nvec2 xy = gl_FragCoord.xy * Scale;\nint x = int(mod(xy.x, 8.0));\nint y = int(mod(xy.y, 8.0));\nc.r = find_closest(x, y, rgb.r);\nc.g = find_closest(x, y, rgb.g);\nc.b = find_closest(x, y, rgb.b);\nc= mix(c, rgb, uMix);\n} else {\nc= rgb;\n}\nfragColor = vec4(c, 1.0);\n}"
        )),
        (this.postprocessProg.uScale = gl.getUniformLocation(
          this.postprocessProg,
          "uScale"
        )),
        (this.postprocessProg.uMove = gl.getUniformLocation(
          this.postprocessProg,
          "uMove"
        )),
        (this.postprocessProg.uColormode = gl.getUniformLocation(
          this.postprocessProg,
          "uColormode"
        )),
        (this.postprocessProg.uFade = gl.getUniformLocation(
          this.postprocessProg,
          "uFade"
        )),
        (this.postprocessProg.uTexture = gl.getUniformLocation(
          this.postprocessProg,
          "uTexture"
        )),
        (this.postprocessProg.uDither = gl.getUniformLocation(
          this.postprocessProg,
          "uDither"
        )),
        (this.postprocessProg.uMix = gl.getUniformLocation(
          this.postprocessProg,
          "uMix"
        ))),
      this.postprocessProg
    );
  }
  decay(e) {
    return (this.oldval = this.oldval * 0.95 + e * 0.3), this.oldval;
  }
  drawScene(e, t, r) {
    var a = this.furnance.ignite();
    gl.bindTexture(gl.TEXTURE_2D, a),
      gl.viewport(0, 0, e, t),
      gl.enable(gl.DEPTH_TEST),
      gl.disable(gl.BLEND),
      gl.clearColor(0.3, 0.5, 0.7, 0),
      gl.clear(gl.COLOR_BUFFER_BIT + gl.DEPTH_BUFFER_BIT),
      gl.enable(gl.DEPTH_TEST);
    var o = this.getPostprocessShader();
    gl.useProgram(o);
    var i = this.furnance.getConfig().getView();
    gl.activeTexture(gl.TEXTURE0),
      gl.uniform1i(o.uTexture, 0),
      gl.uniform2f(o.uScale, i[0], i[1]),
      gl.uniform2f(o.uMove, i[2], i[3]),
      gl.uniform1f(
        o.uColormode,
        0 > this.furnance.getConfig().getMapExposure() ? 0 : 1
      ),
      gl.uniform1f(o.uFade, r);
    var n = 1;
    gl.uniform1f(o.uMix, 1 - n),
      gl.uniform1fv(
        o.uDither,
        [
          0, 32, 8, 40, 2, 34, 10, 42, 48, 16, 56, 24, 50, 18, 58, 26, 12, 44,
          4, 36, 14, 46, 6, 38, 60, 28, 52, 20, 62, 30, 54, 22, 3, 35, 11, 43,
          1, 33, 9, 41, 51, 19, 59, 27, 49, 17, 57, 25, 15, 47, 7, 39, 13, 45,
          5, 37, 63, 31, 55, 23, 61, 29, 53, 21,
        ]
      );
    opengl.draw_texture(o, mat4.create(), [-1, -1, 0.5], [1, 1, 0.5]),
      gl.useProgram(null);
  }
}
function startDemo() {
    (window.requestAnimFrame = (function () {
      return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (e) {
          window.setTimeout(e, 1e3 / 60);
        }
      );
    })()),
    (window.demo = new DemoMain()),
    window.demo.init(),
    window.demo.render()
}

startDemo()
