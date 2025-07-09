#version 300 es
precision highp float;

in vec2 v_texcoord;

out vec4 outColor;

void main() {
    vec2 uv = v_texcoord;
    outColor = vec4(uv, 1.0, 1.0);
}