#version 300 es
precision highp float;

in vec2 v_texcoord;

out vec4 outColor;

uniform float iTime;
uniform vec2 iResolution;

// ====================== Shadertoy Code ======================
// Source: https://www.shadertoy.com/view/XsXXDn
// If you intend to reuse this shader, please add credits to 'Danilo Guanabara'
#define t iTime
#define r iResolution.xy
void mainImage( out vec4 fragColor, in vec2 fragCoord ){
	vec3 c;
	float l,z=t;
	for(int i=0;i<3;i++) {
		vec2 uv,p=fragCoord.xy/r;
		uv=p;
		p-=.5;
		p.x*=r.x/r.y;
		z+=.07;
		l=length(p);
		uv+=p/l*(sin(z)+1.)*abs(sin(l*9.-z-z));
		c[i]=.01/length(mod(uv,1.)-.5);
	}
	fragColor=vec4(c/l,t);
}
// ============================================================

void main() {
    vec2 uv = v_texcoord;
    outColor = vec4(0.0, 0.0, 0.0, 1.0);
    mainImage(outColor, uv * iResolution);
}