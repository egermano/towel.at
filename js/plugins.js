window.log = function f(){ log.history = log.history || []; log.history.push(arguments); if(this.console) { var args = arguments, newarr; args.callee = args.callee.caller; newarr = [].slice.call(args); if (typeof console.log === 'object') log.apply.call(console.log, console, newarr); else console.log.apply(console, newarr);}};
(function(a){function b(){}for(var c="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),d;!!(d=c.pop());){a[d]=a[d]||b;}})
(function(){try{console.log();return window.console;}catch(a){return (window.console={});}}());


//glMatrix
typeof Float32Array!="undefined"?glMatrixArrayType=Float32Array:typeof WebGLFloatArray!="undefined"?glMatrixArrayType=WebGLFloatArray:glMatrixArrayType=Array;var mat4={},vec3={};vec3.create=function(a){var b=new glMatrixArrayType(3);return a&&(b[0]=a[0],b[1]=a[1],b[2]=a[2]),b},vec3.set=function(a,b){return b[0]=a[0],b[1]=a[1],b[2]=a[2],b},vec3.add=function(a,b,c){return!c||a==c?(a[0]+=b[0],a[1]+=b[1],a[2]+=b[2],a):(c[0]=a[0]+b[0],c[1]=a[1]+b[1],c[2]=a[2]+b[2],c)},vec3.subtract=function(a,b,c){return!c||a==c?(a[0]-=b[0],a[1]-=b[1],a[2]-=b[2],a):(c[0]=a[0]-b[0],c[1]=a[1]-b[1],c[2]=a[2]-b[2],c)},vec3.negate=function(a,b){return b||(b=a),b[0]=-a[0],b[1]=-a[1],b[2]=-a[2],b},vec3.scale=function(a,b,c){return!c||a==c?(a[0]*=b,a[1]*=b,a[2]*=b,a):(c[0]=a[0]*b,c[1]=a[1]*b,c[2]=a[2]*b,c)},vec3.normalize=function(a,b){b||(b=a);var c=a[0],d=a[1],e=a[2],f=Math.sqrt(c*c+d*d+e*e);return f?f==1?(b[0]=c,b[1]=d,b[2]=e,b):(f=1/f,b[0]=c*f,b[1]=d*f,b[2]=e*f,b):(b[0]=0,b[1]=0,b[2]=0,b)},vec3.cross=function(a,b,c){c||(c=a);var d=a[0],e=a[1],f=a[2],g=b[0],h=b[1],i=b[2];return c[0]=e*i-f*h,c[1]=f*g-d*i,c[2]=d*h-e*g,c},vec3.length=function(a){var b=a[0],c=a[1],d=a[2];return Math.sqrt(b*b+c*c+d*d)},vec3.dot=function(a,b){return a[0]*b[0]+a[1]*b[1]+a[2]*b[2]},vec3.direction=function(a,b,c){c||(c=a);var d=a[0]-b[0],e=a[1]-b[1],f=a[2]-b[2],g=Math.sqrt(d*d+e*e+f*f);return g?(g=1/g,c[0]=d*g,c[1]=e*g,c[2]=f*g,c):(c[0]=0,c[1]=0,c[2]=0,c)},vec3.str=function(a){return"["+a[0]+", "+a[1]+", "+a[2]+"]"};var mat3={};mat3.create=function(a){var b=new glMatrixArrayType(9);return a&&(b[0]=a[0],b[1]=a[1],b[2]=a[2],b[3]=a[3],b[4]=a[4],b[5]=a[5],b[6]=a[6],b[7]=a[7],b[8]=a[8],b[9]=a[9]),b},mat3.set=function(a,b){return b[0]=a[0],b[1]=a[1],b[2]=a[2],b[3]=a[3],b[4]=a[4],b[5]=a[5],b[6]=a[6],b[7]=a[7],b[8]=a[8],b},mat3.identity=function(a){return a[0]=1,a[1]=0,a[2]=0,a[3]=0,a[4]=1,a[5]=0,a[6]=0,a[7]=0,a[8]=1,a},mat3.toMat4=function(a,b){return b||(b=mat4.create()),b[0]=a[0],b[1]=a[1],b[2]=a[2],b[3]=0,b[4]=a[3],b[5]=a[4],b[6]=a[5],b[7]=0,b[8]=a[6],b[9]=a[7],b[10]=a[8],b[11]=0,b[12]=0,b[13]=0,b[14]=0,b[15]=1,b},mat3.str=function(a){return"["+a[0]+", "+a[1]+", "+a[2]+", "+a[3]+", "+a[4]+", "+a[5]+", "+a[6]+", "+a[7]+", "+a[8]+"]"},mat4.create=function(a){var b=new glMatrixArrayType(16);return a&&(b[0]=a[0],b[1]=a[1],b[2]=a[2],b[3]=a[3],b[4]=a[4],b[5]=a[5],b[6]=a[6],b[7]=a[7],b[8]=a[8],b[9]=a[9],b[10]=a[10],b[11]=a[11],b[12]=a[12],b[13]=a[13],b[14]=a[14],b[15]=a[15]),b},mat4.set=function(a,b){return b[0]=a[0],b[1]=a[1],b[2]=a[2],b[3]=a[3],b[4]=a[4],b[5]=a[5],b[6]=a[6],b[7]=a[7],b[8]=a[8],b[9]=a[9],b[10]=a[10],b[11]=a[11],b[12]=a[12],b[13]=a[13],b[14]=a[14],b[15]=a[15],b},mat4.identity=function(a){return a[0]=1,a[1]=0,a[2]=0,a[3]=0,a[4]=0,a[5]=1,a[6]=0,a[7]=0,a[8]=0,a[9]=0,a[10]=1,a[11]=0,a[12]=0,a[13]=0,a[14]=0,a[15]=1,a},mat4.transpose=function(a,b){if(!b||a==b){var c=a[1],d=a[2],e=a[3],f=a[6],g=a[7],h=a[11];return a[1]=a[4],a[2]=a[8],a[3]=a[12],a[4]=c,a[6]=a[9],a[7]=a[13],a[8]=d,a[9]=f,a[11]=a[14],a[12]=e,a[13]=g,a[14]=h,a}return b[0]=a[0],b[1]=a[4],b[2]=a[8],b[3]=a[12],b[4]=a[1],b[5]=a[5],b[6]=a[9],b[7]=a[13],b[8]=a[2],b[9]=a[6],b[10]=a[10],b[11]=a[14],b[12]=a[3],b[13]=a[7],b[14]=a[11],b[15]=a[15],b},mat4.determinant=function(a){var b=a[0],c=a[1],d=a[2],e=a[3],f=a[4],g=a[5],h=a[6],i=a[7],j=a[8],k=a[9],l=a[10],m=a[11],n=a[12],o=a[13],p=a[14],q=a[15];return n*k*h*e-j*o*h*e-n*g*l*e+f*o*l*e+j*g*p*e-f*k*p*e-n*k*d*i+j*o*d*i+n*c*l*i-b*o*l*i-j*c*p*i+b*k*p*i+n*g*d*m-f*o*d*m-n*c*h*m+b*o*h*m+f*c*p*m-b*g*p*m-j*g*d*q+f*k*d*q+j*c*h*q-b*k*h*q-f*c*l*q+b*g*l*q},mat4.inverse=function(a,b){b||(b=a);var c=a[0],d=a[1],e=a[2],f=a[3],g=a[4],h=a[5],i=a[6],j=a[7],k=a[8],l=a[9],m=a[10],n=a[11],o=a[12],p=a[13],q=a[14],r=a[15],s=c*h-d*g,t=c*i-e*g,u=c*j-f*g,v=d*i-e*h,w=d*j-f*h,x=e*j-f*i,y=k*p-l*o,z=k*q-m*o,A=k*r-n*o,B=l*q-m*p,C=l*r-n*p,D=m*r-n*q,E=1/(s*D-t*C+u*B+v*A-w*z+x*y);return b[0]=(h*D-i*C+j*B)*E,b[1]=(-d*D+e*C-f*B)*E,b[2]=(p*x-q*w+r*v)*E,b[3]=(-l*x+m*w-n*v)*E,b[4]=(-g*D+i*A-j*z)*E,b[5]=(c*D-e*A+f*z)*E,b[6]=(-o*x+q*u-r*t)*E,b[7]=(k*x-m*u+n*t)*E,b[8]=(g*C-h*A+j*y)*E,b[9]=(-c*C+d*A-f*y)*E,b[10]=(o*w-p*u+r*s)*E,b[11]=(-k*w+l*u-n*s)*E,b[12]=(-g*B+h*z-i*y)*E,b[13]=(c*B-d*z+e*y)*E,b[14]=(-o*v+p*t-q*s)*E,b[15]=(k*v-l*t+m*s)*E,b},mat4.toRotationMat=function(a,b){return b||(b=mat4.create()),b[0]=a[0],b[1]=a[1],b[2]=a[2],b[3]=a[3],b[4]=a[4],b[5]=a[5],b[6]=a[6],b[7]=a[7],b[8]=a[8],b[9]=a[9],b[10]=a[10],b[11]=a[11],b[12]=0,b[13]=0,b[14]=0,b[15]=1,b},mat4.toMat3=function(a,b){return b||(b=mat3.create()),b[0]=a[0],b[1]=a[1],b[2]=a[2],b[3]=a[4],b[4]=a[5],b[5]=a[6],b[6]=a[8],b[7]=a[9],b[8]=a[10],b},mat4.toInverseMat3=function(a,b){var c=a[0],d=a[1],e=a[2],f=a[4],g=a[5],h=a[6],i=a[8],j=a[9],k=a[10],l=k*g-h*j,m=-k*f+h*i,n=j*f-g*i,o=c*l+d*m+e*n;if(!o)return null;var p=1/o;return b||(b=mat3.create()),b[0]=l*p,b[1]=(-k*d+e*j)*p,b[2]=(h*d-e*g)*p,b[3]=m*p,b[4]=(k*c-e*i)*p,b[5]=(-h*c+e*f)*p,b[6]=n*p,b[7]=(-j*c+d*i)*p,b[8]=(g*c-d*f)*p,b},mat4.multiply=function(a,b,c){c||(c=a);var d=a[0],e=a[1],f=a[2],g=a[3],h=a[4],i=a[5],j=a[6],k=a[7],l=a[8],m=a[9],n=a[10],o=a[11],p=a[12],q=a[13],r=a[14],s=a[15],t=b[0],u=b[1],v=b[2],w=b[3],x=b[4],y=b[5],z=b[6],A=b[7],B=b[8],C=b[9],D=b[10],E=b[11],F=b[12],G=b[13],H=b[14],I=b[15];return c[0]=t*d+u*h+v*l+w*p,c[1]=t*e+u*i+v*m+w*q,c[2]=t*f+u*j+v*n+w*r,c[3]=t*g+u*k+v*o+w*s,c[4]=x*d+y*h+z*l+A*p,c[5]=x*e+y*i+z*m+A*q,c[6]=x*f+y*j+z*n+A*r,c[7]=x*g+y*k+z*o+A*s,c[8]=B*d+C*h+D*l+E*p,c[9]=B*e+C*i+D*m+E*q,c[10]=B*f+C*j+D*n+E*r,c[11]=B*g+C*k+D*o+E*s,c[12]=F*d+G*h+H*l+I*p,c[13]=F*e+G*i+H*m+I*q,c[14]=F*f+G*j+H*n+I*r,c[15]=F*g+G*k+H*o+I*s,c},mat4.multiplyVec3=function(a,b,c){c||(c=b);var d=b[0],e=b[1],f=b[2];return c[0]=a[0]*d+a[4]*e+a[8]*f+a[12],c[1]=a[1]*d+a[5]*e+a[9]*f+a[13],c[2]=a[2]*d+a[6]*e+a[10]*f+a[14],c},mat4.multiplyVec4=function(a,b,c){c||(c=b);var d=b[0],e=b[1],f=b[2],g=b[3];return c[0]=a[0]*d+a[4]*e+a[8]*f+a[12]*g,c[1]=a[1]*d+a[5]*e+a[9]*f+a[13]*g,c[2]=a[2]*d+a[6]*e+a[10]*f+a[14]*g,c[4]=a[4]*d+a[7]*e+a[11]*f+a[15]*g,c},mat4.translate=function(a,b,c){var d=b[0],e=b[1],f=b[2];if(!c||a==c)return a[12]=a[0]*d+a[4]*e+a[8]*f+a[12],a[13]=a[1]*d+a[5]*e+a[9]*f+a[13],a[14]=a[2]*d+a[6]*e+a[10]*f+a[14],a[15]=a[3]*d+a[7]*e+a[11]*f+a[15],a;var g=a[0],h=a[1],i=a[2],j=a[3],k=a[4],l=a[5],m=a[6],n=a[7],o=a[8],p=a[9],q=a[10],r=a[11];return c[0]=g,c[1]=h,c[2]=i,c[3]=j,c[4]=k,c[5]=l,c[6]=m,c[7]=n,c[8]=o,c[9]=p,c[10]=q,c[11]=r,c[12]=g*d+k*e+o*f+a[12],c[13]=h*d+l*e+p*f+a[13],c[14]=i*d+m*e+q*f+a[14],c[15]=j*d+n*e+r*f+a[15],c},mat4.scale=function(a,b,c){var d=b[0],e=b[1],f=b[2];return!c||a==c?(a[0]*=d,a[1]*=d,a[2]*=d,a[3]*=d,a[4]*=e,a[5]*=e,a[6]*=e,a[7]*=e,a[8]*=f,a[9]*=f,a[10]*=f,a[11]*=f,a):(c[0]=a[0]*d,c[1]=a[1]*d,c[2]=a[2]*d,c[3]=a[3]*d,c[4]=a[4]*e,c[5]=a[5]*e,c[6]=a[6]*e,c[7]=a[7]*e,c[8]=a[8]*f,c[9]=a[9]*f,c[10]=a[10]*f,c[11]=a[11]*f,c[12]=a[12],c[13]=a[13],c[14]=a[14],c[15]=a[15],c)},mat4.rotate=function(a,b,c,d){var e=c[0],f=c[1],g=c[2],h=Math.sqrt(e*e+f*f+g*g);if(!h)return null;h!=1&&(h=1/h,e*=h,f*=h,g*=h);var i=Math.sin(b),j=Math.cos(b),k=1-j,l=a[0],m=a[1],n=a[2],o=a[3],p=a[4],q=a[5],r=a[6],s=a[7],t=a[8],u=a[9],v=a[10],w=a[11],x=e*e*k+j,y=f*e*k+g*i,z=g*e*k-f*i,A=e*f*k-g*i,B=f*f*k+j,C=g*f*k+e*i,D=e*g*k+f*i,E=f*g*k-e*i,F=g*g*k+j;return d?a!=d&&(d[12]=a[12],d[13]=a[13],d[14]=a[14],d[15]=a[15]):d=a,d[0]=l*x+p*y+t*z,d[1]=m*x+q*y+u*z,d[2]=n*x+r*y+v*z,d[3]=o*x+s*y+w*z,d[4]=l*A+p*B+t*C,d[5]=m*A+q*B+u*C,d[6]=n*A+r*B+v*C,d[7]=o*A+s*B+w*C,d[8]=l*D+p*E+t*F,d[9]=m*D+q*E+u*F,d[10]=n*D+r*E+v*F,d[11]=o*D+s*E+w*F,d},mat4.rotateX=function(a,b,c){var d=Math.sin(b),e=Math.cos(b),f=a[4],g=a[5],h=a[6],i=a[7],j=a[8],k=a[9],l=a[10],m=a[11];return c?a!=c&&(c[0]=a[0],c[1]=a[1],c[2]=a[2],c[3]=a[3],c[12]=a[12],c[13]=a[13],c[14]=a[14],c[15]=a[15]):c=a,c[4]=f*e+j*d,c[5]=g*e+k*d,c[6]=h*e+l*d,c[7]=i*e+m*d,c[8]=f*-d+j*e,c[9]=g*-d+k*e,c[10]=h*-d+l*e,c[11]=i*-d+m*e,c},mat4.rotateY=function(a,b,c){var d=Math.sin(b),e=Math.cos(b),f=a[0],g=a[1],h=a[2],i=a[3],j=a[8],k=a[9],l=a[10],m=a[11];return c?a!=c&&(c[4]=a[4],c[5]=a[5],c[6]=a[6],c[7]=a[7],c[12]=a[12],c[13]=a[13],c[14]=a[14],c[15]=a[15]):c=a,c[0]=f*e+j*-d,c[1]=g*e+k*-d,c[2]=h*e+l*-d,c[3]=i*e+m*-d,c[8]=f*d+j*e,c[9]=g*d+k*e,c[10]=h*d+l*e,c[11]=i*d+m*e,c},mat4.rotateZ=function(a,b,c){var d=Math.sin(b),e=Math.cos(b),f=a[0],g=a[1],h=a[2],i=a[3],j=a[4],k=a[5],l=a[6],m=a[7];return c?a!=c&&(c[8]=a[8],c[9]=a[9],c[10]=a[10],c[11]=a[11],c[12]=a[12],c[13]=a[13],c[14]=a[14],c[15]=a[15]):c=a,c[0]=f*e+j*d,c[1]=g*e+k*d,c[2]=h*e+l*d,c[3]=i*e+m*d,c[4]=f*-d+j*e,c[5]=g*-d+k*e,c[6]=h*-d+l*e,c[7]=i*-d+m*e,c},mat4.frustum=function(a,b,c,d,e,f,g){g||(g=mat4.create());var h=b-a,i=d-c,j=f-e;return g[0]=e*2/h,g[1]=0,g[2]=0,g[3]=0,g[4]=0,g[5]=e*2/i,g[6]=0,g[7]=0,g[8]=(b+a)/h,g[9]=(d+c)/i,g[10]=-(f+e)/j,g[11]=-1,g[12]=0,g[13]=0,g[14]=-(f*e*2)/j,g[15]=0,g},mat4.perspective=function(a,b,c,d,e){var f=c*Math.tan(a*Math.PI/360),g=f*b;return mat4.frustum(-g,g,-f,f,c,d,e)},mat4.ortho=function(a,b,c,d,e,f,g){g||(g=mat4.create());var h=b-a,i=d-c,j=f-e;return g[0]=2/h,g[1]=0,g[2]=0,g[3]=0,g[4]=0,g[5]=2/i,g[6]=0,g[7]=0,g[8]=0,g[9]=0,g[10]=-2/j,g[11]=0,g[12]=-(a+b)/h,g[13]=-(d+c)/i,g[14]=-(f+e)/j,g[15]=1,g},mat4.lookAt=function(a,b,c,d){d||(d=mat4.create());var e=a[0],f=a[1],g=a[2],h=c[0],i=c[1],j=c[2],k=b[0],l=b[1],m=b[2];if(e==k&&f==l&&g==m)return mat4.identity(d);var n,o,p,q,r,s,t,u,v,w;return n=e-b[0],o=f-b[1],p=g-b[2],w=1/Math.sqrt(n*n+o*o+p*p),n*=w,o*=w,p*=w,q=i*p-j*o,r=j*n-h*p,s=h*o-i*n,w=Math.sqrt(q*q+r*r+s*s),w?(w=1/w,q*=w,r*=w,s*=w):(q=0,r=0,s=0),t=o*s-p*r,u=p*q-n*s,v=n*r-o*q,w=Math.sqrt(t*t+u*u+v*v),w?(w=1/w,t*=w,u*=w,v*=w):(t=0,u=0,v=0),d[0]=q,d[1]=t,d[2]=n,d[3]=0,d[4]=r,d[5]=u,d[6]=o,d[7]=0,d[8]=s,d[9]=v,d[10]=p,d[11]=0,d[12]=-(q*e+r*f+s*g),d[13]=-(t*e+u*f+v*g),d[14]=-(n*e+o*f+p*g),d[15]=1,d},mat4.str=function(a){return"["+a[0]+", "+a[1]+", "+a[2]+", "+a[3]+", "+a[4]+", "+a[5]+", "+a[6]+", "+a[7]+", "+a[8]+", "+a[9]+", "+a[10]+", "+a[11]+", "+a[12]+", "+a[13]+", "+a[14]+", "+a[15]+"]"},quat4={},quat4.create=function(a){var b=new glMatrixArrayType(4);return a&&(b[0]=a[0],b[1]=a[1],b[2]=a[2],b[3]=a[3]),b},quat4.set=function(a,b){return b[0]=a[0],b[1]=a[1],b[2]=a[2],b[3]=a[3],b},quat4.calculateW=function(a,b){var c=a[0],d=a[1],e=a[2];return!b||a==b?(a[3]=-Math.sqrt(Math.abs(1-c*c-d*d-e*e)),a):(b[0]=c,b[1]=d,b[2]=e,b[3]=-Math.sqrt(Math.abs(1-c*c-d*d-e*e)),b)},quat4.inverse=function(a,b){return!b||a==b?(a[0]*=1,a[1]*=1,a[2]*=1,a):(b[0]=-a[0],b[1]=-a[1],b[2]=-a[2],b[3]=a[3],b)},quat4.length=function(a){var b=a[0],c=a[1],d=a[2],e=a[3];return Math.sqrt(b*b+c*c+d*d+e*e)},quat4.normalize=function(a,b){b||(b=a);var c=a[0],d=a[1],e=a[2],f=a[3],g=Math.sqrt(c*c+d*d+e*e+f*f);return g===0?(b[0]=0,b[1]=0,b[2]=0,b[3]=0,b):(g=1/g,b[0]=c*g,b[1]=d*g,b[2]=e*g,b[3]=f*g,b)},quat4.multiply=function(a,b,c){c||(c=a);var d=a[0],e=a[1],f=a[2],g=a[3],h=b[0],i=b[1],j=b[2],k=b[3];return c[0]=d*k+g*h+e*j-f*i,c[1]=e*k+g*i+f*h-d*j,c[2]=f*k+g*j+d*i-e*h,c[3]=g*k-d*h-e*i-f*j,c},quat4.multiplyVec3=function(a,b,c){c||(c=b);var d=b[0],e=b[1],f=b[2],g=a[0],h=a[1],i=a[2],j=a[3],k=j*d+h*f-i*e,l=j*e+i*d-g*f,m=j*f+g*e-h*d,n=-g*d-h*e-i*f;return c[0]=k*j+n*-g+l*-i-m*-h,c[1]=l*j+n*-h+m*-g-k*-i,c[2]=m*j+n*-i+k*-h-l*-g,c},quat4.toMat3=function(a,b){b||(b=mat3.create());var c=a[0],d=a[1],e=a[2],f=a[3],g=c+c,h=d+d,i=e+e,j=c*g,k=c*h,l=c*i,m=d*h,n=d*i,o=e*i,p=f*g,q=f*h,r=f*i;return b[0]=1-(m+o),b[1]=k-r,b[2]=l+q,b[3]=k+r,b[4]=1-(j+o),b[5]=n-p,b[6]=l-q,b[7]=n+p,b[8]=1-(j+m),b},quat4.toMat4=function(a,b){b||(b=mat4.create());var c=a[0],d=a[1],e=a[2],f=a[3],g=c+c,h=d+d,i=e+e,j=c*g,k=c*h,l=c*i,m=d*h,n=d*i,o=e*i,p=f*g,q=f*h,r=f*i;return b[0]=1-(m+o),b[1]=k-r,b[2]=l+q,b[3]=0,b[4]=k+r,b[5]=1-(j+o),b[6]=n-p,b[7]=0,b[8]=l-q,b[9]=n+p,b[10]=1-(j+m),b[11]=0,b[12]=0,b[13]=0,b[14]=0,b[15]=1,b},quat4.str=function(a){return"["+a[0]+", "+a[1]+", "+a[2]+", "+a[3]+"]"}
