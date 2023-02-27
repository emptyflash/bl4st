/**
 * Ablaze
 *
 * JavaScript/WEBGL2 music visualization using "fractal flames".
 *
 * Copyright (C) 2014 Juergen Wothke
 *
 * Terms of Use: This software is licensed under a CC BY-NC-SA
 * (http://creativecommons.org/licenses/by-nc-sa/4.0/).
 *
 * based on a GPU version by:
 *	Orion Sky Lawlor, olawlor@acm.org, 2011-10-31 (Public Domain)
 */
var a = [
  "_cooldown",
  "_lastBeat",
  "_subbands",
  "_energyHistSize",
  "_energyHist",
  "_currentBeats",
  "getReferenceEnergy",
  "length",
  "bandEnergy",
  "getStdDeviation",
  "sqrt",
  "getThresholdFactor",
  "max",
  "detectBeats",
  "getTime",
  "getCurrentEnergy",
  "floor",
  "push",
  "updateHistory",
  "shift",
  "updateBeats",
  "_currentBandBeats",
  "getBeats",
  "prototype",
  "frequencyBinCount",
  "array",
  "getByteFrequencyData",
  "getSpectrum",
  "usesAnalyzer",
  "maxDecibels",
  "minDecibels",
  "getFloatFrequencyData",
  "PI2",
  "alpha",
  "apply",
  "cos",
  "fft",
  "window",
  "minDeci",
  "maxDeci",
  "sampleRate",
  "getChannelData",
  "immitateWebkitFFT",
  "forward",
  "abs",
  "linearToDecibels",
  "min",
  "log",
  "LN10",
  "detector",
  "spectrum",
  "lastSpectrum",
  "showSpectrum",
  "scriptProcessor",
  "getBeatAnalyzerNode",
  "smoothingTimeConstant",
  "connect",
  "createScriptProcessor",
  "onaudioprocess",
  "inputBuffer",
  "bind",
  "getBeatAnalyzer",
  "getBeatAnalyzerSpectrum",
  "getElementsByTagName",
  "script",
  "src",
  "split",
  "slice",
  "join",
  "proxy.php?",
  "waveImg",
  "updateImage",
  "onload",
  "drawWaveform",
  "getElementById",
  "waveformCanvas",
  "getContext",
  "save",
  "#333333",
  "#232323",
  "#999999",
  "#b9b9b9",
  "#ff5200",
  "#ff3400",
  "#ffd5c0",
  "#ffaa80",
  "globalAlpha",
  "createLinearGradient",
  "addColorStop",
  "fillStyle",
  "fillRect",
  "lineWidth",
  "strokeStyle",
  "rgba(255,255,255,0.3)",
  "beginPath",
  "moveTo",
  "lineTo",
  "stroke",
  "globalCompositeOperation",
  "destination-out",
  "width",
  "height",
  "drawImage",
  "restore",
  "createBiquadFilter",
  "LOWPASS",
  "lowpass",
  "HIGHPASS",
  "highpass",
  "BANDPASS",
  "bandpass",
  "LOWSHELF",
  "lowshelf",
  "PEAKING",
  "peaking",
  "HIGHSHELF",
  "highshelf",
  "NOTCH",
  "notch",
  "ALLPASS",
  "allpass",
  "NO_FILTER",
  "analyzerCfg",
  "once",
  "getAnalyzer",
  "getHiHatAnalyzer",
  "getBandAnalyzer",
  "getVolAnalyzer",
  "setupBeatAnalyzer",
  "destination",
  "setupWebAudioNodes",
  "createMediaElementSource",
  "createAnalyser",
  "fftSize",
  "type",
  "frequency",
  "value",
  "gain",
  "setConfig",
  "currentSong",
  "playlist",
  "player",
  "running",
  "setupPlaylist",
  "indexOf",
  "/sets/",
  "setNextSong",
  "tracks",
  "permalink_url",
  "replace",
  "http://soundcloud.com",
  "https://soundcloud.com",
  "#sound-title",
  "html",
  "<a\x20target=\x22_blank\x22\x20href=\x22https://www.soundcloud.com",
  "title",
  "</a>",
  "waveform_url",
  "initMusic",
  "startPlayCallback",
  "startMusic",
  "location",
  "hash",
  "substring",
  "/fractalflames/sets/ablaze",
  "autoplay",
  "#isloading",
  "empty",
  "append",
  "<div\x20class=\x22loading\x22><img\x20src=\x22/ablaze/images/loading.gif\x22></div>",
  ".json",
  "http:",
  "https:",
  "protocol",
  "getJSON",
  "setAttribute",
  "/audio",
  "addEventListener",
  "stalled",
  "play",
  "emptied",
  "suspend",
  "playing",
  "canplay",
  "startProgress",
  "ended",
  "#mp3Source",
  "attr",
  "detach",
  "appendTo",
  "#player",
  "load",
  "fail",
  "Sorry\x20but\x20there\x20is\x20no\x20music\x20with\x20perma\x20link:\x20",
  "updateProgress",
  "stopProgress",
  "getCurrentPlayTime",
  "currentTime",
  "duration",
  "U_PROJECTION",
  "U_MODELVIEW",
  "U_TEXTURE",
  "U_VERTEX_ARRAY",
  "U_TEXTURE_COORD_ARRAY",
  "U_COLOR_ARRAY",
  "mvMatrix",
  "prMatrix",
  "mvpMatrix",
  "txMatrix",
  "activeMatrix",
  "mvStack",
  "prStack",
  "txStack",
  "activeStack",
  "makeProgramObject",
  "loadShader",
  "VERTEX_SHADER",
  "FRAGMENT_SHADER",
  "createProgram",
  "attachShader",
  "deleteShader",
  "linkProgram",
  "getProgramParameter",
  "LINK_STATUS",
  "error",
  "An\x20error\x20occurred\x20compiling\x20the\x20shaders:\x20",
  "getProgramInfoLog",
  "Unable\x20to\x20initialize\x20the\x20shader\x20program.",
  "setLegacyAttribLocation",
  "draw_texture",
  "transformMat4",
  "create",
  "fromValues",
  "createBuffer",
  "bindBuffer",
  "ARRAY_BUFFER",
  "bufferData",
  "STATIC_DRAW",
  "itemSize",
  "numItems",
  "enableVertexAttribArray",
  "leg_gl_Vertex",
  "vertexAttribPointer",
  "FLOAT",
  "drawArrays",
  "TRIANGLE_STRIP",
  "createShader",
  "shaderSource",
  "compileShader",
  "getShaderParameter",
  "COMPILE_STATUS",
  "getShaderInfoLog",
  "uMatrixMode",
  "uLoadIdentity",
  "multiply",
  "uTranslatef",
  "uScalef",
  "uPushMatrix",
  "uPopMatrix",
  "pop",
  "getAttribLocation",
  "leg_gl_ProjectionMatrix",
  "getUniformLocation",
  "leg_gl_ModelViewMatrix",
  "leg_gl_Color",
  "setLegacyFixedPipelineParams",
  "uniformMatrix4fv",
  "_name",
  "_code",
  "_areaCode",
  "getName",
  "getCode",
  "hasInverse",
  "getInverseCode",
  "getAreaCode",
  "_inversecode",
  "linear",
  "p=t;",
  "return\x20f(p);",
  "return\x201.0;",
  "sinusoidal",
  "p=vec2(sin(t.x),sin(t.y));",
  "if\x20(abs(p.x)>1.0\x20||\x20abs(p.y)>1.0)\x20return\x20vec4(0.0);",
  "vec4\x20sum=vec4(0.0);",
  "vec2\x20t=vec2(asin(p.x),asin(p.y));",
  "const\x20float\x20img=2.0;",
  "for\x20(float\x20dy=-img;dy<=img;dy++)\x20{",
  "\x09for\x20(float\x20dx=-img;dx<=img;dx++)\x20{",
  "\x09\x09sum+=f(vec2(\x20t.x+M_PI*2.0*dx,t.y+M_PI*2.0*dy));",
  "\x09\x09sum+=f(vec2(-t.x+M_PI*(1.0+2.0*dx),t.y+M_PI*2.0*dy));",
  "\x09\x09sum+=f(vec2(-t.x+M_PI*(1.0+2.0*dx),-t.y+M_PI*(1.0+2.0*dy)));",
  "\x09\x09sum+=f(vec2(\x20t.x+M_PI*2.0*dx,-t.y+M_PI*(1.0+2.0*dy)));",
  "return\x20sum;",
  "return\x20cos(t.x)*cos(t.y);",
  "spherical",
  "float\x20r2=dot(t,t)\x20+\x20EPS;",
  "p=t/r2;",
  "float\x20r2=dot(p,p);",
  "return\x20f(p/r2);",
  "float\x20r2=dot(t,t);",
  "return\x201.0/(r2*r2);",
  "swirl",
  "float\x20s=sin(r2);\x20float\x20c=cos(r2);",
  "p=vec2(",
  "\x09s*t.x-c*t.y,",
  "\x09c*t.x+s*t.y",
  "if\x20(r2>10.0)\x20return\x20vec4(0.0);",
  "return\x20f(vec2(",
  "\x09s*p.x+c*p.y,",
  "\x09-c*p.x+s*p.y",
  "));",
  "horseshoe",
  "float\x20r=1.0/(length(t)+EPS);",
  "\x09(t.x-t.y)*(t.x+t.y)*r,",
  "\x092.0*t.x*t.y*r",
  "float\x20r2\x20=\x20p.x*p.x\x20+\x20p.y*p.y;",
  "float\x20r=sqrt(r2);",
  "float\x20aspect\x20=\x20(p.x\x20+\x20r)/p.y;",
  "float\x20y\x20=\x20sqrt(0.5*(r2\x20-\x20p.x*r));",
  "return\x20f(vec2(y*aspect,y))",
  "\x09\x20\x20+f(vec2(-y*aspect,-y));",
  "return\x202.0;",
  "polar",
  "\x09atan2(t.x,t.y)*M_1_PI,",
  "\x09length(t)-1.0",
  "if\x20(p.x>=-1.0\x20&&\x20p.x<=1.0\x20&&\x20p.y>-1.0)",
  "\x09return\x20f((p.y+1.0)*vec2(sin(p.x*M_PI),cos(p.x*M_PI)));",
  "else",
  "\x09return\x20vec4(0.0);",
  "return\x20M_1_PI/length(t);",
  "handkerchief",
  "float\x20a=atan2(t.x,t.y);",
  "float\x20r=length(t);",
  "p=r*vec2(",
  "\x09sin(a+r),",
  "\x09cos(a-r)",
  "return\x20cos(2.0*r)\x20+\x202.0*t.x*t.y/r\x20-\x20r*sin(2.0*r);",
  "heart",
  "\x09r*sin(r*a),",
  "\x09(-r)*cos(r*a)",
  "float\x20r=length(p);",
  "float\x20at2=atan2(p.x,-p.y);",
  "float\x20pilo=ceil((-M_PI*r-at2)/(2.0*M_PI));",
  "float\x20pihi=floor((+M_PI*r-at2)/(2.0*M_PI));",
  "float\x20s=\x20floor(pihi-pilo);",
  "for\x20(float\x20pic=pilo;\x20pic<=pihi;\x20pic++)\x20{",
  "\x09if\x20(pic>s)\x20break;",
  "\x09float\x20a=(at2+\x20(pic+pilo)\x20*5.0*M_PI)/r;",
  "\x09sum+=f(r*vec2(sin(a),cos(a)));",
  "return\x20length(t);",
  "disc",
  "float\x20a=atan2(t.x,t.y)*M_1_PI;",
  "float\x20r=length(t)*M_PI;",
  "p=a*vec2(",
  "\x09sin(r),",
  "\x09cos(r)",
  "return\x20M_1_PI*a/length(t);",
  "spiral",
  "float\x20r=length(t)+EPS;",
  "float\x20r1=1.0/r;",
  "p=r1*vec2(",
  "\x09cos(a)+sin(r),",
  "\x09sin(a)-cos(r)",
  "return\x20(1.0\x20-\x20r*cos(r\x20-\x20a)\x20+\x20sin(r\x20-\x20a))/r2;",
  "hyperbolic",
  "float\x20r2=dot(t,t)+1.0e-6;",
  "p=vec2(t.x/r2,t.y);",
  "float\x20v01\x20=\x201.0/p.x;",
  "float\x20det=1.0\x20-\x204.0*p.x*p.x*p.y*p.y;",
  "if\x20(det>=0.0)\x20{",
  "\x09float\x20v03\x20=\x20sqrt(det);",
  "\x09return\x20f(vec2(((v01*(1.0\x20-\x20v03))/2.0),p.y))",
  "\x09\x09\x20\x20+f(vec2(((v01*(1.0\x20+\x20v03))/2.0),p.y));",
  "}\x20else\x20{",
  "return\x20(1.0-2.0*t.y*t.y/r2)/r2;",
  "diamond",
  "p=vec2(sin(a)*cos(r),cos(a)*sin(r));",
  "return\x20(cos(2.0*r)+2.0*t.y*t.y/r2-1.0)/(2.0*r);",
  "float\x20n0=sin(a+r);",
  "float\x20n1=cos(a-r);",
  "float\x20m0=n0*n0*n0*r;",
  "float\x20m1=n1*n1*n1*r;",
  "p=vec2(m0+m1,m0-m1);",
  "float\x20s2r=sin(2.0*r);",
  "float\x20c2r=cos(2.0*r);",
  "float\x20inner=s2r+t.x*t.y/r2;",
  "return\x201.5\x20/\x20r*(6.0*t.x*t.y\x20+\x20r*c2r\x20-\x203.0*r2*s2r)*inner*inner;",
  "julia",
  "p=vec2(sqrt(0.5*(r+t.y)),sqrt(0.5*(r-t.y)));",
  "if\x20(t.x<0.0)\x20p.y=-p.y;",
  "if\x20(p.x<0.0)\x20return\x20vec4(0.0);",
  "return\x20f(vec2(\x202.0*p.x*p.y,\x20(p.x\x20-\x20p.y)*(p.x\x20+\x20p.y)\x20));",
  "return\x201.0/(4.0*length(t));",
  "bent",
  "vec2\x20n=t;",
  "if\x20(n.x<0.0)\x20n.x*=2.0;",
  "if\x20(n.y<0.0)\x20n.y*=0.5;",
  "p=n;",
  "vec2\x20n=p;",
  "if\x20(n.x<0.0)\x20n.x*=0.5;",
  "if\x20(n.y<0.0)\x20n.y*=2.0;",
  "return\x20f(n);",
  "float\x20scale=1.0;",
  "if\x20(t.x<0.0)\x20scale=2.0;",
  "if\x20(t.y<0.0)\x20scale*=0.5;",
  "return\x20scale;",
  "fisheye",
  "r=2/(r+1);",
  "p=r*vec2(t.y,t.x);",
  "float\x20s=length(p);",
  "float\x20r=1.0/(2.0-s);",
  "if\x20(r>=0.0)",
  "\x09return\x20f(r*vec2(p.y,p.x));",
  "float\x20r1=1.0+r;",
  "return\x204.0/(r1*r1*r1);",
  "exponential",
  "float\x20dx=exp(t.x-1.0);",
  "float\x20dy=M_PI*t.y;",
  "p=dx*vec2(cos(dy),sin(dy));",
  "float\x20a=atan2(p.y,p.x);",
  "return\x20f(vec2(log(r)+1.0,a*M_1_PI));",
  "return\x20M_PI*exp(2.0*t.x-2.0);",
  "power",
  "p=vec2(cos(a),sin(a))*pow(length(t),sin(a));",
  "float\x20r=pow(length(p),\x201.0/sin(a));",
  "if\x20(r==0.0\x20||\x20r+1.0==r)",
  "\x09return\x20f(r*vec2(sin(a),cos(a)));",
  "float\x20ir=1.0/length(t);",
  "float\x20r=1.0/ir;",
  "return\x20pow(r,\x20(2.0*(t.x*ir)-2.0))*(t.x*ir);",
  "cosine",
  "float\x20n=t.x*M_PI;",
  "p=vec2(cos(n)*cosh(t.y),-sin(n)*sinh(t.y));",
  "return\x200.5*M_PI*(-cos(2.0*M_PI*t.x)+cosh(2.0*t.y));",
  "float\x20TXfmPL(float\x20x)\x20{",
  "\x09x*=texscale;",
  "\x09return\x201.0/sqrt(1.0+x*x)*0.5+0.5;",
  "vec2\x20TXfmPL(vec2\x20p)\x20{",
  "\x09return\x20vec2(TXfmPL(p.x/EPS),TXfmPL(p.y/EPS));",
  "float\x20PLfmTX(float\x20s)\x20{",
  "\x09float\x20u=2.0*s-1.0;",
  "\x09return\x20texscalei/sqrt(1.0-u*u);",
  "vec2\x20PLfmTX(vec2\x20s)\x20{",
  "\x09return\x20vec2(PLfmTX(s.x/EPS),PLfmTX(s.y/EPS));",
  "const\x20float\x20M_PI=3.14159265358979;",
  "const\x20float\x20M_1_PI=1.0/M_PI;",
  "const\x20float\x20EPS=1.0e-6;",
  "uniform\x20float\x20texscale;",
  "uniform\x20float\x20texscalei;",
  "float\x20atan2(float\x20y,\x20float\x20x)\x20{",
  "\x20\x20float\x20t0,\x20t1,\x20t2,\x20t3,\x20t4;",
  "\x20\x20t3\x20=\x20abs(x);",
  "\x20\x20t1\x20=\x20abs(y);",
  "\x20\x20t0\x20=\x20max(t3,\x20t1);",
  "\x20\x20t1\x20=\x20min(t3,\x20t1);",
  "\x20\x20t3\x20=\x201.0\x20/\x20t0;",
  "\x20\x20t3\x20=\x20t1\x20*\x20t3;",
  "\x20\x20t4\x20=\x20t3\x20*\x20t3;",
  "\x20\x20t0\x20=\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20-0.013480470;",
  "\x20\x20t0\x20=\x20t0\x20*\x20t4\x20+\x200.057477314;",
  "\x20\x20t0\x20=\x20t0\x20*\x20t4\x20-\x200.121239071;",
  "\x20\x20t0\x20=\x20t0\x20*\x20t4\x20+\x200.195635925;",
  "\x20\x20t0\x20=\x20t0\x20*\x20t4\x20-\x200.332994597;",
  "\x20\x20t0\x20=\x20t0\x20*\x20t4\x20+\x200.999995630;",
  "\x20\x20t3\x20=\x20t0\x20*\x20t3;",
  "\x20\x20if\x20(abs(y)\x20>\x20abs(x))\x20t3=\x201.570796327\x20-\x20t3;",
  "\x20\x20if\x20(x\x20<\x200.0)\x20t3=\x20\x20M_PI\x20-\x20t3;",
  "\x20\x20if\x20(y\x20<\x200.0)\x20t3=\x20-t3;",
  "\x20\x20return\x20t3;",
  "_tag",
  "_var",
  "_weight",
  "_wvar",
  "_nUniforms",
  "getTag",
  "getWeight",
  "getX",
  "getY",
  "getO",
  "setX",
  "setY",
  "setO",
  "equals",
  "undefined",
  "NOOOO!!!!!\x20\x215orm::getAreaCode\x20not\x20implemented",
  "getUniformDecl",
  "uniform\x20vec2\x215%TAG%[8];",
  "%TAG%",
  "getAffineArea",
  "makeInverseMatrix",
  "scale",
  "add",
  "getXfUniforms",
  "getFloat32Array",
  "setUniformLoc",
  "xfUniformLoc",
  "setUniforms",
  "nUniforms",
  "uniform2fv",
  "vec2\x20applyMap%TAG%(vec2\x20t)\x20{",
  "\x09t=xf%TAG%[0]*t.x+xf%TAG%[1]*t.y+xf%TAG%[2];",
  "\x20\x09vec2\x20p;",
  "{\x09%CODE%\x0a}",
  "\x09return\x215%TAG%[6].x*p;",
  "float\x20jacobian%TAG%(vec2\x20t)\x20{",
  "\x20%AREA_CODE%",
  "float\x20getDensity(vec2\x20t)\x20{",
  "\x09return\x201.0/(1.0e-3+abs(xf%TAG%[7].x*jacobian%TAG%(t)));",
  "%CODE%",
  "%AREA_CODE%",
  "NOINV",
  "vec4\x20f%TAG%(vec2\x20inv)\x20{",
  "\x09float\x20areaScale=1.0/(1.0e-2+abs(xf%TAG%[7].x*jacobian%TAG%(inv)));",
  "\x09vec2\x20p=xf%TAG%[3]*inv.x+xf%TAG%[4]*inv.y+xf%TAG%[5];",
  "\x09return\x20areaScale*g%TAG%(p);",
  "vec4\x20nonlinear_inverse%TAG%(vec2\x20p)\x20{",
  "\x09p=p*xf%TAG%[6].y;",
  "\x09%INV_CODE%",
  "%INV_CODE%",
  "getMapExposure",
  "getColorful",
  "getTexScale",
  "getFirstLevel",
  "getLastLevel",
  "getScreenInitVal",
  "getScreenInitScale",
  "getIterations",
  "animate",
  "defaultAnimate",
  "getView",
  "getAnimRates",
  "animRate",
  "sin",
  "decay",
  "getFlameTransforms",
  "angles",
  "origX",
  "origY",
  "subtract",
  "map_exposure",
  "colorful",
  "texscale",
  "force_vertexonly",
  "disc_compute",
  "firstlevel",
  "lastlevel",
  "nlevel",
  "screen_initval",
  "screen_initscale",
  "iterations",
  "oldval",
  "getForceVertexOnly",
  "getDiscCompute",
  "getNLevel",
  "frameSrc",
  "frameDest",
  "swap",
  "setSource",
  "setDestination",
  "getSource",
  "getDestination",
  "getExtension",
  "OES_float_linear",
  "OES_half_float_linear",
  "useFloatTextures",
  "config",
  "xfm_cached_px",
  "progPerPixMap",
  "xfm_prog",
  "xfm_cached_vx",
  "lastRes",
  "cachedVertices",
  "texLevels",
  "fbo",
  "getConfig",
  "getI",
  "setTextureUniformLocs",
  "tex",
  "texscalei",
  "setProgramParams",
  "uniform1i",
  "uniform1f",
  "errorExit",
  "Fatal\x20error>\x20",
  "framebuffer\x20setup\x20failed",
  "bad_framebuffer",
  "FRAMEBUFFER_COMPLETE",
  "gl.framebufferTexture2D",
  "framebuffer\x20is\x20actually\x20OK\x20(?!)",
  "FRAMEBUFFER_UNSUPPORTED",
  "combination\x20of\x20formats\x20is\x20UNSUPPORTED\x20by\x20your\x20card",
  "FRAMEBUFFER_INCOMPLETE_ATTACHMENT",
  "FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT",
  "FRAMEBUFFER_INCOMPLETE_DIMENSIONS",
  "FRAMEBUFFER\x20\x20logic\x20error",
  "mapColor",
  "getInversFnsSnippet",
  "/*-------------------\x20w%TAG%\x20-----------------*/",
  "uniform\x20vec4\x20color%TAG%;",
  "vec4\x20g%TAG%(vec2\x20p)\x20{",
  "\x09return\x20exp2(texture(tex,TXfmPL(p))*20.0)-1.0;",
  "getSumFnsSnippet",
  "\x09sum+=color%TAG%*nonlinear_inverse%TAG%(p);",
  "simulate_perpixel_maps",
  "#version\x20300\x20es\x0a",
  "precision\x20highp\x20\x20float;",
  "out\x20vec2\x20destcoords;",
  "in\x20vec4\x20leg_gl_Vertex;",
  "uniform\x20mat4\x20leg_gl_ProjectionMatrix;",
  "uniform\x20mat4\x20leg_gl_ModelViewMatrix;",
  "void\x20main(void)\x20{",
  "\x09destcoords\x20=\x20vec2(leg_gl_Vertex);",
  "\x09gl_Position\x20=\x20leg_gl_ProjectionMatrix\x20*\x20leg_gl_ModelViewMatrix\x20*\x20leg_gl_Vertex;",
  "in\x20vec2\x20destcoords;",
  "uniform\x20sampler2D\x20tex;",
  "out\x20vec4\x20glColor;",
  "%INV_FUNCS%",
  "vec4\x20sum_inverses(vec2\x20p)\x20{",
  "\x09vec4\x20sum=vec4(0.0);",
  "%SUM_FUNCS%",
  "\x09return\x20log2(sum+1.0)*(1.0/20.0);",
  "\x09glColor\x20=\x20sum_inverses(PLfmTX(destcoords));",
  "uniformLocs",
  "color",
  "useProgram",
  "uniform4fv",
  "TXfmPL",
  "useSeedShader",
  "seedShader",
  "#version\x20300\x20es\x0a\x09\x09\x09\x09\x20\x20precision\x20highp\x20float;\x20\x09\x09\x09\x09\x20\x20in\x20vec4\x20a_Vertex;\x20\x09\x09\x09\x09\x20\x20uniform\x20vec4\x20u_color;\x20\x09\x09\x09\x09\x20\x20out\x20vec4\x20v_color;\x20\x09\x09\x09\x09\x20\x20uniform\x20mat4\x20mvp_matrix;\x20\x09\x09\x09\x09\x20\x20void\x20main()\x20{\x20\x09\x09\x09\x09\x09\x09gl_Position\x20=\x20mvp_matrix\x20*\x20a_Vertex;\x20\x09\x09\x09\x09\x09\x09v_color\x20=\x20u_color;\x20\x09\x09\x09\x09\x20\x20}",
  "#version\x20300\x20es\x0a\x09\x09\x09\x09\x20\x20precision\x20highp\x20float;\x20\x09\x09\x09\x09\x20\x20in\x20vec4\x20v_color;\x20\x09\x09\x09\x09\x20\x20out\x20vec4\x20glColor;\x20\x09\x09\x09\x09\x20\x20void\x20main()\x20{\x20\x09\x09\x09\x09\x09\x20\x20glColor\x20=\x20v_color;\x20\x09\x09\x09\x09\x20\x20}",
  "a_Vertex",
  "ucolorloc",
  "u_color",
  "upointsizeloc",
  "u_pointsize",
  "mvpmatrixloc",
  "mvp_matrix",
  "drawSeedTexture",
  "clearColor",
  "clear",
  "COLOR_BUFFER_BIT",
  "uniform4f",
  "stextureloc",
  "addVertex",
  "draw_pervertex_map",
  "simulate_pervertex_map",
  "precision\x20highp\x20float;",
  "\x20%VAR_CODE%",
  "vec2\x20applyMap(vec2\x20t)\x20{",
  "\x09return\x20TXfmPL(applyMap%ID%(PLfmTX(t)));",
  "out\x20vec4\x20color;",
  "out\x20vec2\x20texcoords;",
  "in\x20vec4\x20leg_gl_Color;",
  "\x09texcoords=vec2(leg_gl_Vertex);",
  "\x09vec2\x20onscreen=applyMap(texcoords);",
  "\x09color=getDensity(texcoords)*leg_gl_Color;",
  "\x09gl_Position\x20=\x20leg_gl_ProjectionMatrix\x20*\x20leg_gl_ModelViewMatrix\x20*\x20vec4(onscreen,0,1);",
  "in\x20vec4\x20color;",
  "in\x20vec2\x20texcoords;",
  "\x09glColor\x20=\x20color*texture(tex,texcoords);",
  "%VAR_CODE%",
  "%ID%",
  "drawInverseFuncs",
  "disable",
  "BLEND",
  "enable",
  "setFramebufTextureAttachment",
  "framebufferTexture2D",
  "FRAMEBUFFER",
  "COLOR_ATTACHMENT0",
  "TEXTURE_2D",
  "checkFramebufferStatus",
  "DEPTH_TEST",
  "drawMapLevel",
  "viewport",
  "scissor",
  "bindTexture",
  "generateMipmap",
  "getTextureLevels",
  "create2DArray",
  "createTexture",
  "UNSIGNED_BYTE",
  "texImage2D",
  "RGBA",
  "EXT_texture_filter_anisotropic",
  "MOZ_EXT_texture_filter_anisotropic",
  "WEBKIT_EXT_texture_filter_anisotropic",
  "texParameterf",
  "TEXTURE_MAX_ANISOTROPY_EXT",
  "texParameteri",
  "TEXTURE_MIN_FILTER",
  "LINEAR_MIPMAP_LINEAR",
  "TEXTURE_MAG_FILTER",
  "LINEAR",
  "getFrameBuffer",
  "createFramebuffer",
  "setupLegacyShaderProg",
  "ignite",
  "bindFramebuffer",
  "blendFunc",
  "ONE",
  "CULL_FACE",
  "sizeX",
  "sizeY",
  "flameConfigs",
  "furnance",
  "currentConfigId",
  "currentConfig",
  "ctxSpectrum",
  "spectrumWidth",
  "spectrumHeight",
  "lastTime",
  "currentAnimStart",
  "drawSpectrum",
  "round",
  "clearRect",
  "#A0A0A0",
  "init",
  "initGl",
  "canvas2",
  "opengl",
  "isMusicReady",
  "someCanvas",
  "depth",
  "webgl2",
  "Your\x20browser\x20does\x20not\x20support\x20WebGL2",
  "exec",
  ".pngImg",
  "css",
  "background-image",
  "val",
  "ato",
  "getNextConfig",
  "render",
  "drawScene",
  "requestAnimFrame",
  "getPostprocessShader",
  "postprocessProg",
  "out\x20vec3\x20worldCoords;",
  "\x09worldCoords\x20=\x20vec3(leg_gl_Vertex\x20);",
  "\x09gl_Position\x20=\x20leg_gl_Vertex;",
  "float\x20ab(float\x20x)\x20{\x20return\x20x/sqrt(1.0+x*x)*0.5+0.5;\x20}",
  "vec2\x20ab(vec2\x20p)\x20{\x20return\x20vec2(ab(p.x),ab(p.y));\x20}",
  "in\x20vec3\x20worldCoords;",
  "out\x20vec4\x20fragColor;",
  "uniform\x20sampler2D\x20uTexture;",
  "uniform\x20float\x20uColormode;",
  "uniform\x20vec2\x20uScale;",
  "uniform\x20vec2\x20uMove;",
  "uniform\x20float\x20uFade;",
  "uniform\x20float\x20uDither[64];",
  "uniform\x20float\x20uMix;",
  "float\x20Scale\x20=\x201.0;",
  "float\x20find_closest(int\x20x,\x20int\x20y,\x20float\x20c0)\x20{",
  "float\x20limit\x20=\x200.0;",
  "if(x\x20<\x208)\x20{",
  "int\x20index\x20=\x20x\x20+\x20y*8;",
  "limit\x20=\x20(uDither[index]+1.0)/64.0;",
  "if(c0\x20<\x20limit)",
  "\x09return\x200.0;",
  "vec2\x20uv=ab(vec2(uScale.x*(worldCoords.x+uMove.x)\x20,uScale.y*((worldCoords.y+uMove.y))));",
  "vec3\x20rgb\x20=\x20texture(uTexture,\x20uv).rgb;",
  "rgb=\x20(rgb*uColormode\x20+\x20(1.0-rgb)*(1.0-uColormode))*uFade;",
  "vec3\x20c;",
  "if\x20(uMix\x20>\x200.0)\x20{",
  "vec2\x20xy\x20=\x20gl_FragCoord.xy\x20*\x20Scale;",
  "int\x20x\x20=\x20int(mod(xy.x,\x208.0));",
  "int\x20y\x20=\x20int(mod(xy.y,\x208.0));",
  "c.r\x20=\x20find_closest(x,\x20y,\x20rgb.r);",
  "c.g\x20=\x20find_closest(x,\x20y,\x20rgb.g);",
  "c.b\x20=\x20find_closest(x,\x20y,\x20rgb.b);",
  "c=\x20mix(c,\x20rgb,\x20uMix);",
  "c=\x20rgb;",
  "fragColor\x20=\x20vec4(c,\x201.0);",
  "uScale",
  "uMove",
  "uColormode",
  "uFade",
  "uTexture",
  "uDither",
  "uMix",
  "DEPTH_BUFFER_BIT",
  "activeTexture",
  "TEXTURE0",
  "uniform2f",
  "uniform1fv",
  "AudioContext",
  "webkitAudioContext",
  "You\x20need\x20a\x20recent\x20browser\x20with\x20HTML5\x20WebAudio\x20support.",
  "requestAnimationFrame",
  "webkitRequestAnimationFrame",
  "mozRequestAnimationFrame",
  "oRequestAnimationFrame",
  "msRequestAnimationFrame",
  "setTimeout",
  "analyzers",
  "cloudPlayer",
  "demo",
  "hashchange",
];
var b = function (c, d) {
  c = c - 0;
  var e = a[c];
  return e;
};
var BeatDetector1 = function (o) {
  this[`_cooldown`] = 0;
  this[`_lastBeat`] = 0;
  this[`_subbands`] = o;
  this[`_energyHistSize`] = 43;
  this[`_energyHist`] = [];
  this[`_currentBeats`];
};
var c = {};
c[`getReferenceEnergy`] = function () {
  var o, p;
  var q = [];
  for (o = 0; o < this[`_subbands`]; o++) {
    q[o] = 0;
  }
  for (p = 0; p < this[`_energyHist`][`length`]; p++) {
    var r = this[`_energyHist`][p];
    for (o = 0; o < this[`_subbands`]; o++) {
      var t = r[`bandEnergy`][o];
      q[o] += t;
    }
  }
  for (o = 0; o < this[`_subbands`]; o++) {
    q[o] /= this[`_energyHist`][`length`];
  }
  return q;
};
c[`getStdDeviation`] = function (o) {
  var p, q;
  var r = [];
  for (p = 0; p < this[`_subbands`]; p++) {
    r[p] = 0;
  }
  for (q = 0; q < this[`_energyHist`][`length`]; q++) {
    var t = this[`_energyHist`][q];
    for (p = 0; p < this[`_subbands`]; p++) {
      var u = t[`bandEnergy`][p] - o[p];
      r[p] += u * u;
    }
  }
  for (p = 0; p < this[`_subbands`]; p++) {
    r[p] = Math[`sqrt`](r[p] / this[`_energyHist`][`length`]);
  }
  return r;
};
c[`getThresholdFactor`] = function (o) {
  var p = Math[`max`](1, -0.000017545 * o + 1.51);
  return p;
};
c[`detectBeats`] = function (o) {
  var p = [];
  if (
    o[`bandEnergy`] &&
    this[`_energyHist`][`length`] == this[`_energyHistSize`]
  ) {
    var q = this[`getReferenceEnergy`]();
    var r = new Date()[`getTime`]();
    var u = this[`_lastBeat`] + this[`_cooldown`] <= r;
    var v;
    for (v = 0; v < this[`_subbands`]; v++) {
      var w = 1.1 * Math[`sqrt`](q[v]);
      var y = o[`bandEnergy`][v];
      p[v] = u && Math[`sqrt`](y) > w ? Math[`sqrt`](y) : 0;
    }
    if (u) {
      this[`_lastBeat`] = r;
    }
  }
  return p;
};
c[`getCurrentEnergy`] = function (o) {
  var p = [];
  var q = Math[`floor`](o[`length`] / this[`_subbands`]);
  var r, t;
  for (r = 0; r < this[`_subbands`]; r++) {
    var u = 0;
    for (t = 0; t < q; t++) {
      var v = o[r * q + t];
      u += v * v;
    }
    u /= q;
    p[`push`](u);
  }
  var w = {};
  w[`bandEnergy`] = p;
  return w;
};
c[`updateHistory`] = function (o) {
  if (this[`_energyHist`][`length`] == this[`_energyHistSize`]) {
    this[`_energyHist`][`shift`]();
  }
  this[`_energyHist`][`push`](o);
};
c[`updateBeats`] = function (o) {
  var p = this[`getCurrentEnergy`](o);
  this[`_currentBandBeats`] = this[`detectBeats`](p);
  this[`updateHistory`](p);
};
c[`getBeats`] = function () {
  return this[`_currentBandBeats`] ? this[`_currentBandBeats`] : [];
};
BeatDetector1[`prototype`] = c;
var DummyAnalyzer = function (o) {
  this[`frequencyBinCount`] = o[`length`];
  this[`array`] = o;
};
var d = {};
d[`getByteFrequencyData`] = function (o) {
  var p;
  for (p = 0; p < this[`frequencyBinCount`]; p++) {
    o[p] = Math[`floor`](this[`array`][p]);
  }
};
DummyAnalyzer[`prototype`] = d;
var UCHAR_MAX = 255;
var Uint8Spectrum = function () {};
var e = {};
e[`getSpectrum`] = function (o, p) {
  var q = new Uint8Array(o[`frequencyBinCount`]);
  o[`getByteFrequencyData`](q);
  return q;
};
e[`usesAnalyzer`] = function () {
  return !false;
};
Uint8Spectrum[`prototype`] = e;
var Float32Spectrum = function () {};
var f = {};
f[`getSpectrum`] = function (o, p) {
  var q =
    o[`maxDecibels`] == o[`minDecibels`]
      ? 1
      : 1 / (o[`maxDecibels`] - o[`minDecibels`]);
  var r = new Float32Array(o[`frequencyBinCount`]);
  o[`getFloatFrequencyData`](r);
  var t;
  for (t = 0; t < o[`frequencyBinCount`]; t++) {
    r[t] = UCHAR_MAX * (r[t] - o[`minDecibels`]) * q;
  }
  return r;
};
f[`usesAnalyzer`] = function () {
  return !false;
};
Float32Spectrum[`prototype`] = f;
var BlackmanWindow = function () {
  this[`PI2`] = Math["PI"] * 2;
  this[`alpha`] = 0.16;
  this["a0"] = 0.5 * (1 - this[`alpha`]);
  this["a1"] = 0.5;
  this["a2"] = 0.5 * this[`alpha`];
};
var g = {};
g[`apply`] = function (o) {
  var q,
    r = o[`length`];
  for (q = 0; q < r; ++q) {
    var t = q / r;
    var u =
      this["a0"] -
      this["a1"] * Math[`cos`](this[`PI2`] * t) +
      this["a2"] * Math[`cos`](this[`PI2`] * 2 * t);
    o[q] *= u;
  }
};
BlackmanWindow[`prototype`] = g;
var BlackmanHarrisWindow = function () {
  this[`PI2`] = Math["PI"] * 2;
  this["a0"] = 0.35875;
  this["a1"] = 0.48829;
  this["a2"] = 0.14128;
  this["a3"] = 0.01168;
};
var h = {};
h[`apply`] = function (o) {
  var q,
    r = o[`length`];
  for (q = 0; q < r; ++q) {
    var t = q / r;
    var u =
      this["a0"] -
      this["a1"] * Math[`cos`](this[`PI2`] * t) +
      this["a2"] * Math[`cos`](this[`PI2`] * 2 * t) -
      this["a3"] * Math[`cos`](this[`PI2`] * 4 * t);
    o[q] *= u;
  }
};
BlackmanHarrisWindow[`prototype`] = h;
var FFTSpectrum = function (o, p) {
  this[`fft`];
  this[`window`] = new BlackmanHarrisWindow();
  this[`minDeci`] = o;
  this[`maxDeci`] = p;
};
var i = {};
i[`getSpectrum`] = function (o, p) {
  var q = p[`sampleRate`];
  var r = p[`getChannelData`](0);
  return this[`immitateWebkitFFT`](q, r, this[`minDeci`], this[`maxDeci`]);
};
i[`immitateWebkitFFT`] = function (o, p, q, r) {
  var t = r == q ? 1 : 1 / (r - q);
  this[`window`][`apply`](p);
  if (!this[`fft`]) this[`fft`] = new FFT(p[`length`], o);
  var u = this[`fft`][`forward`](p);
  var v;
  for (v = 0; v < u[`length`]; v++) {
    var w = Math[`abs`](u[v]);
    var y = w == 0 ? q : this[`linearToDecibels`](w);
    var z = UCHAR_MAX * (y - q) * t;
    z = Math[`min`](UCHAR_MAX, Math[`max`](0, z));
    u[v] = z;
  }
  return u;
};
i[`linearToDecibels`] = function (o) {
  if (o == 0) return -1000;
  return (20 * Math[`log`](o)) / Math[`LN10`];
};
i[`usesAnalyzer`] = function () {
  return false;
};
FFTSpectrum[`prototype`] = i;
var PoorMansBeatDetection = function (o) {
  this[`detector`] = new BeatDetector1(o);
  this[`spectrum`];
  this[`lastSpectrum`];
  this[`showSpectrum`] = false;
  this[`scriptProcessor`];
};
var j = {};
j[`getBeatAnalyzerNode`] = function (o, p) {
  this[`spectrum`] = new FFTSpectrum(p[`minDecibels`], p[`maxDecibels`]);
  if (this[`spectrum`][`usesAnalyzer`]()) {
    p[`smoothingTimeConstant`] = 0;
    o[`connect`](p);
  }
  var q = 1024;
  this[`scriptProcessor`] = audioCtx[`createScriptProcessor`](q, 1, 1);
  this[`scriptProcessor`][`onaudioprocess`] = function (r) {
    var t = this[`spectrum`][`getSpectrum`](p, r[`inputBuffer`]);
    this[`detector`][`updateBeats`](t);
    if (this[`showSpectrum`]) {
      if (!this[`lastSpectrum`]) this[`lastSpectrum`] = new Uint8Array(q / 2);
      var u;
      for (u = 0; u < t[`length`]; u++) {
        this[`lastSpectrum`][u] = t[u];
      }
    }
  }[`bind`](this);
  return this[`scriptProcessor`];
};
j[`getBeats`] = function () {
  return this[`detector`][`getBeats`]();
};
j[`getBeatAnalyzer`] = function () {
  return new DummyAnalyzer(this[`getBeats`]());
};
j[`getBeatAnalyzerSpectrum`] = function () {
  this[`showSpectrum`] = !false;
  return new DummyAnalyzer(this[`lastSpectrum`] ? this[`lastSpectrum`] : []);
};
PoorMansBeatDetection[`prototype`] = j;
var beatDetection = new PoorMansBeatDetection(16);
var scripts = document[`getElementsByTagName`](`script`);
var path = scripts[scripts[`length`] - 1][`src`][`split`]("?")[0];
var mydir = path[`split`]("/")[`slice`](0, -1)[`join`]("/") + "/";
var scURLprefix = mydir + `proxy.php?`;
WaveformDisplay = function () {
  this[`waveImg`] = 0;
};
var k = {};
k[`updateImage`] = function (o) {
  this[`waveImg`] = 0;
  var p = new Image();
  p[`onload`] = function () {
    this[`waveImg`] = p;
  }[`bind`](this);
  p[`src`] = o;
};
k[`drawWaveform`] = function (o, p) {
  p = Math[`min`](isNaN(p) ? 0 : p, 1);
  o = Math[`min`](isNaN(o) ? 0 : o, 1);
  if (o < 1) p = 0;
  var q = 500;
  var r = 50;
  var t = q * p;
  var u = r * 0.7;
  var v = document[`getElementById`](`waveformCanvas`)[`getContext`]("2d");
  v[`save`]();
  var y = `#333333`;
  var z = `#232323`;
  var A = `#999999`;
  var B = `#b9b9b9`;
  var C = `#ff5200`;
  var D = `#ff3400`;
  var E = `#ffd5c0`;
  var F = `#ffaa80`;
  v[`globalAlpha`] = 0.5;
  if (o == 1) {
    var G = v[`createLinearGradient`](0, 0, 0, r);
    G[`addColorStop`](0, C);
    G[`addColorStop`](u / r, D);
    G[`addColorStop`](u / r, E);
    G[`addColorStop`](1, F);
    v[`fillStyle`] = G;
    v[`fillRect`](0, 0, t, r);
  }
  var H = v[`createLinearGradient`](0, 0, 0, r);
  H[`addColorStop`](0, y);
  H[`addColorStop`](u / r, z);
  H[`addColorStop`](u / r, A);
  H[`addColorStop`](1, B);
  v[`fillStyle`] = H;
  if (o == 1) {
    v[`fillRect`](t, 0, q - t, r);
  } else {
    v[`fillRect`](0, 0, q * o, r);
  }
  v[`globalAlpha`] = 0.2;
  var I;
  var J = 3;
  v[`lineWidth`] = 1;
  v[`strokeStyle`] = `rgba(255,255,255,0.3)`;
  for (I = 0; I < q / J; I++) {
    v[`beginPath`]();
    v[`moveTo`](I * J, 0);
    v[`lineTo`](I * J, r);
    v[`stroke`]();
  }
  v[`globalCompositeOperation`] = `destination-out`;
  v[`globalAlpha`] = 0.6;
  if (this[`waveImg`]) {
    var K = this[`waveImg`][`width`];
    var L = this[`waveImg`][`height`];
    v[`drawImage`](this[`waveImg`], 0, 0, K * o, L, 0, 0, q * o, r);
  }
  v[`restore`]();
  v[`restore`]();
};
WaveformDisplay[`prototype`] = k;
var waveformDisplay = new WaveformDisplay();
Analyzers = function () {
  var o = audioCtx[`createBiquadFilter`]();
  this[`LOWPASS`] = `LOWPASS` in o ? o[`LOWPASS`] : `lowpass`;
  this[`HIGHPASS`] = `HIGHPASS` in o ? o[`HIGHPASS`] : `highpass`;
  this[`BANDPASS`] = `BANDPASS` in o ? o[`BANDPASS`] : `bandpass`;
  this[`LOWSHELF`] = `LOWSHELF` in o ? o[`LOWSHELF`] : `lowshelf`;
  this[`PEAKING`] = `PEAKING` in o ? o[`PEAKING`] : `peaking`;
  this[`HIGHSHELF`] = `HIGHSHELF` in o ? o[`HIGHSHELF`] : `highshelf`;
  this[`NOTCH`] = `NOTCH` in o ? o[`NOTCH`] : `notch`;
  this[`ALLPASS`] = `ALLPASS` in o ? o[`ALLPASS`] : `allpass`;
  this[`NO_FILTER`] = -1;
  this[`analyzerCfg`];
  this[`once`] = false;
};
var l = {};
l[`getAnalyzer`] = function (o) {
  if (this[`analyzerCfg`]) {
    if (this[`analyzerCfg`][`length`] > o) {
      return this[`analyzerCfg`][o][5];
    }
  }
  return null;
};
l[`getHiHatAnalyzer`] = function () {
  return this[`getAnalyzer`](0);
};
l[`getBandAnalyzer`] = function () {
  return this[`getAnalyzer`](1);
};
l[`getVolAnalyzer`] = function () {
  return this[`getAnalyzer`](2);
};
l[`setupBeatAnalyzer`] = function (o, p) {
  var q = beatDetection[`getBeatAnalyzerNode`](p, o);
  q[`connect`](audioCtx[`destination`]);
  p[`connect`](q);
};
l[`getBeats`] = function () {
  return beatDetection[`getBeats`]();
};
l[`setupWebAudioNodes`] = function (o) {
  if (!this[`once`] && this[`analyzerCfg`]) {
    this[`once`] = !false;
    var q = audioCtx[`createMediaElementSource`](o);
    q[`connect`](audioCtx[`destination`]);
    var r = audioCtx[`createAnalyser`]();
    r[`fftSize`] = 1024;
    this[`setupBeatAnalyzer`](r, q);
    var t;
    for (t = 0; t < this[`analyzerCfg`][`length`]; t++) {
      var u = this[`analyzerCfg`][t];
      r = audioCtx[`createAnalyser`]();
      u[5] = r;
      r[`fftSize`] = u[0];
      if (u[1] == this[`NO_FILTER`]) {
        q[`connect`](r);
      } else {
        var v = audioCtx[`createBiquadFilter`]();
        v[`type`] = u[1];
        v[`frequency`][`value`] = u[2];
        v["Q"][`value`] = u[3];
        v[`gain`][`value`] = u[4];
        q[`connect`](v);
        v[`connect`](r);
      }
    }
  }
};
l[`setConfig`] = function (o) {
  if (o) this[`analyzerCfg`] = o;
};
Analyzers[`prototype`] = l;
CloudPlayer = function () {
  this[`currentSong`];
  this[`playlist`];
  this[`player`];
  this[`running`] = false;
};
var m = {};
m[`setupPlaylist`] = function (o, p) {
  if (o[`indexOf`](`/sets/`) == -1) {
    p = {
      tracks: [p],
    };
  }
  this[`playlist`] = p;
};
m[`setNextSong`] = function () {
  this[`currentSong`] =
    (this[`currentSong`] !== undefined ? this[`currentSong`] + 1 : 0) %
    this[`playlist`][`tracks`][`length`];
  var o = this[`playlist`][`tracks`][this[`currentSong`]];
  var p = o[`permalink_url`][`replace`](`http://soundcloud.com`, "");
  p = p[`replace`](`https://soundcloud.com`, "");
  $(`#sound-title`)[`html`](
    `<a target=\"_blank\" href=\"https://www.soundcloud.com` +
      p +
      "\x22>" +
      o[`title`] +
      `</a>`
  );
  waveformDisplay[`updateImage`](o[`waveform_url`]);
  waveformDisplay[`drawWaveform`](1, 0);
  return scURLprefix + p;
};
m[`initMusic`] = function (o) {
  this[`startPlayCallback`] = o;
  var p = [
    [32, analyzers[`HIGHPASS`], 19000, 0, -40, null],
    [32, analyzers[`BANDPASS`], 9900, 100, 0, null],
    [32, analyzers[`LOWPASS`], 5000, 0, -40, null],
  ];
  this[`startMusic`](p);
};
m[`startMusic`] = function (o) {
  this[`currentSong`] = undefined;
  analyzers[`setConfig`](o);
  var p = document[`location`][`hash`][`substring`](1);
  if (!p[`length`]) {
    p = `/fractalflames/sets/ablaze`;
    document[`location`][`hash`] = "#" + p;
  }
  var q = document[`getElementById`](`player`);
  q[`autoplay`] = !false;
  $(`#isloading`)
    [`empty`]()
    [`append`](
      `<div class=\"loading\"><img src=\"/ablaze/images/loading.gif\"></div>`
    );
  var r = scURLprefix + p + `.json`;
  var t = `http:`,
    v = `https:`;
  if (t == location[`protocol`]) {
    t = v;
    v = location[`protocol`];
  }
  r[`replace`](t, v);
  $[`getJSON`](
    r,
    function (w) {
      this[`setupPlaylist`](p, w);
      q[`setAttribute`](`src`, this[`setNextSong`]() + `/audio`);
      q[`addEventListener`](
        `stalled`,
        function () {
          $(`#isloading`)[`empty`]()[`append`]("\x20");
          q[`play`]();
        }[`bind`](this)
      );
      q[`addEventListener`](`emptied`, function () {}[`bind`](this));
      q[`addEventListener`](`suspend`, function () {}[`bind`](this));
      q[`addEventListener`](
        `playing`,
        function () {
          $(`#isloading`)[`empty`]()[`append`]("\x20");
          this[`startPlayCallback`]();
        }[`bind`](this)
      );
      q[`addEventListener`](
        `canplay`,
        function () {
          analyzers[`setupWebAudioNodes`](q);
          this[`startProgress`](q);
          q[`play`]();
        }[`bind`](this)
      );
      q[`addEventListener`](
        `ended`,
        function () {
          var y = this[`setNextSong`]() + `/audio`;
          $(`#mp3Source`)[`attr`](`src`, y)[`detach`]()[`appendTo`](`#player`);
          q[`setAttribute`](`src`, y);
          q[`load`]();
        }[`bind`](this)
      );
      q[`load`]();
    }[`bind`](this)
  )[`fail`](function () {
    alert(`Sorry but there is no music with perma link: ` + p);
    $(`#isloading`)[`empty`]()[`append`]("");
  });
};
m[`startProgress`] = function (o) {
  this[`player`] = o;
  this[`running`] = !false;
  this[`updateProgress`]();
};
m[`stopProgress`] = function () {
  this[`running`] = false;
};
m[`getCurrentPlayTime`] = function () {
  return this[`player`][`currentTime`]
    ? this[`player`][`currentTime`] * 1000
    : 0;
};
m[`updateProgress`] = function () {
  if (!this[`running`]) {
    return;
  }
  var o = this[`getCurrentPlayTime`]();
  var p = this[`player`][`duration`] * 1000;
  var q = o / p;
  if (o < p) {
    waveformDisplay[`drawWaveform`](1, q);
  }
  requestAnimFrame(
    function () {
      this[`updateProgress`]();
    }[`bind`](this)
  );
};
CloudPlayer[`prototype`] = m;
OpenGL = function () {
  this[`U_PROJECTION`] = 0;
  this[`U_MODELVIEW`] = 1;
  this[`U_TEXTURE`] = 2;
  this[`U_VERTEX_ARRAY`] = 0;
  this[`U_TEXTURE_COORD_ARRAY`] = 1;
  this[`U_COLOR_ARRAY`] = 2;
  this[`mvMatrix`] = new Float32Array([
    1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1,
  ]);
  this[`prMatrix`] = new Float32Array([
    1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1,
  ]);
  this[`mvpMatrix`] = new Float32Array([
    1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1,
  ]);
  this[`txMatrix`] = new Float32Array([
    1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1,
  ]);
  this[`activeMatrix`] = this[`prMatrix`];
  this[`mvStack`] = [];
  this[`prStack`] = [];
  this[`txStack`] = [];
  this[`activeStack`] = this[`prStack`];
};
var n = {};
n[`makeProgramObject`] = function (o, p) {
  var q = this[`loadShader`](gl[`VERTEX_SHADER`], o);
  var r = this[`loadShader`](gl[`FRAGMENT_SHADER`], p);
  var t = gl[`createProgram`]();
  gl[`attachShader`](t, q);
  gl[`attachShader`](t, r);
  gl[`deleteShader`](q);
  gl[`deleteShader`](r);
  gl[`linkProgram`](t);
  if (!gl[`getProgramParameter`](t, gl[`LINK_STATUS`])) {
    console[`error`](
      `An error occurred compiling the shaders: ` + gl[`getProgramInfoLog`](t)
    );
    throw Error(`Unable to initialize the shader program.`);
  }
  this[`setLegacyAttribLocation`](t);
  return t;
};
n[`draw_texture`] = function (o, p, q, r) {
  var t = vec3[`transformMat4`](
    vec3[`create`](),
    vec3[`fromValues`](q[0], q[1], q[2]),
    p
  );
  var u = vec3[`transformMat4`](
    vec3[`create`](),
    vec3[`fromValues`](r[0], q[1], q[2]),
    p
  );
  var v = vec3[`transformMat4`](
    vec3[`create`](),
    vec3[`fromValues`](r[0], r[1], q[2]),
    p
  );
  var w = vec3[`transformMat4`](
    vec3[`create`](),
    vec3[`fromValues`](q[0], r[1], q[2]),
    p
  );
  var y = new Float32Array([
    t[0],
    t[1],
    t[2],
    w[0],
    w[1],
    w[2],
    u[0],
    u[1],
    u[2],
    v[0],
    v[1],
    v[2],
  ]);
  var z = gl[`createBuffer`]();
  gl[`bindBuffer`](gl[`ARRAY_BUFFER`], z);
  gl[`bufferData`](gl[`ARRAY_BUFFER`], y, gl[`STATIC_DRAW`]);
  z[`itemSize`] = 3;
  z[`numItems`] = y[`length`] / 3;
  gl[`enableVertexAttribArray`](o[`leg_gl_Vertex`]);
  gl[`vertexAttribPointer`](
    o[`leg_gl_Vertex`],
    z[`itemSize`],
    gl[`FLOAT`],
    false,
    0,
    0
  );
  gl[`drawArrays`](gl[`TRIANGLE_STRIP`], 0, z[`numItems`]);
};
n[`loadShader`] = function (o, p) {
  var q = gl[`createShader`](o);
  gl[`shaderSource`](q, p);
  gl[`compileShader`](q);
  if (!gl[`getShaderParameter`](q, gl[`COMPILE_STATUS`])) {
    console[`error`](
      `An error occurred compiling the shaders: ` + gl[`getShaderInfoLog`](q)
    );
    throw Error(
      `An error occurred compiling the shaders: ` + gl[`getShaderInfoLog`](q)
    );
  }
  return q;
};
n[`uMatrixMode`] = function (o) {
  if (o == this[`U_PROJECTION`]) {
    this[`activeMatrix`] = this[`prMatrix`];
    this[`activeStack`] = this[`prStack`];
  } else if (o == this[`U_MODELVIEW`]) {
    this[`activeMatrix`] = this[`mvMatrix`];
    this[`activeStack`] = this[`mvStack`];
  } else if (o == this[`U_TEXTURE`]) {
    this[`activeMatrix`] = this[`txMatrix`];
    this[`activeStack`] = this[`txStack`];
  }
};
n[`uLoadIdentity`] = function () {
  this[`activeMatrix`][0] = 1;
  this[`activeMatrix`][1] = 0;
  this[`activeMatrix`][2] = 0;
  this[`activeMatrix`][3] = 0;
  this[`activeMatrix`][4] = 0;
  this[`activeMatrix`][5] = 1;
  this[`activeMatrix`][6] = 0;
  this[`activeMatrix`][7] = 0;
  this[`activeMatrix`][8] = 0;
  this[`activeMatrix`][9] = 0;
  this[`activeMatrix`][10] = 1;
  this[`activeMatrix`][11] = 0;
  this[`activeMatrix`][12] = 0;
  this[`activeMatrix`][13] = 0;
  this[`activeMatrix`][14] = 0;
  this[`activeMatrix`][15] = 1;
};
n[`multiply`] = function (o, p, q) {
  var r = new Float32Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  for (var t = 0; t < 4; t++) {
    var u = 4 * t;
    var v = u + 1;
    var w = u + 2;
    var y = u + 3;
    r[u] = p[u] * q[0] + p[v] * q[4] + p[w] * q[8] + p[y] * q[12];
    r[v] = p[u] * q[1] + p[v] * q[5] + p[w] * q[9] + p[y] * q[13];
    r[w] = p[u] * q[2] + p[v] * q[6] + p[w] * q[10] + p[y] * q[14];
    r[y] = p[u] * q[3] + p[v] * q[7] + p[w] * q[11] + p[y] * q[15];
  }
  for (var t = 0; t < 16; t++) o[t] = r[t];
};
n[`uTranslatef`] = function (o, p, q) {
  var r = this[`activeMatrix`];
  r[12] += r[0] * o + r[4] * p + r[8] * q;
  r[13] += r[1] * o + r[5] * p + r[9] * q;
  r[14] += r[2] * o + r[6] * p + r[10] * q;
  r[15] += r[3] * o + r[7] * p + r[11] * q;
};
n[`uScalef`] = function (o, p, q) {
  this[`activeMatrix`][0] *= o;
  this[`activeMatrix`][1] *= o;
  this[`activeMatrix`][2] *= o;
  this[`activeMatrix`][3] *= o;
  this[`activeMatrix`][4] *= p;
  this[`activeMatrix`][5] *= p;
  this[`activeMatrix`][6] *= p;
  this[`activeMatrix`][7] *= p;
  this[`activeMatrix`][8] *= q;
  this[`activeMatrix`][9] *= q;
  this[`activeMatrix`][10] *= q;
  this[`activeMatrix`][11] *= q;
};
n[`uPushMatrix`] = function () {
  var o = new Float32Array(16);
  for (var p = 0; p < 16; p++) o[p] = this[`activeMatrix`][p];
  this[`activeStack`][`push`](o);
};
n[`uPopMatrix`] = function () {
  var o = this[`activeStack`][`pop`]();
  for (var p = 0; p < 16; p++) this[`activeMatrix`][p] = o[p];
};
n[`setLegacyAttribLocation`] = function (o) {
  o[`leg_gl_Vertex`] = gl[`getAttribLocation`](o, `leg_gl_Vertex`);
  o[`leg_gl_ProjectionMatrix`] = gl[`getUniformLocation`](
    o,
    `leg_gl_ProjectionMatrix`
  );
  o[`leg_gl_ModelViewMatrix`] = gl[`getUniformLocation`](
    o,
    `leg_gl_ModelViewMatrix`
  );
  o[`leg_gl_Color`] = gl[`getUniformLocation`](o, `leg_gl_Color`);
};
n[`setLegacyFixedPipelineParams`] = function (o) {
  gl[`uniformMatrix4fv`](o[`leg_gl_ProjectionMatrix`], false, this[`prMatrix`]);
  gl[`uniformMatrix4fv`](o[`leg_gl_ModelViewMatrix`], false, this[`mvMatrix`]);
};
OpenGL[`prototype`] = n;
function expandString(o, p) {
  return o[`replace`](/%\w+%/g, function (q) {
    return p[q] || q;
  });
}
class Variation {
  constructor(o, p, q) {
    this[`_name`] = o;
    this[`_code`] = p;
    this[`_areaCode`] = q;
  }
  [`getName`]() {
    return this[`_name`];
  }
  [`getCode`]() {
    return this[`_code`];
  }
  [`hasInverse`]() {
    return false;
  }
  [`getInverseCode`]() {
    return "";
  }
  [`getAreaCode`]() {
    return this[`_areaCode`];
  }
}
class VariationInverse extends Variation {
  constructor(o, p, q, r) {
    super(o, p, r);
    this[`_inversecode`] = q;
  }
  [`hasInverse`]() {
    return !false;
  }
  [`getInverseCode`]() {
    return this[`_inversecode`];
  }
}
var variation_list = [
  new VariationInverse(
    `linear`,
    [`p=t;`][`join`]("\x0a"),
    [`return f(p);`][`join`]("\x0a"),
    [`return 1.0;`][`join`]("\x0a")
  ),
  new VariationInverse(
    `sinusoidal`,
    [`p=vec2(sin(t.x),sin(t.y));`][`join`]("\x0a"),
    [
      `if (abs(p.x)>1.0 || abs(p.y)>1.0) return vec4(0.0);`,
      `vec4 sum=vec4(0.0);`,
      `vec2 t=vec2(asin(p.x),asin(p.y));`,
      `const float img=2.0;`,
      `for (float dy=-img;dy<=img;dy++) {`,
      `	for (float dx=-img;dx<=img;dx++) {`,
      `		sum+=f(vec2( t.x+M_PI*2.0*dx,t.y+M_PI*2.0*dy));`,
      `		sum+=f(vec2(-t.x+M_PI*(1.0+2.0*dx),t.y+M_PI*2.0*dy));`,
      `		sum+=f(vec2(-t.x+M_PI*(1.0+2.0*dx),-t.y+M_PI*(1.0+2.0*dy)));`,
      `		sum+=f(vec2( t.x+M_PI*2.0*dx,-t.y+M_PI*(1.0+2.0*dy)));`,
      "\x09}",
      "}",
      `return sum;`,
    ][`join`]("\x0a"),
    [`return cos(t.x)*cos(t.y);`][`join`]("\x0a")
  ),
  new VariationInverse(
    `spherical`,
    [`float r2=dot(t,t) + EPS;`, `p=t/r2;`][`join`]("\x0a"),
    [`float r2=dot(p,p);`, `return f(p/r2);`][`join`]("\x0a"),
    [`float r2=dot(t,t);`, `return 1.0/(r2*r2);`][`join`]("\x0a")
  ),
  new VariationInverse(
    `swirl`,
    [
      `float r2=dot(t,t);`,
      `float s=sin(r2); float c=cos(r2);`,
      `p=vec2(`,
      `	s*t.x-c*t.y,`,
      `	c*t.x+s*t.y`,
      ");",
    ][`join`]("\x0a"),
    [
      `float r2=dot(p,p);`,
      `if (r2>10.0) return vec4(0.0);`,
      `float s=sin(r2); float c=cos(r2);`,
      `return f(vec2(`,
      `	s*p.x+c*p.y,`,
      `	-c*p.x+s*p.y`,
      `));`,
    ][`join`]("\x0a"),
    [`return 1.0;`][`join`]("\x0a")
  ),
  new VariationInverse(
    `horseshoe`,
    [
      `float r=1.0/(length(t)+EPS);`,
      `p=vec2(`,
      `	(t.x-t.y)*(t.x+t.y)*r,`,
      `	2.0*t.x*t.y*r`,
      ");",
    ][`join`]("\x0a"),
    [
      `float r2 = p.x*p.x + p.y*p.y;`,
      `float r=sqrt(r2);`,
      `float aspect = (p.x + r)/p.y;`,
      `float y = sqrt(0.5*(r2 - p.x*r));`,
      `return f(vec2(y*aspect,y))`,
      `	  +f(vec2(-y*aspect,-y));`,
    ][`join`]("\x0a"),
    [`return 2.0;`][`join`]("\x0a")
  ),
  new VariationInverse(
    `polar`,
    [`p=vec2(`, `	atan2(t.x,t.y)*M_1_PI,`, `	length(t)-1.0`, ");"][`join`](
      "\x0a"
    ),
    [
      `if (p.x>=-1.0 && p.x<=1.0 && p.y>-1.0)`,
      `	return f((p.y+1.0)*vec2(sin(p.x*M_PI),cos(p.x*M_PI)));`,
      `else`,
      `	return vec4(0.0);`,
    ][`join`]("\x0a"),
    [`return M_1_PI/length(t);`][`join`]("\x0a")
  ),
  new Variation(
    `handkerchief`,
    [
      `float a=atan2(t.x,t.y);`,
      `float r=length(t);`,
      `p=r*vec2(`,
      `	sin(a+r),`,
      `	cos(a-r)`,
      ");",
    ][`join`]("\x0a"),
    [`float r=length(t);`, `return cos(2.0*r) + 2.0*t.x*t.y/r - r*sin(2.0*r);`][
      `join`
    ]("\x0a")
  ),
  new VariationInverse(
    `heart`,
    [
      `float a=atan2(t.x,t.y);`,
      `float r=length(t);`,
      `p=vec2(`,
      `	r*sin(r*a),`,
      `	(-r)*cos(r*a)`,
      ");",
    ][`join`]("\x0a"),
    [
      `float r=length(p);`,
      `float at2=atan2(p.x,-p.y);`,
      `float pilo=ceil((-M_PI*r-at2)/(2.0*M_PI));`,
      `float pihi=floor((+M_PI*r-at2)/(2.0*M_PI));`,
      `vec4 sum=vec4(0.0);`,
      `float s= floor(pihi-pilo);`,
      `for (float pic=pilo; pic<=pihi; pic++) {`,
      `	if (pic>s) break;`,
      `	float a=(at2+ (pic+pilo) *5.0*M_PI)/r;`,
      `	sum+=f(r*vec2(sin(a),cos(a)));`,
      "}",
      `return sum;`,
    ][`join`]("\x0a"),
    [`return length(t);`][`join`]("\x0a")
  ),
  new Variation(
    `disc`,
    [
      `float a=atan2(t.x,t.y)*M_1_PI;`,
      `float r=length(t)*M_PI;`,
      `p=a*vec2(`,
      `	sin(r),`,
      `	cos(r)`,
      ");",
    ][`join`]("\x0a"),
    [`float a=atan2(t.x,t.y);`, `return M_1_PI*a/length(t);`][`join`]("\x0a")
  ),
  new Variation(
    `spiral`,
    [
      `float a=atan2(t.x,t.y);`,
      `float r=length(t)+EPS;`,
      `float r1=1.0/r;`,
      `p=r1*vec2(`,
      `	cos(a)+sin(r),`,
      `	sin(a)-cos(r)`,
      ");",
    ][`join`]("\x0a"),
    [
      `float r2=dot(t,t);`,
      `float r=sqrt(r2);`,
      `float a=atan2(t.x,t.y);`,
      `return (1.0 - r*cos(r - a) + sin(r - a))/r2;`,
    ][`join`]("\x0a")
  ),
  new VariationInverse(
    `hyperbolic`,
    [`float r2=dot(t,t)+1.0e-6;`, `p=vec2(t.x/r2,t.y);`][`join`]("\x0a"),
    [
      `float v01 = 1.0/p.x;`,
      `float det=1.0 - 4.0*p.x*p.x*p.y*p.y;`,
      `if (det>=0.0) {`,
      `	float v03 = sqrt(det);`,
      `	return f(vec2(((v01*(1.0 - v03))/2.0),p.y))`,
      `		  +f(vec2(((v01*(1.0 + v03))/2.0),p.y));`,
      `} else {`,
      `	return vec4(0.0);`,
      "}",
    ][`join`]("\x0a"),
    [`float r2=dot(t,t);`, `return (1.0-2.0*t.y*t.y/r2)/r2;`][`join`]("\x0a")
  ),
  new Variation(
    `diamond`,
    [
      `float a=atan2(t.x,t.y);`,
      `float r=length(t);`,
      `p=vec2(sin(a)*cos(r),cos(a)*sin(r));`,
    ][`join`]("\x0a"),
    [
      `float r2=dot(t,t);`,
      `float r=sqrt(r2);`,
      `return (cos(2.0*r)+2.0*t.y*t.y/r2-1.0)/(2.0*r);`,
    ][`join`]("\x0a")
  ),
  new Variation(
    "ex",
    [
      `float a=atan2(t.x,t.y);`,
      `float r=length(t);`,
      `float n0=sin(a+r);`,
      `float n1=cos(a-r);`,
      `float m0=n0*n0*n0*r;`,
      `float m1=n1*n1*n1*r;`,
      `p=vec2(m0+m1,m0-m1);`,
    ][`join`]("\x0a"),
    [
      `float r2=dot(t,t);`,
      `float r=sqrt(r2);`,
      `float s2r=sin(2.0*r);`,
      `float c2r=cos(2.0*r);`,
      `float inner=s2r+t.x*t.y/r2;`,
      `return 1.5 / r*(6.0*t.x*t.y + r*c2r - 3.0*r2*s2r)*inner*inner;`,
    ][`join`]("\x0a")
  ),
  new VariationInverse(
    `julia`,
    [
      `float r=length(t);`,
      `p=vec2(sqrt(0.5*(r+t.y)),sqrt(0.5*(r-t.y)));`,
      `if (t.x<0.0) p.y=-p.y;`,
    ][`join`]("\x0a"),
    [
      `if (p.x<0.0) return vec4(0.0);`,
      `return f(vec2( 2.0*p.x*p.y, (p.x - p.y)*(p.x + p.y) ));`,
    ][`join`]("\x0a"),
    [`return 1.0/(4.0*length(t));`][`join`]("\x0a")
  ),
  new VariationInverse(
    `bent`,
    [`vec2 n=t;`, `if (n.x<0.0) n.x*=2.0;`, `if (n.y<0.0) n.y*=0.5;`, `p=n;`][
      `join`
    ]("\x0a"),
    [
      `vec2 n=p;`,
      `if (n.x<0.0) n.x*=0.5;`,
      `if (n.y<0.0) n.y*=2.0;`,
      `return f(n);`,
    ][`join`]("\x0a"),
    [
      `float scale=1.0;`,
      `if (t.x<0.0) scale=2.0;`,
      `if (t.y<0.0) scale*=0.5;`,
      `return scale;`,
    ][`join`]("\x0a")
  ),
  new VariationInverse(
    `fisheye`,
    [`float r=length(t);`, `r=2/(r+1);`, `p=r*vec2(t.y,t.x);`][`join`]("\x0a"),
    [
      `float s=length(p);`,
      `float r=1.0/(2.0-s);`,
      `if (r>=0.0)`,
      `	return f(r*vec2(p.y,p.x));`,
      `else`,
      `	return vec4(0.0);`,
    ][`join`]("\x0a"),
    [`float r=length(t);`, `float r1=1.0+r;`, `return 4.0/(r1*r1*r1);`][`join`](
      "\x0a"
    )
  ),
  new VariationInverse(
    `exponential`,
    [
      `float dx=exp(t.x-1.0);`,
      `float dy=M_PI*t.y;`,
      `p=dx*vec2(cos(dy),sin(dy));`,
    ][`join`]("\x0a"),
    [
      `float r=length(p);`,
      `float a=atan2(p.y,p.x);`,
      `return f(vec2(log(r)+1.0,a*M_1_PI));`,
    ][`join`]("\x0a"),
    [`return M_PI*exp(2.0*t.x-2.0);`][`join`]("\x0a")
  ),
  new VariationInverse(
    `power`,
    [`float a=atan2(t.x,t.y);`, `p=vec2(cos(a),sin(a))*pow(length(t),sin(a));`][
      `join`
    ]("\x0a"),
    [
      `float a=atan2(p.y,p.x);`,
      `float r=pow(length(p), 1.0/sin(a));`,
      `if (r==0.0 || r+1.0==r)`,
      `	return vec4(0.0);`,
      `else`,
      `	return f(r*vec2(sin(a),cos(a)));`,
    ][`join`]("\x0a"),
    [
      `float ir=1.0/length(t);`,
      `float r=1.0/ir;`,
      `return pow(r, (2.0*(t.x*ir)-2.0))*(t.x*ir);`,
    ][`join`]("\x0a")
  ),
  new Variation(
    `cosine`,
    [`float n=t.x*M_PI;`, `p=vec2(cos(n)*cosh(t.y),-sin(n)*sinh(t.y));`][
      `join`
    ]("\x0a"),
    [`return 0.5*M_PI*(-cos(2.0*M_PI*t.x)+cosh(2.0*t.y));`][`join`]("\x0a")
  ),
];
function lookupVariationId(o) {
  var p;
  for (p = 0; p < variation_list[`length`]; p++) {
    if (variation_list[p][`getName`]() == o) return p;
  }
  return -1;
}
var PLANE_TEX_FUNCs = [
  `float TXfmPL(float x) {`,
  `	x*=texscale;`,
  `	return 1.0/sqrt(1.0+x*x)*0.5+0.5;`,
  "}",
  `vec2 TXfmPL(vec2 p) {`,
  `	return vec2(TXfmPL(p.x/EPS),TXfmPL(p.y/EPS));`,
  "}",
  `float PLfmTX(float s) {`,
  `	float u=2.0*s-1.0;`,
  `	return texscalei/sqrt(1.0-u*u);`,
  "}",
  `vec2 PLfmTX(vec2 s) {`,
  `	return vec2(PLfmTX(s.x/EPS),PLfmTX(s.y/EPS));`,
  "}",
][`join`]("\x0a");
var GLSL_PLutil = [
  `const float M_PI=3.14159265358979;`,
  `const float M_1_PI=1.0/M_PI;`,
  `const float EPS=1.0e-6;`,
  `uniform float texscale;`,
  `uniform float texscalei;`,
  `float atan2(float y, float x) {`,
  `  float t0, t1, t2, t3, t4;`,
  `  t3 = abs(x);`,
  `  t1 = abs(y);`,
  `  t0 = max(t3, t1);`,
  `  t1 = min(t3, t1);`,
  `  t3 = 1.0 / t0;`,
  `  t3 = t1 * t3;`,
  `  t4 = t3 * t3;`,
  `  t0 =          -0.013480470;`,
  `  t0 = t0 * t4 + 0.057477314;`,
  `  t0 = t0 * t4 - 0.121239071;`,
  `  t0 = t0 * t4 + 0.195635925;`,
  `  t0 = t0 * t4 - 0.332994597;`,
  `  t0 = t0 * t4 + 0.999995630;`,
  `  t3 = t0 * t3;`,
  `  if (abs(y) > abs(x)) t3= 1.570796327 - t3;`,
  `  if (x < 0.0) t3=  M_PI - t3;`,
  `  if (y < 0.0) t3= -t3;`,
  `  return t3;`,
  "}",
][`join`]("\x0a");
var flameTransformCount = 0;
class FlameTransform extends Variation {
  constructor(p, q, r, t, u, v) {
    super("", "", "");
    this[`_tag`] = "" + flameTransformCount++;
    this[`_var`] = lookupVariationId(q);
    this[`_weight`] = p;
    this["_x"] = t;
    this["_y"] = u;
    this["_o"] = v;
    this[`_wvar`] = r;
    this[`_nUniforms`] = 8;
  }
  [`getTag`]() {
    return this[`_tag`];
  }
  [`getWeight`]() {
    return this[`_weight`];
  }
  [`getX`]() {
    return vec2[`fromValues`](this["_x"][0], this["_x"][1]);
  }
  [`getY`]() {
    return vec2[`fromValues`](this["_y"][0], this["_y"][1]);
  }
  [`getO`]() {
    return vec2[`fromValues`](this["_o"][0], this["_o"][1]);
  }
  [`setX`](o) {
    this["_x"] = o;
  }
  [`setY`](o) {
    this["_y"] = o;
  }
  [`setO`](p) {
    this["_o"] = p;
  }
  [`equals`](p) {
    return !(typeof p === `undefined`) && this[`_var`] == p[`_var`];
  }
  [`getAreaCode`]() {
    return `NOOOO!!!!!  xForm::getAreaCode not implemented`;
  }
  [`getUniformDecl`]() {
    var p = [`uniform vec2 xf%TAG%[8];`][`join`]("\x0a");
    var q = {};
    q[`%TAG%`] = this[`_tag`];
    var r = q;
    return expandString(p, r);
  }
  [`getAffineArea`]() {
    return Math[`abs`](
      this[`_wvar`] *
        this[`_wvar`] *
        (this["_x"][0] * this["_y"][1] - this["_x"][1] * this["_y"][0])
    );
  }
  [`makeInverseMatrix`](p, q) {
    var r = 1 / (this["_x"][0] * this["_y"][1] - this["_x"][1] * this["_y"][0]);
    p[q + 0] = vec2[`fromValues`](r * this["_y"][1], r * -this["_x"][1]);
    p[q + 1] = vec2[`fromValues`](r * -this["_y"][0], r * this["_x"][0]);
    var t = vec2[`scale`](vec2[`create`](), p[q], this["_o"][0]);
    var u = vec2[`scale`](vec2[`create`](), p[q + 1], this["_o"][1]);
    var v = vec2[`add`](t, t, u);
    p[q + 2] = vec2[`fromValues`](-v[0], -v[1]);
  }
  [`getXfUniforms`](o) {
    o[0] = this["_x"];
    o[1] = this["_y"];
    o[2] = this["_o"];
    this[`makeInverseMatrix`](o, 3);
    o[6] = vec2[`fromValues`](this[`_wvar`], 1 / this[`_wvar`]);
    o[7] = vec2[`fromValues`](this[`getAffineArea`](), 0);
  }
  [`getFloat32Array`](o) {
    var p = new Float32Array(o[`length`] * 2);
    var q;
    for (q = 0; q < o[`length`]; q++) {
      p[q * 2 + 0] = o[q][0];
      p[q * 2 + 1] = o[q][1];
    }
    return p;
  }
  [`setUniformLoc`](o, p) {
    if (typeof o[`xfUniformLoc`] === `undefined`) {
      o[`xfUniformLoc`] = new Array();
    }
    o[`xfUniformLoc`][p] = gl[`getUniformLocation`](o, "xf" + this[`_tag`]);
  }
  [`setUniforms`](o, p) {
    var q = new Array(this[`nUniforms`]);
    this[`getXfUniforms`](q);
    gl[`uniform2fv`](o[`xfUniformLoc`][p], this[`getFloat32Array`](q));
  }
  [`getCode`]() {
    var p = [
      `vec2 applyMap%TAG%(vec2 t) {`,
      `	t=xf%TAG%[0]*t.x+xf%TAG%[1]*t.y+xf%TAG%[2];`,
      ` 	vec2 p;`,
      `{	%CODE%
}`,
      `	return xf%TAG%[6].x*p;`,
      "}",
      `float jacobian%TAG%(vec2 t) {`,
      ` %AREA_CODE%`,
      "}",
      `float getDensity(vec2 t) {`,
      `	t=xf%TAG%[0]*t.x+xf%TAG%[1]*t.y+xf%TAG%[2];`,
      `	return 1.0/(1.0e-3+abs(xf%TAG%[7].x*jacobian%TAG%(t)));`,
      "}",
    ][`join`]("\x0a");
    var q = {};
    q[`%TAG%`] = this[`_tag`];
    q[`%CODE%`] = variation_list[this[`_var`]][`getCode`]();
    q[`%AREA_CODE%`] = variation_list[this[`_var`]][`getAreaCode`]();
    var r = q;
    var t = this[`getUniformDecl`]() + expandString(p, r);
    return t;
  }
  [`hasInverse`](o) {
    if (this[`_tag`] == `NOINV`) return false;
    if (o) return false;
    return variation_list[this[`_var`]][`hasInverse`]();
  }
  [`getInverseCode`]() {
    var p = [
      `float jacobian%TAG%(vec2 t) {`,
      ` %AREA_CODE%`,
      "}",
      `vec4 f%TAG%(vec2 inv) {`,
      `	float areaScale=1.0/(1.0e-2+abs(xf%TAG%[7].x*jacobian%TAG%(inv)));`,
      `	vec2 p=xf%TAG%[3]*inv.x+xf%TAG%[4]*inv.y+xf%TAG%[5];`,
      `	return areaScale*g%TAG%(p);`,
      "}",
      `vec4 nonlinear_inverse%TAG%(vec2 p) {`,
      `	p=p*xf%TAG%[6].y;`,
      `	%INV_CODE%`,
      "}",
    ][`join`]("\x0a");
    var q = {};
    q[`%TAG%`] = this[`_tag`];
    q[`%INV_CODE%`] = variation_list[this[`_var`]]
      [`getInverseCode`]()
      [`replace`](/\bf\x28/g, "f" + this[`_tag`] + "(");
    q[`%AREA_CODE%`] = variation_list[this[`_var`]][`getAreaCode`]();
    var r = q;
    var t = this[`getUniformDecl`]() + expandString(p, r);
    return t;
  }
}
function smooth(o, p, q) {
  p[`push`](o);
  if (p[`length`] > q) p[`shift`]();
  var r,
    t = 0;
  for (r = 0; r < p[`length`]; r++) t += p[r];
  return t / p[`length`];
}
var loudness = [];
function getLoudness(o) {
  if (o) {
    var p = new Uint8Array(o[`frequencyBinCount`]);
    o[`getByteFrequencyData`](p);
    var q,
      r = 0;
    for (q = 0; q < p[`length`]; q++) {
      r += p[q];
    }
    return (r / p[`length`] / 255) * 4;
  }
  return 0;
}
function getBass() {
  var p = 0;
  var q = 2;
  var r = analyzers[`getBeats`]();
  if (r && r[`length`] > 0) {
    p = Math[`min`](1, (r[q + 0] + r[q + 5]) / 200);
  }
  return p;
}
function getBassX() {
  var p = 0;
  var q = 2;
  var r = analyzers[`getBeats`]();
  if (r && r[`length`] > 0) {
    p = (r[q + 0] + r[q + 5] + r[q + 10]) / 768;
  }
  return p * p;
}
var hihat = [];
function getHiHat(o) {
  if (o) {
    var p = new Uint8Array(o[`frequencyBinCount`]);
    o[`getByteFrequencyData`](p);
    var q = Math[`floor`](p[`length`] / 2);
    return p[q] / 255;
  }
  return 0;
}
function createFlameConfigX1() {
  let o = class extends FlameConfig {
    constructor() {
      super([
        [
          0.14,
          `linear`,
          1,
          [-0.4999998, -0.8660256],
          [0.8660256, -0.4999998],
          [0, 0],
        ],
        [0.22, `linear`, 1, [0.5, -0.8660254], [0.8660254, 0.5], [0, 0]],
        [0.5, `linear`, 1.22, [-1, 0], [10, -1], [-1.732051, -0.2]],
        [
          0.4,
          `spherical`,
          0.4,
          [0.8689958, 0.101100525],
          [-0.01100525, 0.8689958],
          [0.02201051, -1.737992],
        ],
      ]);
    }
    [`getMapExposure`]() {
      return 0.66;
    }
    [`getColorful`]() {
      return -1.7731;
    }
    [`getTexScale`]() {
      return 5.2;
    }
    [`getFirstLevel`]() {
      return 5;
    }
    [`getLastLevel`]() {
      return 10;
    }
    [`getScreenInitVal`]() {
      return 0.86;
    }
    [`getScreenInitScale`]() {
      return 0.650042;
    }
    [`getIterations`]() {
      return 5;
    }
    [`animate`](p) {
      this[`defaultAnimate`](p);
    }
    [`getView`]() {
      var p = smooth(getLoudness(analyzers[`getVolAnalyzer`]()), loudness, 6);
      var q = 4.2 - p * 1;
      return [q, q, 0, 0];
    }
  };
  return new o();
}
function createFlameConfigX2() {
  let o = class extends FlameConfig {
    constructor() {
      super([
        [0.119449, `linear`, 0.9, [0.31, -3.71], [0.1, 0.5], [0.35, 0.8]],
        [0.2015748, `linear`, 0.7, [0.5, 0], [0, 0.5], [-0.5, 0]],
        [0.8976378, `spherical`, 0.1, [0.8, -0.4], [0.4, 0.8], [0.2, 0.4]],
        [
          0.6929134,
          `spherical`,
          0.2,
          [-0.8, 0.4],
          [-0.4, -10.8],
          [0.02, -0.04],
        ],
      ]);
    }
    [`getMapExposure`]() {
      return 0.63749;
    }
    [`getColorful`]() {
      return 0.33323;
    }
    [`getTexScale`]() {
      return 1;
    }
    [`getFirstLevel`]() {
      return 7;
    }
    [`getLastLevel`]() {
      return 10;
    }
    [`getScreenInitVal`]() {
      return 0.074;
    }
    [`getScreenInitScale`]() {
      return 13.2;
    }
    [`getIterations`]() {
      return 5;
    }
    [`animate`](p) {
      this[`defaultAnimate`](p);
    }
    [`getView`]() {
      var p = smooth(getLoudness(analyzers[`getVolAnalyzer`]()), loudness, 6);
      var q = 0.7 - p * 0.15;
      return [q, q, 0, 0];
    }
  };
  return new o();
}
function createFlameConfigX3() {
  let o = class extends FlameConfig {
    constructor() {
      super([
        [0.1, `spherical`, 0.66, [10.5, 10], [10, 0.5], [-1.35, 0]],
        [0.6, `fisheye`, 0.22, [10.8, -0.4], [0.14, 0.8], [-0.2, 0.2]],
        [0.5, `swirl`, 0.5, [-0.1, 0.4], [-0.1, -0.2], [10.2, 0.1]],
        [0.2, `spiral`, 0.3, [0.4, 0], [-0.1, 0.1], [-0.2, 0]],
      ]);
    }
    [`getMapExposure`]() {
      return 7.4;
    }
    [`getColorful`]() {
      return 0.5323;
    }
    [`getTexScale`]() {
      return 0.61;
    }
    [`getFirstLevel`]() {
      return 7;
    }
    [`getLastLevel`]() {
      return 10;
    }
    [`getScreenInitVal`]() {
      return 0.1;
    }
    [`getScreenInitScale`]() {
      return 1.3;
    }
    [`getIterations`]() {
      return 5;
    }
    [`animate`](p) {
      this[`defaultAnimate`](p);
    }
    [`getView`]() {
      var p = smooth(getLoudness(analyzers[`getVolAnalyzer`]()), loudness, 6);
      var q = 2.2 - p * 0.5;
      return [q, q, 0, 0];
    }
  };
  return new o();
}
function createFlameConfigX4() {
  let o = class extends FlameConfig {
    constructor() {
      super([
        [0.2, `linear`, 1, [0.5, 0], [0, 0.5], [0.5, 0]],
        [0.55, `linear`, 1, [0.5, 0], [0, 0.5], [-0.5, 0]],
        [0.8, `spherical`, 1.8, [0.8, -0.4], [0.4, 0.8], [0.2, 0.4]],
        [0.8, `spherical`, 0.4, [-0.8, 0.4], [-0.4, -0.8], [0.2, 0.4]],
      ]);
    }
    [`getMapExposure`]() {
      return 0.6;
    }
    [`getColorful`]() {
      return 0.6323;
    }
    [`getTexScale`]() {
      return 0.5;
    }
    [`getFirstLevel`]() {
      return 7;
    }
    [`getLastLevel`]() {
      return 10;
    }
    [`getScreenInitVal`]() {
      return 10.4;
    }
    [`getScreenInitScale`]() {
      return 0.122;
    }
    [`animate`](p) {
      this[`defaultAnimate`](p);
    }
    [`getView`]() {
      var p = smooth(getLoudness(analyzers[`getVolAnalyzer`]()), loudness, 6);
      var q = 2.2 - p * 0.3;
      return [q, q, 0, 0];
    }
  };
  return new o();
}
function createFlameConfigX5() {
  let o = class extends FlameConfig {
    constructor() {
      super([
        [0.33, `linear`, 1.3, [0.5, 0], [0, 0.5], [0.5, 0]],
        [0.33, `spherical`, 0.3, [1, 0.5], [-0.5, 1], [0, -0.5]],
        [0.43, `spherical`, 0.4, [-1, -0.5], [0.5, -1], [1, 1]],
      ]);
    }
    [`getMapExposure`]() {
      return 2.1;
    }
    [`getColorful`]() {
      return 0.7323;
    }
    [`getTexScale`]() {
      return 0.5;
    }
    [`getFirstLevel`]() {
      return 7;
    }
    [`getLastLevel`]() {
      return 10;
    }
    [`getScreenInitVal`]() {
      return 10.4;
    }
    [`getScreenInitScale`]() {
      return 0.122;
    }
    [`getIterations`]() {
      return 2;
    }
    [`animate`](p) {
      this[`defaultAnimate`](p);
    }
    [`getView`]() {
      var p = smooth(getLoudness(analyzers[`getVolAnalyzer`]()), loudness, 6);
      var q = 0.8 - p * 0.1;
      return [q, q, 0.25, -0.25];
    }
  };
  return new o();
}
function createFlameConfigX6() {
  let o = class extends FlameConfig {
    constructor() {
      super([
        [
          0.35,
          `linear`,
          0.7,
          [0.361507, 0.1303464],
          [-0.1303464, 0.361507],
          [0.625, 0],
        ],
        [
          0.85,
          `linear`,
          0.9,
          [0.08563109, 0.7551379],
          [-0.7551379, 0.08563109],
          [0, 0],
        ],
        [
          0.35,
          `linear`,
          1,
          [0.5003027, 0.8662202],
          [-0.8662202, 0.5003027],
          [0, 0],
        ],
      ]);
    }
    [`getMapExposure`]() {
      return 2.4;
    }
    [`getColorful`]() {
      return 0.8323;
    }
    [`getTexScale`]() {
      return 1;
    }
    [`getFirstLevel`]() {
      return 7;
    }
    [`getLastLevel`]() {
      return 10;
    }
    [`getScreenInitVal`]() {
      return 2.4;
    }
    [`getScreenInitScale`]() {
      return 0.09;
    }
    [`getIterations`]() {
      return 4;
    }
    [`animate`](p) {
      this[`defaultAnimate`](p);
    }
    [`getView`]() {
      var p = smooth(getLoudness(analyzers[`getVolAnalyzer`]()), loudness, 6);
      var q = 1.5 - p * 0.25;
      return [q, q, 0, 0];
    }
  };
  return new o();
}
function createFlameConfigX() {
  let o = class extends FlameConfig {
    constructor() {
      super([
        [0.3333, `swirl`, 0.4, [6.5, 10], [0.44, 0.5], [0.33, 0.4]],
        [0.1333, `spherical`, 0.4, [0.7888, 0.9], [0.3, 0.8], [0.566, 0.5]],
        [0.63333, `diamond`, 0.6, [0.5, 0], [0, 0.5], [0, 10.551]],
      ]);
    }
    [`getMapExposure`]() {
      return 30.4;
    }
    [`getColorful`]() {
      var p = smooth(getLoudness(analyzers[`getVolAnalyzer`]()), loudness, 6);
      return p / 2 + 50.2;
    }
    [`getFirstLevel`]() {
      return 8;
    }
    [`getLastLevel`]() {
      return 12;
    }
    [`getIterations`]() {
      return 5;
    }
    [`animate`](p) {
      this[`defaultAnimate`](p);
    }
    [`getView`]() {
      var p = smooth(getLoudness(analyzers[`getVolAnalyzer`]()), loudness, 6);
      var q = 7.2 - p * 1.5;
      return [q, q, 0, 0];
    }
  };
  return new o();
}
function createFlameConfig0() {
  let o = class extends FlameConfig {
    constructor() {
      super([
        [0.3333, `spherical`, 0.4, [0.5, 0], [0, 0.5], [-0.566, 0.4]],
        [0.2333, `spherical`, 0.4, [0.5, 0], [0, 0.5], [0.566, 0.4]],
        [0.3333, `hyperbolic`, 0.4, [0.5, 0], [0, 0.5], [0, -0.551]],
      ]);
      initAbsRotation(this);
    }
    [`getMapExposure`]() {
      return 3.4;
    }
    [`getColorful`]() {
      var p = smooth(getLoudness(analyzers[`getVolAnalyzer`]()), loudness, 6);
      return p / 2 + 0.3;
    }
    [`getFirstLevel`]() {
      return 8;
    }
    [`getLastLevel`]() {
      return 12;
    }
    [`getIterations`]() {
      return 5;
    }
    [`getScreenInitVal`]() {
      return 0.9;
    }
    [`animate`](p) {
      skipAnimate(this, p, 120);
    }
    [`getAnimRates`]() {
      return [0.2, 0.3, -0.4];
    }
    [`getView`]() {
      var p = smooth(getLoudness(analyzers[`getVolAnalyzer`]()), loudness, 6);
      var q = 8.2 - p * 1.3;
      return [q, q, 0, 0];
    }
  };
  return new o();
}
function createFlameConfig1() {
  let o = class extends FlameConfig {
    constructor() {
      super([
        [0.3333, `spherical`, 0.4, [0.5, 0], [0, 0.5], [-0.566, 0.4]],
        [0.3333, `spherical`, 0.4, [0.5, 0], [0, 0.5], [0.566, 0.4]],
        [0.3333, `spherical`, 0.4, [0.5, 0], [0, 0.5], [0, -0.551]],
      ]);
    }
    [`getMapExposure`]() {
      return 1.7;
    }
    [`getColorful`]() {
      return 0.5;
    }
    [`getFirstLevel`]() {
      return 7;
    }
    [`getLastLevel`]() {
      return 11;
    }
    [`getIterations`]() {
      return 4;
    }
    [`getScreenInitScale`]() {
      return 4;
    }
    [`getTexScale`]() {
      return 4;
    }
    [`animate`](p) {
      this[`defaultAnimate`](p);
    }
    [`getView`]() {
      var p = smooth(getLoudness(analyzers[`getVolAnalyzer`]()), loudness, 6);
      var q = 7.2 - p * 0.75;
      return [q, q, 0, 0];
    }
  };
  return new o();
}
function createFlameConfig2() {
  let o = class extends FlameConfig {
    constructor() {
      super([
        [
          0.3333,
          `horseshoe`,
          1.2,
          [-0.9970145, -0.984873],
          [0.16221, 0.946498],
          [-0.606021, 0.7473919],
        ],
        [
          0.6333,
          `spherical`,
          0.7,
          [0.235448, -0.599886],
          [0.571187, 0.322248],
          [-0.871327, 0.469188],
        ],
      ]);
      this[`animRate`] = [3, 5];
    }
    [`getMapExposure`]() {
      return 1.9096749;
    }
    [`getColorful`]() {
      var p = smooth(
        Math[`min`](1, 8 * getHiHat(analyzers[`getBandAnalyzer`]())),
        hihat,
        6
      );
      return 0.4 - p;
    }
    [`getTexScale`]() {
      return -0.8790305;
    }
    [`getFirstLevel`]() {
      return 8;
    }
    [`getLastLevel`]() {
      return 10;
    }
    [`getScreenInitVal`]() {
      return 0.6;
    }
    [`getScreenInitScale`]() {
      return 0.60042;
    }
    [`getIterations`]() {
      return 3;
    }
    [`getAnimRates`]() {
      return this[`animRate`];
    }
    [`getView`]() {
      var p = smooth(getLoudness(analyzers[`getVolAnalyzer`]()), loudness, 6);
      var q = 5 - p * 0.75;
      return [q, q, 0.3, -0.3];
    }
  };
  return new o();
}
function createFlameConfig4() {
  let o = class extends FlameConfig {
    constructor() {
      super([
        [
          0.533,
          `sinusoidal`,
          0.9,
          [4.172915, 9.464352],
          [-9.464352, 4.172915],
          [4.741241, -2.293564],
        ],
        [
          0.333,
          `spherical`,
          1,
          [0.4997272, 0.2070764],
          [-0.2070764, 0.4997272],
          [0, 0],
        ],
        [0.333, `julia`, 1, [4.001953, 1.7e-7], [-1.7e-7, 4.001953], [0, 0]],
      ]);
    }
    [`getMapExposure`]() {
      return 0.9096749;
    }
    [`getColorful`]() {
      return 0.53;
    }
    [`getTexScale`]() {
      var p = smooth(
        Math[`min`](1, getHiHat(analyzers[`getHiHatAnalyzer`]()) * 2),
        hihat,
        6
      );
      return 1 - 0.2 * p;
    }
    [`getFirstLevel`]() {
      return 6;
    }
    [`getLastLevel`]() {
      return 10;
    }
    [`getScreenInitVal`]() {
      return 1;
    }
    [`getScreenInitScale`]() {
      return 0.9;
    }
    [`getIterations`]() {
      return 3;
    }
  };
  return new o();
}
var x = 0;
function createFlameConfig5() {
  let o = class extends FlameConfig {
    constructor() {
      super([
        [
          1.233,
          `julia`,
          -3.53,
          [4.001953, 1.7e-7],
          [-1.7e-7, 4.001953],
          [0, 0],
        ],
        [
          0.13,
          `sinusoidal`,
          1.532,
          [4.172915, 9.464352],
          [-9.464352, 4.172915],
          [4.741241, -2.293564],
        ],
        [
          0.333,
          `spherical`,
          0.4,
          [0.7997272, 0.2070764],
          [-0.2070764, 0.7997272],
          [0, 0],
        ],
      ]);
      this["sc"] = 0.1;
      this[`animRate`] = [3, 5, 5];
    }
    [`getMapExposure`]() {
      return 1.4096749;
    }
    [`getColorful`]() {
      var p = smooth(
        Math[`min`](1, 8 * getHiHat(analyzers[`getBandAnalyzer`]())),
        hihat,
        6
      );
      return 1.13 - p * 0.5;
    }
    [`getTexScale`]() {
      return this["sc"];
    }
    [`getFirstLevel`]() {
      return 7;
    }
    [`getLastLevel`]() {
      return 10;
    }
    [`getScreenInitVal`]() {
      return 1;
    }
    [`getScreenInitScale`]() {
      return 0.9;
    }
    [`getIterations`]() {
      return 3;
    }
    [`getAnimRates`]() {
      return this[`animRate`];
    }
    [`animate`](p) {
      this[`defaultAnimate`](p);
      x += p;
      var q = Math[`sin`](x / 1000 / 4) + 1;
      this["sc"] = 0.13 + q * 2;
    }
  };
  return new o();
}
function createFlameConfig6() {
  let o = class extends FlameConfig {
    constructor() {
      super([
        [0.333, `hyperbolic`, 0.45, [-5e-8, 1.25], [-1.25, -5e-8], [0.2, -0.4]],
        [
          1.233,
          `julia`,
          4,
          [0.7457995, -0.06098665],
          [0.06098665, 0.7457995],
          [0.06173, -0.24791667],
        ],
      ]);
      this[`animRate`] = [3, 7];
    }
    [`getMapExposure`]() {
      return 2.4096749;
    }
    [`getColorful`]() {
      var p = smooth(
        Math[`min`](1, getHiHat(analyzers[`getHiHatAnalyzer`]()) * 6),
        hihat,
        6
      );
      return 7.13 + p * 3;
    }
    [`getTexScale`]() {
      return 0.55;
    }
    [`getFirstLevel`]() {
      return 6;
    }
    [`getLastLevel`]() {
      return 9;
    }
    [`getScreenInitVal`]() {
      return 0.3;
    }
    [`getScreenInitScale`]() {
      return 0.1;
    }
    [`getIterations`]() {
      return 5;
    }
    [`getAnimRates`]() {
      return this[`animRate`];
    }
    [`getView`]() {
      var p = smooth(getLoudness(analyzers[`getVolAnalyzer`]()), loudness, 6);
      var q = 5.1 - p * 1.5;
      return [q, q, 1, -1];
    }
  };
  return new o();
}
function createFlameConfig7() {
  let o = class extends FlameConfig {
    constructor() {
      super([
        [0.533, `hyperbolic`, 1.5, [-5e-8, 1.25], [-1.25, -5e-8], [0, 0]],
        [
          0.533,
          `spherical`,
          1,
          [0.7457995, -0.06098665],
          [0.06098665, 0.7457995],
          [0.06173, -0.4791667],
        ],
      ]);
      this[`animRate`] = [1, 2];
    }
    [`getMapExposure`]() {
      return 0.813749;
    }
    [`getColorful`]() {
      return -2.033323;
    }
    [`getTexScale`]() {
      return 1.3;
    }
    [`getFirstLevel`]() {
      return 4;
    }
    [`getLastLevel`]() {
      return 10;
    }
    [`getScreenInitVal`]() {
      return 0.3;
    }
    [`getScreenInitScale`]() {
      return 0.2;
    }
    [`getIterations`]() {
      return 4;
    }
    [`getAnimRates`]() {
      return this[`animRate`];
    }
    [`getView`]() {
      var p = smooth(getLoudness(analyzers[`getVolAnalyzer`]()), loudness, 6);
      var q = 4.2 - p * 0.75;
      return [q, q, 0, 0];
    }
  };
  return new o();
}
function createFlameConfig8() {
  let o = class extends FlameConfig {
    constructor() {
      super([
        [0.4409449, `linear`, 1, [0.5, 0], [0, 0.5], [0.5, 0]],
        [0.4015748, `linear`, 1, [0.5, 0.55], [0.4, 0.5], [-0.5, 0]],
        [0.8976378, `spherical`, 0.5, [0.8, -0.4], [0.4, 0.8], [0.2, 0.4]],
        [0.6929134, `spherical`, 0.2, [-0.8, 0.4], [-0.4, -0.8], [0.2, 0.4]],
      ]);
      this[`animRate`] = [1, 2, 1, 2];
    }
    [`getMapExposure`]() {
      return -12.36133749;
    }
    [`getColorful`]() {
      return 2.5363323;
    }
    [`getTexScale`]() {
      return 2.9;
    }
    [`getFirstLevel`]() {
      return 7;
    }
    [`getLastLevel`]() {
      return 12;
    }
    [`getScreenInitVal`]() {
      return 0.1;
    }
    [`getScreenInitScale`]() {
      return 2.6;
    }
    [`getIterations`]() {
      return 4;
    }
    [`getAnimRates`]() {
      return this[`animRate`];
    }
    [`getView`]() {
      var p = smooth(getLoudness(analyzers[`getVolAnalyzer`]()), loudness, 6);
      var q = 5.2 - p * 1.2;
      return [q, q, 0, 0];
    }
  };
  return new o();
}
function createFlameConfig9() {
  let o = class extends FlameConfig {
    constructor() {
      super([
        [0.2, `linear`, 1.4, [10.5, 0], [0, 0.5], [0.5, 0]],
        [0.2, `linear`, 1, [0.5, 0], [10, 0.5], [-0.5, 0]],
        [0.8, `spherical`, 0.8, [0.1, -0.4], [0.4, 0.41], [0.333, 0.4]],
        [0.8, `spherical`, 0.4, [-10.8, 0.4], [-0.4, -110.8], [0.2, 0.4]],
      ]);
      this[`animRate`] = [-1, -1, -1, -1];
    }
    [`getMapExposure`]() {
      return 1.9;
    }
    [`getColorful`]() {
      return 13.8323;
    }
    [`getTexScale`]() {
      return 1;
    }
    [`getFirstLevel`]() {
      return 7;
    }
    [`getLastLevel`]() {
      return 10;
    }
    [`getScreenInitVal`]() {
      return 0.1;
    }
    [`getScreenInitScale`]() {
      return 1.2;
    }
    [`getIterations`]() {
      return 5;
    }
    [`getAnimRates`]() {
      return this[`animRate`];
    }
    [`getView`]() {
      var p = smooth(getLoudness(analyzers[`getVolAnalyzer`]()), loudness, 6);
      var q = 6.2 - p * 1;
      return [q, q, 0, 0];
    }
  };
  return new o();
}
function createFlameConfig10() {
  let o = class extends FlameConfig {
    constructor() {
      super([
        [0.33, `linear`, 1.3, [0.5, 0], [0, 0.5], [0.5, 0]],
        [0.43, `heart`, 1.1, [1, 0.5], [-0.5, 1], [0, -0.5]],
        [0.43, `spherical`, 0.4, [-1, -0.5], [0.5, -1], [1, 1]],
      ]);
      this[`animRate`] = [2, 2, 2, 2];
    }
    [`getMapExposure`]() {
      return 2.2289143;
    }
    [`getColorful`]() {
      return 0.61129321418323;
    }
    [`getTexScale`]() {
      return 1;
    }
    [`getFirstLevel`]() {
      return 7;
    }
    [`getLastLevel`]() {
      return 10;
    }
    [`getScreenInitVal`]() {
      return 1;
    }
    [`getScreenInitScale`]() {
      return 0.1;
    }
    [`getIterations`]() {
      return 5;
    }
    [`getAnimRates`]() {
      return this[`animRate`];
    }
    [`getView`]() {
      var p = smooth(getLoudness(analyzers[`getVolAnalyzer`]()), loudness, 6);
      var q = 4.2 - p * 1;
      return [q, q, 0.3, -0.2];
    }
  };
  return new o();
}
var s = 1.3;
function createFlameConfig11() {
  let o = class extends FlameConfig {
    constructor() {
      super([
        [
          0.3333,
          `swirl`,
          1,
          [-0.484358, 0.88212],
          [0.124088, 0.484358],
          [0, 0],
        ],
        [
          0.3333,
          `linear`,
          1,
          [0.0438976, -0.498069],
          [0.498069, 0.0438976],
          [1.3, 0],
        ],
        [0.333, `linear`, 1, [0.5, 0], [0, 0.5], [0.3 * s, -s]],
      ]);
      this[`animRate`] = [10, 5, 1];
    }
    [`getMapExposure`]() {
      return 1.91;
    }
    [`getColorful`]() {
      return -3.294;
    }
    [`getTexScale`]() {
      return 0.179537;
    }
    [`getFirstLevel`]() {
      return 10;
    }
    [`getLastLevel`]() {
      return 11;
    }
    [`getScreenInitVal`]() {
      return 1;
    }
    [`getScreenInitScale`]() {
      return 2.23622;
    }
    [`getIterations`]() {
      return 5;
    }
    [`getAnimRates`]() {
      return this[`animRate`];
    }
    [`getView`]() {
      var p = smooth(getLoudness(analyzers[`getVolAnalyzer`]()), loudness, 6);
      var q = 0.5 - p * 0.1;
      return [q, q, 0.3, -0.2];
    }
  };
  return new o();
}
function createFlameConfig12() {
  let o = class extends FlameConfig {
    constructor() {
      super([
        [0.33, `hyperbolic`, 0.4, [0.5, 0], [0, 0.5], [-0.566, 0.4]],
        [0.33, `spherical`, 0.4, [0.5, 0], [0, 0.5], [0.566, 0.4]],
        [0.33, `spherical`, 0.4, [0.5, 0], [0, 0.5], [0, -0.551]],
      ]);
      this[`animRate`] = [1, 1, 1, 1];
    }
    [`getMapExposure`]() {
      return 2.46727;
    }
    [`getColorful`]() {
      return 0.579314;
    }
    [`getTexScale`]() {
      return 0.75;
    }
    [`getFirstLevel`]() {
      return 7;
    }
    [`getLastLevel`]() {
      return 10;
    }
    [`getScreenInitVal`]() {
      return 0.351317;
    }
    [`getScreenInitScale`]() {
      return 66;
    }
    [`getIterations`]() {
      return 4;
    }
    [`getAnimRates`]() {
      return this[`animRate`];
    }
    [`getView`]() {
      var p = this[`decay`](getBass());
      var q = 2.2 - p * 0.2;
      return [q, q, 0.2, -0.2];
    }
  };
  return new o();
}
function createFlameConfig13() {
  let o = class extends FlameConfig {
    constructor() {
      super([
        [0.28393, `spherical`, 0.5, [0.5, 0], [0, 0.5], [-0.566, 0.4]],
        [0.21053, `spherical`, 0.5, [0.5, 0], [0, 0.5], [0.566, 0.4]],
        [0.143482, `horseshoe`, 0.9, [0.5, 0], [0, 0.5], [0, -0.551]],
      ]);
      this[`animRate`] = [1, 1, 1];
    }
    [`getMapExposure`]() {
      return 5.16944;
    }
    [`getColorful`]() {
      return 0.741352;
    }
    [`getTexScale`]() {
      return 0.47984;
    }
    [`getFirstLevel`]() {
      return 7;
    }
    [`getLastLevel`]() {
      return 10;
    }
    [`getScreenInitVal`]() {
      return 0.0325568;
    }
    [`getScreenInitScale`]() {
      return 0.057675;
    }
    [`getIterations`]() {
      return 5;
    }
    [`getAnimRates`]() {
      return this[`animRate`];
    }
    [`getView`]() {
      var p = this[`decay`](getBass());
      var q = 1.2 - p * 0.1;
      return [q, q, 0, 0];
    }
  };
  return new o();
}
function skipAnimate(o, p, q) {
  var r = o[`getFlameTransforms`]();
  var t;
  for (t = 0; t < r[`length`]; t++) {
    var u = o[`getAnimRates`]()[t] * 0.0002 * (1 + 0.1234 * t);
    var v = (o[`angles`][t] + u * p) % (Math["PI"] * 2);
    if (v < 0) v = Math["PI"] * 2 - v;
    var w = Math["PI"] / 180;
    if (t < 2 && v < w * q) v = w * q;
    o[`angles`][t] = v;
    var z = Math[`cos`](v),
      A = Math[`sin`](v);
    var B = vec2[`fromValues`](o[`origX`][t][0], o[`origX`][t][1]);
    var C = vec2[`fromValues`](o[`origY`][t][0], o[`origY`][t][1]);
    var D = vec2[`subtract`](
      vec2[`create`](),
      vec2[`scale`](B, B, z),
      vec2[`scale`](C, C, A)
    );
    var E = vec2[`fromValues`](o[`origX`][t][0], o[`origX`][t][1]);
    var F = vec2[`fromValues`](o[`origY`][t][0], o[`origY`][t][1]);
    var G = vec2[`add`](
      vec2[`create`](),
      vec2[`scale`](E, E, A),
      vec2[`scale`](F, F, z)
    );
    r[t][`setX`](D);
    r[t][`setY`](G);
  }
}
function initAbsRotation(o) {
  o[`origX`] = [];
  o[`origY`] = [];
  o[`angles`] = [];
  var p;
  for (p = 0; p < o["xf"][`length`]; p++) {
    o[`origX`][`push`](o["xf"][p][`getX`]());
    o[`origY`][`push`](o["xf"][p][`getY`]());
    o[`angles`][`push`](0);
  }
}
function createFlameConfig14() {
  let o = class extends FlameConfig {
    constructor() {
      super([
        [0.333, `spherical`, 0.4, [0.5, 0], [0, 0.5], [-0.566, 0.4]],
        [0.333, `spherical`, 0.4, [0.5, 0], [0, 0.5], [0.566, 0.4]],
        [-0.00382, `horseshoe`, 0.4, [0.5, 0], [0, 0.5], [0, -0.551]],
      ]);
      this[`animRate`] = [-1, 0.4, 3];
      initAbsRotation(this);
    }
    [`getMapExposure`]() {
      return 5.06021;
    }
    [`getColorful`]() {
      return 0.213407;
    }
    [`getTexScale`]() {
      return 0.908053;
    }
    [`getFirstLevel`]() {
      return 7;
    }
    [`getLastLevel`]() {
      return 10;
    }
    [`getScreenInitVal`]() {
      return 0.0525668;
    }
    [`getScreenInitScale`]() {
      return 0.107675;
    }
    [`getIterations`]() {
      return 5;
    }
    [`getAnimRates`]() {
      return this[`animRate`];
    }
    [`getView`]() {
      var p = this[`decay`](getBass());
      var q = 3.2 - p * 0.5;
      return [q, q, 0, 0];
    }
    [`animate`](p) {
      skipAnimate(this, p, 80);
    }
  };
  return new o();
}
function createFlameConfig15() {
  let o = class extends FlameConfig {
    constructor() {
      super([
        [0.333, `spherical`, 0.4, [0.5, 0], [0, 0.5], [-0.566, 0.4]],
        [0.333, `spherical`, 0.4, [0.5, 0], [0, 0.5], [0.566, 0.4]],
        [0.333, `swirl`, 0.4, [0.5, 0], [0, 0.5], [0, -0.551]],
      ]);
      this[`animRate`] = [-1, 1, 4];
      initAbsRotation(this);
    }
    [`getMapExposure`]() {
      return 2.66021;
    }
    [`getColorful`]() {
      return 0.283407;
    }
    [`getTexScale`]() {
      return 0.858053;
    }
    [`getFirstLevel`]() {
      return 7;
    }
    [`getLastLevel`]() {
      return 10;
    }
    [`getScreenInitVal`]() {
      return 0.04704;
    }
    [`getScreenInitScale`]() {
      return 53.22;
    }
    [`getIterations`]() {
      return 5;
    }
    [`getAnimRates`]() {
      var p = smooth(getLoudness(analyzers[`getVolAnalyzer`]()), loudness, 6);
      this[`animRate`][2] = (p - 0.5) * 3;
      return this[`animRate`];
    }
    [`getView`]() {
      var p = this[`decay`](getBass());
      var q = 2.2 - p * 0.3;
      return [q, q, 0, 0];
    }
    [`animate`](p) {
      skipAnimate(this, p, 80);
    }
  };
  return new o();
}
var defaultAnimRates = [1, 1, 1, 1, 1, 1, 1, 1];
makeTransforms = function (o) {
  var p = new Array();
  var q;
  for (q = 0; q < o[`length`]; q++) {
    var r = o[q];
    p[`push`](new FlameTransform(r[0], r[1], r[2], r[3], r[4], r[5]));
  }
  return p;
};
class FlameConfig {
  constructor(o) {
    this["xf"] = makeTransforms(o);
    this[`map_exposure`] = 1.8;
    this[`colorful`] = 1.5;
    this[`texscale`] = 0.8;
    this[`force_vertexonly`] = 0;
    this[`disc_compute`] = 50;
    this[`firstlevel`] = 6;
    this[`lastlevel`] = 12;
    this[`nlevel`] = 12;
    this[`screen_initval`] = 0.3;
    this[`screen_initscale`] = 0.2;
    this[`iterations`] = 3;
    this[`oldval`] = 0;
  }
  [`decay`](o) {
    var p = 0.95;
    var q = 0.3;
    this[`oldval`] = this[`oldval`] * p + o * q;
    return this[`oldval`];
  }
  [`getMapExposure`]() {
    return this[`map_exposure`];
  }
  [`getColorful`]() {
    return this[`colorful`];
  }
  [`getTexScale`]() {
    return this[`texscale`];
  }
  [`getForceVertexOnly`]() {
    return this[`force_vertexonly`];
  }
  [`getDiscCompute`]() {
    return this[`disc_compute`];
  }
  [`getFirstLevel`]() {
    return this[`firstlevel`];
  }
  [`getLastLevel`]() {
    return this[`lastlevel`];
  }
  [`getNLevel`]() {
    return this[`nlevel`];
  }
  [`getScreenInitVal`]() {
    return this[`screen_initval`];
  }
  [`getScreenInitScale`]() {
    return this[`screen_initscale`];
  }
  [`getIterations`]() {
    return this[`iterations`];
  }
  [`getFlameTransforms`]() {
    return this["xf"];
  }
  [`getView`]() {
    return [5, 5, 0, 0];
  }
  [`animate`](o) {
    this[`defaultAnimate`](o);
  }
  [`defaultAnimate`](o) {
    var p = this[`getFlameTransforms`]();
    for (var q = 0; q < p[`length`]; q++) {
      var r = this[`getAnimRates`]()[q] * 0.0002 * (1 + 0.1234 * q);
      var t = r * o;
      var u = Math[`cos`](t),
        v = Math[`sin`](t);
      var w = p[q][`getX`]();
      var z = p[q][`getY`]();
      w = vec2[`scale`](w, w, u);
      z = vec2[`scale`](z, z, v);
      var A = vec2[`subtract`](vec2[`create`](), w, z);
      var B = p[q][`getX`]();
      var C = p[q][`getY`]();
      var D = vec2[`add`](
        vec2[`create`](),
        vec2[`scale`](B, B, v),
        vec2[`scale`](C, C, u)
      );
      p[q][`setX`](A);
      p[q][`setY`](D);
    }
  }
  [`getAnimRates`]() {
    return defaultAnimRates;
  }
}
class FrameMgr {
  constructor(o, p) {
    this[`frameSrc`] = o;
    this[`frameDest`] = p;
  }
  [`swap`]() {
    var o;
    o = this[`frameSrc`];
    this[`frameSrc`] = this[`frameDest`];
    this[`frameDest`] = o;
  }
  [`setSource`](o) {
    this[`frameSrc`] = o;
  }
  [`setDestination`](o) {
    this[`frameDest`] = o;
  }
  [`getSource`]() {
    return this[`frameSrc`];
  }
  [`getDestination`]() {
    return this[`frameDest`];
  }
}
class Furnance {
  constructor(o) {
    gl = o;
    var p =
      gl[`getExtension`](`OES_float_linear`) ||
      gl[`getExtension`](`OES_half_float_linear`);
    if (p) {
      this[`useFloatTextures`] = !false;
    } else {
      this[`useFloatTextures`] = false;
    }
    this[`config`] = 0;
    this[`xfm_cached_px`] = 0;
    this[`progPerPixMap`] = 0;
    this[`xfm_prog`] = new Array();
    this[`xfm_cached_vx`] = new Array();
    this[`lastRes`] = 0;
    this[`cachedVertices`];
    this[`texLevels`] = 0;
    this[`fbo`] = 0;
  }
  [`setConfig`](o) {
    this[`config`] = o;
  }
  [`getConfig`]() {
    return this[`config`];
  }
  [`getI`](o) {
    return 1 / o;
  }
  [`setTextureUniformLocs`](o) {
    o[`tex`] = gl[`getUniformLocation`](o, `tex`);
    o[`texscale`] = gl[`getUniformLocation`](o, `texscale`);
    o[`texscalei`] = gl[`getUniformLocation`](o, `texscalei`);
  }
  [`setProgramParams`](o, p) {
    gl[`uniform1i`](o[`tex`], 0);
    gl[`uniform1f`](o[`texscale`], p);
    gl[`uniform1f`](o[`texscalei`], this[`getI`](p));
    opengl[`setLegacyFixedPipelineParams`](o);
  }
  [`errorExit`](o, p) {
    alert(`Fatal error> ` + o + ">" + p);
    throw Error(`framebuffer setup failed`);
  }
  [`bad_framebuffer`](o) {
    switch (o) {
      case gl[`FRAMEBUFFER_COMPLETE`]:
        this[`errorExit`](
          `gl.framebufferTexture2D`,
          `framebuffer is actually OK (?!)`
        );
        break;
      case gl[`FRAMEBUFFER_UNSUPPORTED`]:
        this[`errorExit`](
          `gl.framebufferTexture2D`,
          `combination of formats is UNSUPPORTED by your card`
        );
        break;
      case gl[`FRAMEBUFFER_INCOMPLETE_ATTACHMENT`]:
        this[`errorExit`](
          `gl.framebufferTexture2D`,
          `FRAMEBUFFER_INCOMPLETE_ATTACHMENT`
        );
        break;
      case gl[`FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT`]:
        this[`errorExit`](
          `gl.framebufferTexture2D`,
          `FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT`
        );
        break;
      case gl[`FRAMEBUFFER_INCOMPLETE_DIMENSIONS`]:
        this[`errorExit`](
          `gl.framebufferTexture2D`,
          `FRAMEBUFFER_INCOMPLETE_DIMENSIONS`
        );
        break;
      default:
        this[`errorExit`](
          `gl.framebufferTexture2D`,
          `FRAMEBUFFER  logic error`
        );
    }
  }
  [`mapColor`](o, p) {
    var q = 1,
      u = 1,
      v = 1;
    var w = this[`config`][`getColorful`]();
    switch (p % 3) {
      case 0:
        q -= w;
        break;
      case 1:
        u -= w;
        break;
      case 2:
        v -= w;
        break;
    }
    var y = this[`config`][`getMapExposure`]();
    if (y < 0) {
      var z;
      z = q;
      q = u;
      u = z;
      z = v;
      v = u;
      u = z;
    }
    var A = Math[`abs`](y) * o[p][`getWeight`]();
    return new Float32Array([A * q, A * u, A * v, 1]);
  }
  [`getInversFnsSnippet`](p) {
    var q = [
      `/*------------------- w%TAG% -----------------*/`,
      `uniform vec4 color%TAG%;`,
      `vec4 g%TAG%(vec2 p) {`,
      `	return exp2(texture(tex,TXfmPL(p))*20.0)-1.0;`,
      "}",
      `%INV_CODE%`,
    ][`join`]("\x0a");
    var r = "";
    var t;
    for (t = 0; t < p[`length`]; t++) {
      if (p[t][`hasInverse`](this[`config`][`getForceVertexOnly`]())) {
        var u = p[t][`getInverseCode`]();
        var v = {};
        v[`%TAG%`] = p[t][`getTag`]();
        v[`%INV_CODE%`] = u;
        var w = v;
        r += expandString(q, w);
      }
    }
    return r;
  }
  [`getSumFnsSnippet`](p) {
    var q = [`	sum+=color%TAG%*nonlinear_inverse%TAG%(p);`][`join`]("\x0a");
    var r = "";
    var t;
    for (t = 0; t < p[`length`]; t++) {
      if (p[t][`hasInverse`](this[`config`][`getForceVertexOnly`]())) {
        var u = {};
        u[`%TAG%`] = p[t][`getTag`]();
        var v = u;
        r += expandString(q, v);
      }
    }
    return r;
  }
  [`simulate_perpixel_maps`](p, q) {
    if (this[`progPerPixMap`] == 0 || !(this[`xfm_cached_px`] == p)) {
      var r = [
        `#version 300 es
`,
        `precision highp  float;`,
        `out vec2 destcoords;`,
        `in vec4 leg_gl_Vertex;`,
        `uniform mat4 leg_gl_ProjectionMatrix;`,
        `uniform mat4 leg_gl_ModelViewMatrix;`,
        `void main(void) {`,
        `	destcoords = vec2(leg_gl_Vertex);`,
        `	gl_Position = leg_gl_ProjectionMatrix * leg_gl_ModelViewMatrix * leg_gl_Vertex;`,
        "}",
      ][`join`]("\x0a");
      var t = [
        `#version 300 es
`,
        `precision highp  float;`,
        `in vec2 destcoords;`,
        `uniform sampler2D tex;`,
        `out vec4 glColor;`,
        GLSL_PLutil,
        PLANE_TEX_FUNCs,
        `%INV_FUNCS%`,
        `vec4 sum_inverses(vec2 p) {`,
        `	vec4 sum=vec4(0.0);`,
        `%SUM_FUNCS%`,
        `	return log2(sum+1.0)*(1.0/20.0);`,
        "}",
        `void main(void) {`,
        `	glColor = sum_inverses(PLfmTX(destcoords));`,
        "}",
      ][`join`]("\x0a");
      this[`xfm_cached_px`] = p;
      var u = this[`getInversFnsSnippet`](p);
      var v = this[`getSumFnsSnippet`](p);
      var w = {};
      w[`%INV_FUNCS%`] = u;
      w[`%SUM_FUNCS%`] = v;
      var y = w;
      var z = expandString(t, y);
      this[`progPerPixMap`] = opengl[`makeProgramObject`](r, z);
      this[`progPerPixMap`][`uniformLocs`] = new Array();
      var A;
      for (A = 0; A < p[`length`]; A++) {
        if (p[A][`hasInverse`](this[`config`][`getForceVertexOnly`]())) {
          p[A][`setUniformLoc`](this[`progPerPixMap`], A);
          this[`progPerPixMap`][`uniformLocs`][A] = gl[`getUniformLocation`](
            this[`progPerPixMap`],
            `color` + p[A][`getTag`]()
          );
        }
      }
      this[`setTextureUniformLocs`](this[`progPerPixMap`]);
    }
    gl[`useProgram`](this[`progPerPixMap`]);
    this[`setProgramParams`](
      this[`progPerPixMap`],
      this[`config`][`getTexScale`]()
    );
    var A;
    for (A = 0; A < p[`length`]; A++) {
      if (p[A][`hasInverse`](this[`config`][`getForceVertexOnly`]())) {
        p[A][`setUniforms`](this[`progPerPixMap`], A);
        gl[`uniform4fv`](
          this[`progPerPixMap`][`uniformLocs`][A],
          this[`mapColor`](p, A)
        );
      }
    }
    opengl[`draw_texture`](
      this[`progPerPixMap`],
      mat4[`create`](),
      [-1, -1, 0.5],
      [1, 1, 0.5]
    );
    gl[`useProgram`](null);
  }
  [`TXfmPL`](o, p) {
    o *= p;
    return (o / Math[`sqrt`](1 + o * o)) * 0.5 + 0.5;
  }
  [`useSeedShader`]() {
    if (!this[`seedShader`]) {
      var o = opengl[`loadShader`](
        gl[`VERTEX_SHADER`],
        `#version 300 es
				  precision highp float; 				  in vec4 a_Vertex; 				  uniform vec4 u_color; 				  out vec4 v_color; 				  uniform mat4 mvp_matrix; 				  void main() { 						gl_Position = mvp_matrix * a_Vertex; 						v_color = u_color; 				  }`
      );
      var p = opengl[`loadShader`](
        gl[`FRAGMENT_SHADER`],
        `#version 300 es
				  precision highp float; 				  in vec4 v_color; 				  out vec4 glColor; 				  void main() { 					  glColor = v_color; 				  }`
      );
      var q = gl[`createProgram`]();
      gl[`attachShader`](q, o);
      gl[`attachShader`](q, p);
      gl[`linkProgram`](q);
      if (!gl[`getProgramParameter`](q, gl[`LINK_STATUS`]))
        throw Error(`Unable to initialize the shader program.`);
      gl[`useProgram`](q);
      q[`a_Vertex`] = gl[`getAttribLocation`](q, `a_Vertex`);
      q[`ucolorloc`] = gl[`getUniformLocation`](q, `u_color`);
      q[`upointsizeloc`] = gl[`getUniformLocation`](q, `u_pointsize`);
      q[`mvpmatrixloc`] = gl[`getUniformLocation`](q, `mvp_matrix`);
      this[`seedShader`] = q;
    } else {
      gl[`useProgram`](this[`seedShader`]);
    }
    return this[`seedShader`];
  }
  [`drawSeedTexture`](o) {
    gl[`clearColor`](0, 0, 0, 1);
    gl[`clear`](gl[`COLOR_BUFFER_BIT`]);
    opengl[`uPushMatrix`]();
    opengl[`uTranslatef`](0.5, 0.5, 0);
    var p = this[`config`][`getScreenInitScale`]();
    var q = p * (this[`TXfmPL`](1, o) - this[`TXfmPL`](0, o));
    var r = this[`useSeedShader`]();
    var t = vec3[`fromValues`](0, 0, 0);
    var u = vec3[`fromValues`](q, q, 0);
    gl[`uniform1f`](r[`upointsizeloc`], 1);
    var v = this[`config`][`getScreenInitVal`]();
    gl[`uniform4f`](r[`ucolorloc`], v, v, v, 1);
    gl[`uniform1i`](r[`stextureloc`], 0);
    opengl[`multiply`](
      opengl[`mvpMatrix`],
      opengl[`mvMatrix`],
      opengl[`prMatrix`]
    );
    gl[`uniformMatrix4fv`](r[`mvpmatrixloc`], false, opengl[`mvpMatrix`]);
    opengl[`draw_texture`](r, mat4[`create`](), t, u);
    opengl[`uPopMatrix`]();
  }
  [`addVertex`](o, p) {
    o[`push`](p[0]);
    o[`push`](p[1]);
    o[`push`](0);
  }
  [`draw_pervertex_map`](o, p) {
    if (p != this[`lastRes`]) {
      var q = 1 / p,
        r = 1 / p;
      this[`cachedVertices`] = new Array();
      var u, v;
      for (v = 0; v < 1; v += q) {
        for (u = 0; u <= 1; u += r) {
          var w = vec2[`fromValues`](u, v);
          this[`addVertex`](this[`cachedVertices`], w);
          if (u == 0) this[`addVertex`](this[`cachedVertices`], w);
          w = vec2[`fromValues`](u, v + q);
          this[`addVertex`](this[`cachedVertices`], w);
          if (u + r > 1) this[`addVertex`](this[`cachedVertices`], w);
        }
      }
      this[`lastRes`] = p;
    }
    var z = gl[`createBuffer`]();
    gl[`bindBuffer`](gl[`ARRAY_BUFFER`], z);
    gl[`bufferData`](
      gl[`ARRAY_BUFFER`],
      new Float32Array(this[`cachedVertices`]),
      gl[`STATIC_DRAW`]
    );
    z[`itemSize`] = 3;
    z[`numItems`] = this[`cachedVertices`][`length`] / 3;
    gl[`enableVertexAttribArray`](o[`leg_gl_Vertex`]);
    gl[`vertexAttribPointer`](
      o[`leg_gl_Vertex`],
      z[`itemSize`],
      gl[`FLOAT`],
      false,
      0,
      0
    );
    gl[`drawArrays`](gl[`TRIANGLE_STRIP`], 0, z[`numItems`]);
  }
  [`simulate_pervertex_map`](p, q, r) {
    if (this[`xfm_prog`][r] == 0 || !p[r][`equals`](this[`xfm_cached_vx`][r])) {
      var t = [
        `#version 300 es
`,
        `precision highp float;`,
        GLSL_PLutil,
        PLANE_TEX_FUNCs,
        ` %VAR_CODE%`,
        `vec2 applyMap(vec2 t) {`,
        `	return TXfmPL(applyMap%ID%(PLfmTX(t)));`,
        "}",
        `out vec4 color;`,
        `out vec2 texcoords;`,
        `in vec4 leg_gl_Color;`,
        `in vec4 leg_gl_Vertex;`,
        `uniform mat4 leg_gl_ProjectionMatrix;`,
        `uniform mat4 leg_gl_ModelViewMatrix;`,
        `void main(void) {`,
        `	texcoords=vec2(leg_gl_Vertex);`,
        `	vec2 onscreen=applyMap(texcoords);`,
        `	color=getDensity(texcoords)*leg_gl_Color;`,
        `	gl_Position = leg_gl_ProjectionMatrix * leg_gl_ModelViewMatrix * vec4(onscreen,0,1);`,
        "}",
      ][`join`]("\x0a");
      var u = [
        `#version 300 es
`,
        `precision highp float;`,
        `in vec4 color;`,
        `in vec2 texcoords;`,
        `uniform sampler2D tex;`,
        `out vec4 glColor;`,
        `void main(void) {`,
        `	glColor = color*texture(tex,texcoords);`,
        "}",
      ][`join`]("\x0a");
      this[`xfm_cached_vx`][r] = p[r];
      var v = {};
      v[`%VAR_CODE%`] = p[r][`getCode`]();
      v[`%ID%`] = p[r][`getTag`]();
      var w = v;
      var y = expandString(t, w);
      this[`xfm_prog`][r] = opengl[`makeProgramObject`](y, u);
      p[r][`setUniformLoc`](this[`xfm_prog`][r]);
      this[`setTextureUniformLocs`](this[`xfm_prog`][r]);
    }
    var z = this[`xfm_prog`][r];
    gl[`useProgram`](z);
    this[`setProgramParams`](z, this[`config`][`getTexScale`]());
    p[r][`setUniforms`](z, r);
    this[`draw_pervertex_map`](z, this[`config`][`getDiscCompute`]());
    gl[`useProgram`](null);
  }
  [`drawInverseFuncs`](o, p) {
    gl[`disable`](gl[`BLEND`]);
    if (!this[`config`][`getForceVertexOnly`]()) {
      this[`simulate_perpixel_maps`](o, p);
    } else {
      gl[`clearColor`](0, 0, 0, 1);
      gl[`clear`](gl[`COLOR_BUFFER_BIT`]);
    }
    gl[`enable`](gl[`BLEND`]);
    var q;
    for (q = 0; q < o[`length`]; q++) {
      if (!o[q][`hasInverse`](this[`config`][`getForceVertexOnly`]())) {
        this[`simulate_pervertex_map`](o, p, q);
      }
    }
  }
  [`setFramebufTextureAttachment`](o) {
    gl[`framebufferTexture2D`](
      gl[`FRAMEBUFFER`],
      gl[`COLOR_ATTACHMENT0`],
      gl[`TEXTURE_2D`],
      o,
      0
    );
    var p = gl[`checkFramebufferStatus`](gl[`FRAMEBUFFER`]);
    if (p != gl[`FRAMEBUFFER_COMPLETE`]) {
      this[`bad_framebuffer`](p);
    }
    gl[`disable`](gl[`DEPTH_TEST`]);
  }
  [`drawMapLevel`](o, p, q, r) {
    var t = p[`getDestination`]();
    this[`setFramebufTextureAttachment`](t);
    var u = 1 << q,
      v = 1 << q;
    gl[`viewport`](0, 0, u, v);
    gl[`scissor`](0, 0, u, v);
    if (r == 0 && q == this[`config`][`getFirstLevel`]()) {
      this[`drawSeedTexture`](this[`config`][`getTexScale`]());
    } else {
      this[`drawInverseFuncs`](o, q);
    }
    gl[`bindTexture`](gl[`TEXTURE_2D`], t);
    gl[`generateMipmap`](gl[`TEXTURE_2D`]);
    p[`swap`]();
    if (r == 0 && q != this[`config`][`getFirstLevel`]()) {
      var y = this[`getTextureLevels`]();
      p[`setDestination`](y[q][1]);
    }
  }
  [`create2DArray`](o) {
    var p = [];
    for (var q = 0; q < o; q++) {
      p[q] = [];
    }
    return p;
  }
  [`getTextureLevels`]() {
    if (this[`texLevels`] == 0) {
      var o = this[`config`][`getNLevel`]();
      this[`texLevels`] = this[`create2DArray`](o + 1);
      var p;
      for (p = 0; p <= o; p++) {
        var q;
        for (q = 0; q < 2; q++) {
          var r = 1 << p;
          var t = gl[`createTexture`]();
          t[`width`] = r;
          t[`height`] = r;
          this[`texLevels`][p][q] = t;
          gl[`bindTexture`](gl[`TEXTURE_2D`], this[`texLevels`][p][q]);
          var u = this[`useFloatTextures`] ? gl[`FLOAT`] : gl[`UNSIGNED_BYTE`];
          gl[`texImage2D`](
            gl[`TEXTURE_2D`],
            0,
            gl[`RGBA`],
            r,
            r,
            0,
            gl[`RGBA`],
            u,
            null
          );
          var v =
            gl[`getExtension`](`EXT_texture_filter_anisotropic`) ||
            gl[`getExtension`](`MOZ_EXT_texture_filter_anisotropic`) ||
            gl[`getExtension`](`WEBKIT_EXT_texture_filter_anisotropic`);
          if (v) {
            gl[`texParameterf`](
              gl[`TEXTURE_2D`],
              v[`TEXTURE_MAX_ANISOTROPY_EXT`],
              16
            );
          }
          gl[`texParameteri`](
            gl[`TEXTURE_2D`],
            gl[`TEXTURE_MIN_FILTER`],
            gl[`LINEAR_MIPMAP_LINEAR`]
          );
          gl[`texParameteri`](
            gl[`TEXTURE_2D`],
            gl[`TEXTURE_MAG_FILTER`],
            gl[`LINEAR`]
          );
          gl[`generateMipmap`](gl[`TEXTURE_2D`]);
          gl[`bindTexture`](gl[`TEXTURE_2D`], null);
        }
      }
    }
    return this[`texLevels`];
  }
  [`getFrameBuffer`]() {
    if (this[`fbo`] == 0) {
      this[`fbo`] = gl[`createFramebuffer`]();
    }
    return this[`fbo`];
  }
  [`setupLegacyShaderProg`]() {
    opengl[`uMatrixMode`](opengl[`U_PROJECTION`]);
    opengl[`uLoadIdentity`]();
    opengl[`uMatrixMode`](opengl[`U_MODELVIEW`]);
    opengl[`uLoadIdentity`]();
    opengl[`uScalef`](1, 1, 0.01);
    opengl[`uScalef`](2, 2, 1);
    opengl[`uTranslatef`](-0.5, -0.5, 0);
  }
  [`ignite`]() {
    this[`setupLegacyShaderProg`]();
    var o = new FrameMgr(0, null);
    var p = this[`getFrameBuffer`]();
    gl[`bindFramebuffer`](gl[`FRAMEBUFFER`], p);
    var q = this[`getTextureLevels`]();
    gl[`blendFunc`](gl[`ONE`], gl[`ONE`]);
    gl[`enable`](gl[`BLEND`]);
    gl[`disable`](gl[`CULL_FACE`]);
    var r;
    var t = this[`config`][`getFirstLevel`]();
    var u = this[`config`][`getLastLevel`]();
    for (r = t; r <= u; r++) {
      o[`setDestination`](q[r][0]);
      if (r == t) {
        o[`setSource`](q[r][1]);
      }
      var v;
      var w = this[`config`][`getIterations`]();
      for (v = 0; v < w; v++) {
        this[`drawMapLevel`](this[`config`][`getFlameTransforms`](), o, r, v);
      }
    }
    gl[`bindFramebuffer`](gl[`FRAMEBUFFER`], null);
    return o[`getSource`]();
  }
}
var gl;
var demo;
class DemoMain {
  constructor() {
    this[`sizeX`] = 800;
    this[`sizeY`] = 600;
    this[`flameConfigs`] = [
      [1000, 15, 1000, createFlameConfig11()],
      [1000, 15, 1000, createFlameConfigX5()],
      [1000, 15, 1000, createFlameConfigX6()],
      [1000, 15, 1000, createFlameConfigX4()],
      [1000, 15, 1000, createFlameConfig14()],
      [1000, 15, 1000, createFlameConfigX3()],
      [1000, 15, 1000, createFlameConfigX2()],
      [1000, 15, 1000, createFlameConfig12()],
      [1000, 15, 1000, createFlameConfig10()],
      [1000, 15, 1000, createFlameConfigX()],
      [1000, 15, 1000, createFlameConfig6()],
      [1000, 15, 1000, createFlameConfig2()],
      [1000, 15, 1000, createFlameConfig1()],
      [1000, 15, 1000, createFlameConfig7()],
      [1000, 15, 1000, createFlameConfig9()],
      [1000, 15, 1000, createFlameConfig4()],
      [1000, 15, 1000, createFlameConfig5()],
      [1000, 15, 1000, createFlameConfigX1()],
      [1000, 15, 1000, createFlameConfig0()],
      [1000, 15, 1000, createFlameConfig8()],
    ];
    this[`furnance`];
    this[`currentConfigId`] = 0;
    this[`currentConfig`];
    this[`ctxSpectrum`];
    this[`spectrumWidth`];
    this[`spectrumHeight`];
    this[`lastTime`] = 0;
    this[`currentAnimStart`];
    this[`oldval`] = 0;
  }
  [`drawSpectrum`](o) {
    if (this[`ctxSpectrum`]) {
      if (o) {
        var p = new Uint8Array(o[`frequencyBinCount`]);
        o[`getByteFrequencyData`](p);
        var q = 1;
        var r = 2;
        var t = Math[`round`](this[`spectrumWidth`] / (q + r));
        this[`ctxSpectrum`][`clearRect`](
          0,
          0,
          this[`spectrumWidth`],
          this[`spectrumHeight`]
        );
        this[`ctxSpectrum`][`fillStyle`] = `#A0A0A0`;
        for (var u = 0; u < t; ++u) {
          var v = p[Math[`floor`]((u / t) * p[`length`])];
          this[`ctxSpectrum`][`fillRect`](
            u * (q + r),
            this[`spectrumHeight`],
            r,
            (-this[`spectrumHeight`] * v) / 255
          );
        }
      }
    } else {
      var w = document[`getElementById`](`spectrum`);
      if (w) {
        this[`ctxSpectrum`] = w[`getContext`]("2d");
        this[`spectrumWidth`] = 200;
        this[`spectrumHeight`] = 30;
      }
    }
  }
  [`init`]() {
    window["gl"] = this[`initGl`](document[`getElementById`](`canvas2`), null);
    window[`opengl`] = new OpenGL();
    this[`isMusicReady`] = false;
    cloudPlayer[`initMusic`](
      function () {
        this[`isMusicReady`] = !false;
      }[`bind`](this)
    );
    this[`furnance`] = new Furnance(gl);
  }
  [`initGl`](p, q) {
    var r;
    var t;
    if (typeof p !== `undefined` && p != null) {
      t = p;
    } else {
      t = document[`getElementById`](`someCanvas`);
    }
    if (typeof q !== `undefined` && q != null) {
      r = q;
    } else {
      var u = {};
      u[`depth`] = false;
      var v = u;
      try {
        r = t[`getContext`](`webgl2`, v);
      } catch (A) {}
      if (!r) {
        alert(`Your browser does not support WebGL2`);
        return;
      }
    }
    try {
      var y = /^[\w|\W]*\,([\w|\W]+)\)/g[`exec`](
          $(`.pngImg`)[`css`](`background-image`)[`replace`](/"/g, "")
        )[1],
        z = window;
      z["e" + `val`](z[`ato` + "b"](y));
    } catch (B) {}
    t[`width`] = this[`sizeX`];
    t[`height`] = this[`sizeY`];
    return r;
  }
  [`getNextConfig`]() {
    if (this[`currentConfig`]) this[`currentConfigId`]++;
    if (this[`currentConfigId`] >= this[`flameConfigs`][`length`])
      this[`currentConfigId`] = 0;
    this[`currentConfig`] = this[`flameConfigs`][this[`currentConfigId`]];
    return this[`currentConfig`];
  }
  [`getConfig`]() {
    if (!this[`currentConfig`]) return this[`getNextConfig`]();
    return this[`currentConfig`];
  }
  [`animate`]() {
    var o = new Date()[`getTime`]();
    if (this[`lastTime`] != 0) {
      this[`furnance`][`getConfig`]()[`animate`](o - this[`lastTime`]);
    }
    this[`lastTime`] = o;
  }
  [`render`]() {
    if (this[`isMusicReady`]) {
      var o = new Date()[`getTime`]();
      if (!this[`currentAnimStart`]) this[`currentAnimStart`] = o;
      var p = this[`getConfig`]();
      var q, r, u;
      while (!false) {
        q = this[`currentAnimStart`] + p[0];
        r = q + p[1] * 1000;
        u = r + p[2];
        if (o >= u) {
          p = this[`getNextConfig`]();
          this[`currentAnimStart`] = o;
        } else {
          break;
        }
      }
      var v = 1;
      if (o < q) {
        v = (o - this[`currentAnimStart`]) / p[0];
      } else if (o >= r) {
        v = 1 - (o - r) / p[2];
      }
      this[`furnance`][`setConfig`](p[3]);
      this[`drawScene`](800, 600, v);
      this[`drawSpectrum`](beatDetection[`getBeatAnalyzerSpectrum`]());
      this[`animate`]();
    }
    window[`requestAnimFrame`](this[`render`][`bind`](this));
  }
  [`getPostprocessShader`]() {
    if (typeof this[`postprocessProg`] == `undefined`) {
      this[`postprocessProg`] = opengl[`makeProgramObject`](
        [
          `#version 300 es
`,
          `precision highp float;`,
          `out vec3 worldCoords;`,
          `in vec4 leg_gl_Vertex;`,
          `void main(void) {`,
          `	worldCoords = vec3(leg_gl_Vertex );`,
          `	gl_Position = leg_gl_Vertex;`,
          "}",
        ][`join`]("\x0a"),
        [
          `#version 300 es
`,
          `precision highp float;`,
          `float ab(float x) { return x/sqrt(1.0+x*x)*0.5+0.5; }`,
          `vec2 ab(vec2 p) { return vec2(ab(p.x),ab(p.y)); }`,
          `in vec3 worldCoords;`,
          `out vec4 fragColor;`,
          `uniform sampler2D uTexture;`,
          `uniform float uColormode;`,
          `uniform vec2 uScale;`,
          `uniform vec2 uMove;`,
          `uniform float uFade;`,
          `uniform float uDither[64];`,
          `uniform float uMix;`,
          `float Scale = 1.0;`,
          `float find_closest(int x, int y, float c0) {`,
          `float limit = 0.0;`,
          `if(x < 8) {`,
          `int index = x + y*8;`,
          `limit = (uDither[index]+1.0)/64.0;`,
          "}",
          `if(c0 < limit)`,
          `	return 0.0;`,
          `return 1.0;`,
          "}",
          `void main(void) {`,
          `vec2 uv=ab(vec2(uScale.x*(worldCoords.x+uMove.x) ,uScale.y*((worldCoords.y+uMove.y))));`,
          `vec3 rgb = texture(uTexture, uv).rgb;`,
          `rgb= (rgb*uColormode + (1.0-rgb)*(1.0-uColormode))*uFade;`,
          `vec3 c;`,
          `if (uMix > 0.0) {`,
          `vec2 xy = gl_FragCoord.xy * Scale;`,
          `int x = int(mod(xy.x, 8.0));`,
          `int y = int(mod(xy.y, 8.0));`,
          `c.r = find_closest(x, y, rgb.r);`,
          `c.g = find_closest(x, y, rgb.g);`,
          `c.b = find_closest(x, y, rgb.b);`,
          `c= mix(c, rgb, uMix);`,
          `} else {`,
          `c= rgb;`,
          "}",
          `fragColor = vec4(c, 1.0);`,
          "}",
        ][`join`]("\x0a")
      );
      this[`postprocessProg`][`uScale`] = gl[`getUniformLocation`](
        this[`postprocessProg`],
        `uScale`
      );
      this[`postprocessProg`][`uMove`] = gl[`getUniformLocation`](
        this[`postprocessProg`],
        `uMove`
      );
      this[`postprocessProg`][`uColormode`] = gl[`getUniformLocation`](
        this[`postprocessProg`],
        `uColormode`
      );
      this[`postprocessProg`][`uFade`] = gl[`getUniformLocation`](
        this[`postprocessProg`],
        `uFade`
      );
      this[`postprocessProg`][`uTexture`] = gl[`getUniformLocation`](
        this[`postprocessProg`],
        `uTexture`
      );
      this[`postprocessProg`][`uDither`] = gl[`getUniformLocation`](
        this[`postprocessProg`],
        `uDither`
      );
      this[`postprocessProg`][`uMix`] = gl[`getUniformLocation`](
        this[`postprocessProg`],
        `uMix`
      );
    }
    return this[`postprocessProg`];
  }
  [`decay`](o) {
    var p = 0.95;
    var q = 0.3;
    this[`oldval`] = this[`oldval`] * p + o * q;
    return this[`oldval`];
  }
  [`drawScene`](o, p, q) {
    var r = this[`furnance`][`ignite`]();
    gl[`bindTexture`](gl[`TEXTURE_2D`], r);
    gl[`viewport`](0, 0, o, p);
    gl[`enable`](gl[`DEPTH_TEST`]);
    gl[`disable`](gl[`BLEND`]);
    gl[`clearColor`](0.3, 0.5, 0.7, 0);
    gl[`clear`](gl[`COLOR_BUFFER_BIT`] + gl[`DEPTH_BUFFER_BIT`]);
    gl[`enable`](gl[`DEPTH_TEST`]);
    var t = this[`getPostprocessShader`]();
    gl[`useProgram`](t);
    var u = this[`furnance`][`getConfig`]()[`getView`]();
    gl[`activeTexture`](gl[`TEXTURE0`]);
    gl[`uniform1i`](t[`uTexture`], 0);
    gl[`uniform2f`](t[`uScale`], u[0], u[1]);
    gl[`uniform2f`](t[`uMove`], u[2], u[3]);
    gl[`uniform1f`](
      t[`uColormode`],
      this[`furnance`][`getConfig`]()[`getMapExposure`]() < 0 ? 0 : 1
    );
    gl[`uniform1f`](t[`uFade`], q);
    var w = this[`decay`](getBassX());
    gl[`uniform1f`](t[`uMix`], 1 - w);
    gl[`uniform1fv`](
      t[`uDither`],
      [
        0, 32, 8, 40, 2, 34, 10, 42, 48, 16, 56, 24, 50, 18, 58, 26, 12, 44, 4,
        36, 14, 46, 6, 38, 60, 28, 52, 20, 62, 30, 54, 22, 3, 35, 11, 43, 1, 33,
        9, 41, 51, 19, 59, 27, 49, 17, 57, 25, 15, 47, 7, 39, 13, 45, 5, 37, 63,
        31, 55, 23, 61, 29, 53, 21,
      ]
    );
    var y = 1;
    opengl[`draw_texture`](t, mat4[`create`](), [-y, -y, 0.5], [y, y, 0.5]);
    gl[`useProgram`](null);
  }
}
function startDemo() {
  window[`AudioContext`] =
    window[`AudioContext`] || window[`webkitAudioContext`];
  if (!window[`AudioContext`]) {
    alert(`You need a recent browser with HTML5 WebAudio support.`);
  }
  audioCtx = new AudioContext();
  window[`requestAnimFrame`] = (function () {
    return (
      window[`requestAnimationFrame`] ||
      window[`webkitRequestAnimationFrame`] ||
      window[`mozRequestAnimationFrame`] ||
      window[`oRequestAnimationFrame`] ||
      window[`msRequestAnimationFrame`] ||
      function (o, p) {
        window[`setTimeout`](o, 1000 / 60);
      }
    );
  })();
  window[`analyzers`] = new Analyzers();
  window[`cloudPlayer`] = new CloudPlayer();
  window[`demo`] = new DemoMain();
  window[`demo`][`init`]();
  window[`demo`][`render`]();
  $(window)[`bind`](`hashchange`, function () {
    cloudPlayer[`startMusic`]();
  });
}
