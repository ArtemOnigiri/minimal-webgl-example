const cnv = document.getElementById('cnv');
const gl = cnv.getContext('webgl2');
const width = window.innerWidth * window.devicePixelRatio;
const height = window.innerHeight * window.devicePixelRatio;

const POSITIONS = [0, 0, 1, 0, 0.5, 1];

const compileShader = (vertexCode, fragmentCode) => {
  const vertex = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertex, vertexCode);
  gl.compileShader(vertex);
  const fragment = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragment, fragmentCode);
  gl.compileShader(fragment);
  const fragmentLog = gl.getShaderInfoLog(fragment);
  if (fragmentLog !== null && fragmentLog !== '') {
    console.log(fragmentLog);
  }
  const program = gl.createProgram();
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);
  return program;
};

const loadShader = async (fragmentPath, vertexPath) => {
  const fragmentRes = await fetch(fragmentPath);
  const fragmentCode = await fragmentRes.text();
  const vertexRes = await fetch(vertexPath);
  const vertexCode = await vertexRes.text();
  const program = compileShader(vertexCode, fragmentCode);
  return program;
};

const initShader = (shader) => {
  gl.useProgram(shader);
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(POSITIONS), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(shader, 'a_position');
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
};

const draw = () => {
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
};

const init = async () => {
  cnv.width = width;
  cnv.height = height;
  const shader = await loadShader('./shaders/fragment.glsl', './shaders/vertex.glsl');
  initShader(shader);
  gl.viewport(0, 0, width, height);
  draw();
};

init();