#version 300 es

in vec2 a_position;

out vec2 v_texcoord;

void main() {
    v_texcoord = a_position;
    vec2 uv = a_position * 2.0 - 1.0;
    gl_Position = vec4(uv, 0.0, 1.0);
}