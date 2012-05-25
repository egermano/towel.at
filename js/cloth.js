/*
    Implementation of classical inheritance. I use the defineProperty method on the
    Object.prototype in order to make it non-enumerable. If set directly it breaks all
    the "for( i in obj )" loops
*/
Object.defineProperty( Function.prototype, "extend", {
    value: function( base ) {
        if ( !base ) {
            throw new Error( 'Base constructor is undefined' );
        }

        var child = this;

        return function () {
            base.apply( this );

            this.parent = {};
            for ( var i in this ) {
                if( typeof this[ i ] === "function" ) {
                    this.parent[ i ] = this[ i ].bind( this );
                }
            }

            child.apply( this, arguments );
        };
    }
} );






var math = function () {
     var dian3 = {
        dot: function( v1, v2 ) {
            return v1[0]*v2[0] + v1[1]*v2[1] + v1[2]*v2[2];
        },
        cross: function( v1, v2 ) {
            return [ v1[1]*v2[2] - v1[2]*v2[1],
                     v1[2]*v2[0] - v1[0]*v2[2],
                     v1[0]*v2[1] - v1[1]*v2[0] ];
        },
        metro: function( v ) {
            return Math.sqrt( v[0]*v[0] + v[1]*v[1] + v[2]*v[2] );
        },
        metro2: function( v ) {
            return ( v[0]*v[0] + v[1]*v[1] + v[2]*v[2] );
        },
        create: function( x, y ,z ) {
            return [ x, y, z ];
        },
        scale: function( v, k ) {
            return [ k*v[0], k*v[1], k*v[2] ];
        },
        add: function( v1, v2 ) {
            return [ v1[0]+v2[0], v1[1]+v2[1], v1[2]+v2[2] ];
        },
        subtract: function( v1, v2 ) {
            return [ v1[0]-v2[0], v1[1]-v2[1], v1[2]-v2[2] ];
        },
        equals: function( v1, v2 ) {
            return (v1[0]==v2[0] && v1[1]==v2[1] && v1[2]==v2[2] );
        },
        normal: function( v1 ) {
            return dian3.scale( v1, 1/dian3.metro( v1 ) );
        }
    };

    var tetra = {
        create : function ( x, y, z, angle ) {
            var len = Math.sqrt( x*x + y*y + z*z );
            var c = Math.sin( angle/2 );
            return [ Math.cos( angle/2 ), x/len*c, y/len*c, z/len*c ];
        },
        scale: function( v, k ) {
            return [ k*v[0], k*v[1], k*v[2], k*v[3] ];
        },
        cross : function ( q1, q2 ) {
            return [ q1[0]*q2[0] - q1[1]*q2[1] - q1[2]*q2[2] - q1[3]*q2[3] ,
                     q1[0]*q2[1] + q1[1]*q2[0] + q1[2]*q2[3] - q1[3]*q2[2] ,
                     q1[0]*q2[2] - q1[1]*q2[3] + q1[2]*q2[0] + q1[3]*q2[1] ,
                     q1[0]*q2[3] + q1[1]*q2[2] - q1[2]*q2[1] + q1[3]*q2[0] ];
        },
        add : function( q1, q2 ) {
            return [ q1[0]+q2[0], q1[1]+q2[1], q1[2]+q2[2], q1[3]+q2[3] ];
        },
        rotMatrix : function ( q ) {
            var res = [];
            res[0] = 1 - 2*( q[2]*q[2] + q[3]*q[3] );
            res[1] = 2*( q[1]*q[2] + q[3]*q[0] );
            res[2] = 2*( q[1]*q[3] - q[2]*q[0] );
            res[3] = 0;
            res[4] = 2*( q[1]*q[2] - q[3]*q[0] );
            res[5] = 1 - 2*( q[1]*q[1] + q[3]*q[3] );
            res[6] = 2*( q[2]*q[3] + q[1]*q[0] );
            res[7] = 0;
            res[8] = 2*( q[1]*q[3] + q[2]*q[0] );
            res[9] = 2*( q[2]*q[3] - q[1]*q[0] );
            res[10] = 1 - 2*( q[1]*q[1] + q[2]*q[2] );
            res[11] = 0;
            res[12] = 0;
            res[13] = 0;
            res[14] = 0;
            res[15] = 1;
            return res;
        },
        axis : function ( q ) {
            var c = Math.sin( ( Math.acos( q[0] ) ) );
            if ( c == 0 ) {
                return [ 0, 0, -1 ];
            }
            return [ q[1]/c, q[2]/c, q[3]/c ];
        },
        angle : function ( q ) {
            return ( Math.acos( q[0] )*2 );
        },
        rotateX : function ( q, angle ) {
            var b = tetra.create( 1, 0, 0, angle );
            return tetra.cross( q, b );
        },
        rotateY : function ( q, angle ) {
            var b = tetra.create( 0, 1, 0, angle );
            return tetra.cross( q, b );
        },
        rotateZ : function ( q, angle ) {
            var b = tetra.create( 0, 0, 1, angle );
            return tetra.cross( q, b );
        },
        rotate : function ( q, x, y, z, angle ) {
            var len = Math.sqrt( x*x + y*y + z*z );
            var b = tetra.create( x/len, y/len, z/len, angle );
            return tetra.cross( q, b );
        },
        lookAt: function( x, y, z ) {
            var theta, phi, a, b, c, d;
            if ( x == 0 && z == 0 ) {
                if ( y > 0 ) {
                    return [ Math.cos( -Math.PI / 4 ), Math.sin( -Math.PI / 4 ), 0, 0 ];
                }
                return [ Math.cos( Math.PI / 4 ), Math.sin( Math.PI / 4 ), 0, 0 ];
            }
            theta = Math.atan2( x, z ) - Math.PI;
            phi = Math.atan( y / Math.sqrt( x * x + z * z ) );
            a = Math.cos( theta / 2 );
            b = Math.sin( theta / 2 );
            c = Math.cos( phi / 2 );
            d = Math.sin( phi / 2 );
            return [ a * c, a * d, b * c, -b * d ];
        },
        normalize : function ( q ) {
            var len = Math.sqrt(q[0]*q[0] + q[1]*q[1] + q[2]*q[2] + q[3]*q[3]);
            len = 1/len;
            return [ q[0]*len, q[1]*len, q[2]*len, q[3]*len ];
        },
        multiplyVec3 : function( quat, vec ) {//rotate a vector in R3 by a quartenion
            var dest = [];

            var x = vec[0], y = vec[1], z = vec[2];
            var qx = quat[1], qy = quat[2], qz = quat[3], qw = quat[0];

            // calculate quat * vec
            var ix = qw*x + qy*z - qz*y;
            var iy = qw*y + qz*x - qx*z;
            var iz = qw*z + qx*y - qy*x;
            var iw = -qx*x - qy*y - qz*z;

            // calculate result * inverse quat
            dest[0] = ix*qw + iw*-qx + iy*-qz - iz*-qy;
            dest[1] = iy*qw + iw*-qy + iz*-qx - ix*-qz;
            dest[2] = iz*qw + iw*-qz + ix*-qy - iy*-qx;

            return dest;
        },
        getQuartFromMat : function( mat ) {
            //mat is a 4X4 matrix
            var maxel = Math.max( mat[ 0 ], mat[ 5 ], mat[ 10 ] );
            var r = Math.sqrt( 1 + 2*maxel - mat[ 0 ] - mat[ 5 ] - mat[ 10 ] );
            if ( r < 0.00001 ) {
                return [ 1, 0, 0, 0 ];
            }

            return tetra.normalize(
                    [ ( mat[ 6 ] - mat[ 9 ] )/( 2*r ),
                      r/2,
                      ( mat[ 4 ] + mat[ 1 ] )/( 2*r ),
                      ( mat[ 2 ] + mat[ 8 ] )/( 2*r ) ] );
        }
    };

    Object.defineProperty( Array.prototype, "max", {
        value: function () {
            return this.reduce( Math.max );
        }
    } );

    Object.defineProperty( Array.prototype, "min", {
        value: function () {
            return this.reduce( Math.min );
        }
    } );

    return {
        dian3: dian3,
        tetra: tetra,
        zip : function( a1, a2, f ) {
            var ret = [];
            var m = Math.max( a1.length, a2.length );

            for ( var i = 0; i < m; ++i ) {
                ret[ i ] = f( a1[ i ], a2[ i ] );
            }

            return ret;
        }
    };
}();






var Transformable = function() {
    //private
    var cachedMatrix = mat4.create();
    var inverseMatrix = mat4.create();
    var validMatrix = false;
    var validInverse = false;
    this.position = [ 0, 0, 0 ];
    this.orientation = [ 1, 0, 0, 0 ];

    this.getMatrix = function() {
            if ( !validMatrix ) {
                cachedMatrix = math.tetra.rotMatrix( this.orientation );
                cachedMatrix[ 12 ] = this.position[ 0 ];
                cachedMatrix[ 13 ] = this.position[ 1 ];
                cachedMatrix[ 14 ] = this.position[ 2 ];
                //mat4.scale( cachedMatrix, [ this.scaleFactor, this.scaleFactor, this.scaleFactor ] );
            }
            return cachedMatrix;
    };

    this.getInverse = function() {
        if( !validInverse || !validMatrix ) {
            var mat = this.getMatrix();
            //Transposed 3x3 matrix
            inverseMatrix[ 0 ] = mat[ 0 ];
            inverseMatrix[ 1 ] = mat[ 4 ];
            inverseMatrix[ 2 ] = mat[ 8 ];
            inverseMatrix[ 4 ] = mat[ 1 ];
            inverseMatrix[ 5 ] = mat[ 5 ];
            inverseMatrix[ 6 ] = mat[ 9 ];
            inverseMatrix[ 8 ] = mat[ 2 ];
            inverseMatrix[ 9 ] = mat[ 6 ];
            inverseMatrix[ 10 ] = mat[ 10 ];
            //Translation part rotated by the transposed 3x3 matrix
            var x = -mat[ 12 ];
            var y = -mat[ 13 ];
            var z = -mat[ 14 ];
            inverseMatrix[ 12 ] = x * inverseMatrix[ 0 ] + y * inverseMatrix[ 4 ] + z * inverseMatrix[ 8 ];
            inverseMatrix[ 13 ] = x * inverseMatrix[ 1 ] + y * inverseMatrix[ 5 ] + z * inverseMatrix[ 9 ];
            inverseMatrix[ 14 ] = x * inverseMatrix[ 2 ] + y * inverseMatrix[ 6 ] + z * inverseMatrix[ 10 ];
            inverseMatrix[ 15 ] = 1;
            validInverse = true;
        }
        return inverseMatrix;
    };

    this.getPosition = function() {
        return [ position[ 0 ], position[ 1 ], position[ 2 ] ];
    };

    this.inverse = this.getInverse();
};





var Camera = function() {
    this.w = 1;
    this.h = 1;
    this.ratio = 1;
    this.zNear = 0.1;
    this.zFar = 100;
    this.perspectiveMatrix = mat4.create();
}.extend( Transformable );

Camera.prototype.setViewport = function( w, h ) {
    this.w = w;
    this.h = h;
    this.setPerspective();
};

Camera.prototype.setPerspective = function () {
    mat4.perspective( 50, this.w / this.h, this.zNear, this.zFar, this.perspectiveMatrix );
    this.ratio = this.w / this.h;
}




var Drawable = function( data, gl ) {
    this.mesh = data.mesh;
    this.material = null;
    this.indices = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array( this.mesh.indices ), gl.STATIC_DRAW );
    this.indices.length = this.mesh.indices.length;

    var makeBuffer = function ( data ) {
        var ret = gl.createBuffer();
        gl.bindBuffer( gl.ARRAY_BUFFER, ret );
        gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( data ), gl.STATIC_DRAW );
        return ret;
    }

    this.Position = makeBuffer( this.mesh.vertices );
    this.UVCoord = makeBuffer( data.uvcoords );
    //this.uvcoords = data.uvcoords;
    //this.material = data.material;
}.extend( Transformable );



var CL = {
    BASE_URL: '/static/cloth/js/shaders/',

    init_gl: function (canvas) {
        var gl;

        gl = canvas.getContext( 'experimental-webgl', {depth: true});
        if (gl === null) {
            throw "webgl";
        }
        //Set the viewport size equal to the canvas size
        gl.viewport( 0, 0, canvas.width, canvas.height );

        //Set the clear color to black
        gl.clearColor( 0.0, 0.0, 0.0, 0.0 );

        gl.clearDepth( 1.0 );
        gl.disable( gl.CULL_FACE );
        gl.enable( gl.DEPTH_TEST );
        gl.depthFunc( gl.LEQUAL );
        gl.enable( gl.BLEND );
        gl.blendFunc( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA );
        gl.clear( gl.COLOR_BUFFER_BIT );

        if (!gl.getExtension("OES_texture_float")) {
            throw "webgl";

        }
        if (!gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS)) {
            throw "webgl";
        }

        return gl;
    },

    uniforms: {
        s2positions: {},
        s2normals: {},
        s2flag: {},
        s2speeds: {}
    },

    setup: function (onerror) {
        var window_width = $(window).width();
        var window_height = $(window).height();

        // Create the canvas
        var canvas = document.createElement('canvas');
        canvas.width = window_width;
        canvas.height = window_height;
        document.body.appendChild(canvas);

        try {
            var gl = CL.init_gl(canvas);
        }
        catch (e) {
            onerror();
            return;
        }

        CL.init_shaders(gl, function (programs) {
            //CL.start(gl, programs, window_width, window_height, canvas);
            CL.gl = gl;
            CL.programs = programs;
            CL.window_width = window_width;
            CL.window_height = window_height;
            CL.canvas = canvas;
        });
    },

    start: function () {
        var gl = CL.gl;
        var programs = CL.programs;
        var window_width = CL.window_width;
        var window_height = CL.window_height;
        var canvas = CL.canvas;

        $('canvas').show();

        //var wind = [ 0.5, -0.2, 0.3 ];
        var wind = [0.01, 0.1, 0.1];

        var SIZE = 128;


        //$(window).resize(function () {
        //    canvas.width = window_width = $(window).width();
        //    canvas.height = window_height = $( window ).height();
        //    activeCamera.setViewport( window_width, window_height );
        //});

        $(canvas).click(function () {
            speeds_shader.inputs.bstop.value = false;
            setTimeout(function () {
                $(canvas).remove();
                clearInterval(CL.timer);
            }, 3500);
        });

        function makeFloatTexture(data) {
            var ret = gl.createTexture();
            gl.bindTexture( gl.TEXTURE_2D, ret );
            gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE );
            gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE );
            gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );
            gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST );
            gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGB, SIZE, SIZE, 0, gl.RGB, gl.FLOAT, data );
            gl.bindTexture( gl.TEXTURE_2D, null );
            return ret;
        }

        // calculate positions texture data
        var pos = new Float32Array( SIZE * SIZE * 3 );
        for ( j = 0; j < SIZE; j++ ) {
            for ( i = 0; i < SIZE; i++ ) {
                var a = ( i + j * SIZE ) * 3;
                pos[ a + 1] =  4 * i / SIZE - 2;
                pos[ a ] = 1 + 0.01 * Math.sin( i * j / 5 );
                pos[ a + 2 ] = 4 * j / SIZE - 2;
            }
        }

        CL.uniforms.s2positions.value = makeFloatTexture(pos);
        CL.uniforms.s2normals.value = makeFloatTexture(pos);
        CL.uniforms.s2speeds.value = makeFloatTexture(pos);


        ///////////////
        // Positions //
        ///////////////
        var positions_shader = {inputs: {}, attributes: {}};
        positions_shader.inputs = {s2speeds: {}, s2positions: {}, WorldViewProjectionMatrix: {}};

        positions_shader.inputs.WorldViewProjectionMatrix = gl.getUniformLocation(programs.positions, 'g_WorldViewProjectionMatrix');
        positions_shader.inputs.s2speeds.location = gl.getUniformLocation(programs.positions, 's2speeds');
        positions_shader.inputs.s2positions.location = gl.getUniformLocation(programs.positions, 's2positions');

        positions_shader.attributes.UVCoord = gl.getAttribLocation(programs.positions, 'inUVCoord');
        positions_shader.attributes.Position = gl.getAttribLocation(programs.positions, 'inPosition');


        ////////////
        // Speeds //
        ////////////
        var speeds_shader = {inputs: {}, attributes: {}};
        speeds_shader.inputs = {s2speeds: {}, s2positions: {}, s2normals: {}, v3wind: {}, bstop: {}, WorldViewProjectionMatrix: {}};

        speeds_shader.inputs.WorldViewProjectionMatrix = gl.getUniformLocation(programs.speeds, 'g_WorldViewProjectionMatrix');
        speeds_shader.inputs.s2speeds.location = gl.getUniformLocation(programs.speeds, 's2speeds');
        speeds_shader.inputs.s2positions.location = gl.getUniformLocation(programs.speeds, 's2positions');
        speeds_shader.inputs.s2normals.location = gl.getUniformLocation(programs.speeds, 's2normals');
        speeds_shader.inputs.v3wind.location = gl.getUniformLocation(programs.speeds, 'v3wind');
        speeds_shader.inputs.bstop.location = gl.getUniformLocation(programs.speeds, 'bstop');

        speeds_shader.attributes.UVCoord = gl.getAttribLocation(programs.speeds, 'inUVCoord');
        speeds_shader.attributes.Position = gl.getAttribLocation(programs.speeds, 'inPosition');

        /////////////
        // Normals //
        /////////////
        var normals_shader = {inputs: {}, attributes: {}};
        normals_shader.inputs = {s2positions: {}, WorldViewProjectionMatrix: {}};

        normals_shader.inputs.WorldViewProjectionMatrix = gl.getUniformLocation(programs.normals, 'g_WorldViewProjectionMatrix');
        normals_shader.inputs.s2positions.location = gl.getUniformLocation(programs.normals, 's2positions');

        normals_shader.attributes.UVCoord = gl.getAttribLocation(programs.normals, 'inUVCoord');
        normals_shader.attributes.Position = gl.getAttribLocation(programs.normals, 'inPosition');

        ///////////
        // Cloth //
        ///////////
        var clothMat = {inputs: {}, attributes: {}};
        clothMat.inputs = {s2positions: {}, s2normals: {}, s2flag: {}, WorldViewProjectionMatrix: {}};

        clothMat.inputs.WorldViewProjectionMatrix = gl.getUniformLocation(programs.cloth, 'g_WorldViewProjectionMatrix');
        clothMat.inputs.s2positions.location = gl.getUniformLocation(programs.cloth, 's2positions');
        clothMat.inputs.s2normals.location = gl.getUniformLocation(programs.cloth, 's2normals');
        clothMat.inputs.s2flag.location = gl.getUniformLocation(programs.cloth, 's2flag');

        clothMat.attributes.UVCoord = gl.getAttribLocation(programs.cloth, 'inUVCoord');



        speeds_shader.inputs.v3wind.value = wind;
        CL.speeds_shader = speeds_shader
        speeds_shader.inputs.bstop.value = true;

        var flag_texture;
        CL.load_texture(gl, CL.BASE_URL + 'img/towel.jpg', true, function (texture) {
            //flag_texture = texture;
            CL.uniforms.s2flag.value = texture;
        });

        //Not used, position will fetched from the positions texture
        var cut = 2;
        var indices = [];
        for( var j = 0; j < SIZE - 2 * cut - 1; j++ ) {
            for ( var i = 0; i < SIZE - 2 * cut - 1; i++ ) {
                var a = i + j * ( SIZE - 2 * cut );
                indices.push( a, a + 1 + SIZE - 2 * cut, a + 1 );
                indices.push( a, a + SIZE - 2 * cut, a + 1 + SIZE - 2 * cut );
            }
        }

        var vertices = [];
        for ( j = cut; j < SIZE - cut; j++ ) {
            for ( i = cut; i < SIZE - cut; i++ ) {
                var a = ( i - cut + ( j - cut ) * ( SIZE - 2 * cut ) ) * 3;
                vertices[ a ] = i / SIZE;
                vertices[ a + 1 ] = 1 - j / SIZE;
                vertices[ a + 2 ] = 0;
            }
        }

        var uvcoords = new Float32Array( ( SIZE - 2 ) * ( SIZE - 2 ) * 2 );
        for ( j = cut; j < SIZE - cut; j++ ) {
            for ( i = cut; i < SIZE - cut; i++ ) {
                var a = ( i - cut + ( j - cut ) * ( SIZE - 2 * cut ) ) * 2;
                uvcoords[ a ] = i / SIZE;
                uvcoords[ a + 1 ] = 1 - j / SIZE;
            }
        }

        var flag_matrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

        var d_indices = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, d_indices);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
        d_indices.length = indices.length;

        var d_position = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, d_position);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

        var d_uvcoord = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, d_uvcoord);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uvcoords), gl.STATIC_DRAW);


        var square = {
            vertices: [
                0, 0, 0,
                0, 1, 0,
                1, 1, 0,
                1, 0, 0
            ],
            indices: [
                0, 2, 1,
                0, 3, 2
            ],
            uvcoords: [
                0, 0,
                0, 1,
                1, 1,
                1, 0
            ]
        }

        var squareDrawable = new Drawable( { mesh: square, uvcoords: square.uvcoords, material: speeds_shader }, gl );
        console.log(squareDrawable.getMatrix());

        var fb = gl.createFramebuffer();
        var temp = makeFloatTexture( null );

        gl.bindFramebuffer( gl.FRAMEBUFFER, fb );
        gl.bindTexture( gl.TEXTURE_2D, temp );
        gl.framebufferTexture2D( gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, temp, 0 );

        gl.bindFramebuffer( gl.FRAMEBUFFER, null );

        var orthoCamera = new Camera();
        orthoCamera.perspectiveMatrix = mat4.ortho( 0, 1, 0, 1, -1, 1 );


        /*
        var SPACE = 32,
            LEFT_ARROW = 37,
            UP_ARROW = 38,
            RIGHT_ARROW = 39,
            DOWN_ARROW = 40;

        var angularVelocity = 0.01;
        var hAngle = 0;
        var horizontalRotation = 0;
        var verticalRotation = 0;

        $(window).keydown( function( e ) {
            switch( e.which ) {
                case LEFT_ARROW:
                    horizontalRotation = 1;
                    break;
                case UP_ARROW:
                    verticalRotation = 1;
                    break;
                case RIGHT_ARROW:
                    horizontalRotation = -1;
                    break;
                case DOWN_ARROW:
                    verticalRotation = -1;
                    break;
                case SPACE:
                    speeds_shader.inputs.v3wind.value = [ 0, 1.5, 0 ];
                    break;
            }
        } );

        $(window).keyup( function( e ) {
            switch( e.which ) {
                case LEFT_ARROW:
                    horizontalRotation = 0;
                    break;
                case UP_ARROW:
                    verticalRotation = 0;
                    break;
                case RIGHT_ARROW:
                    horizontalRotation = 0;
                    break;
                case DOWN_ARROW:
                    verticalRotation = 0;
                    break;
                case SPACE:
                    speeds_shader.inputs.v3wind.value = wind;
                    break;
            }
        });
        */

        //setInterval(function () {
        //    speeds_shader.inputs.v3wind.value = [ 0, 0, 0.1 ];
        //}, 50)

        var cam = new Camera();
        cam.position = [4.997868015207526, -0.5, -0.14599761150644452];
        cam.orientation = [0.6967067093471654, 0, 0.7173560908995228, 0];
        cam.inverse = cam.getInverse();


        var world_uniform_ortho = mat4.create();
        mat4.multiply(orthoCamera.perspectiveMatrix, orthoCamera.inverse, world_uniform_ortho);
        world_uniform_ortho = mat4.multiply(world_uniform_ortho, flag_matrix);

        function renderSpeeds(material, name, program) {
            gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, temp, 0);
            gl.viewport(0, 0, SIZE, SIZE);
            gl.useProgram(program);

            gl.uniformMatrix4fv(material.inputs.WorldViewProjectionMatrix, false, world_uniform_ortho);

            var activeTexture = 0;

            for ( i in material.inputs ) {
                switch ( i ) {
                    case 's2flag':
                    case 's2normals':
                    case 's2positions':
                    case 's2speeds':
                        gl.activeTexture( gl.TEXTURE0 + activeTexture );
                        gl.bindTexture( gl.TEXTURE_2D, material.inputs[ i ].value );
                        gl.uniform1i( material.inputs[ i ].location, activeTexture );
                        activeTexture++;
                        break;
                    case 'bstop':
                        gl.uniform1i( material.inputs[ i ].location, material.inputs[ i ].value );
                        break;
                    case 'v3wind':
                        gl.uniform3fv( material.inputs[ i ].location, material.inputs[ i ].value );
                        break;
                }
            }

            gl.bindBuffer( gl.ARRAY_BUFFER, squareDrawable.Position );
            gl.vertexAttribPointer(material.attributes.Position, 3, gl.FLOAT, false, 0, 0 );
            gl.enableVertexAttribArray( material.attributes.Position );

            gl.bindBuffer( gl.ARRAY_BUFFER, squareDrawable.UVCoord );
            gl.vertexAttribPointer(material.attributes.UVCoord, 2, gl.FLOAT, false, 0, 0 );
            gl.enableVertexAttribArray( material.attributes.UVCoord );

            gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, squareDrawable.indices );
            gl.drawElements( gl.TRIANGLES, squareDrawable.indices.length, gl.UNSIGNED_SHORT, 0 );


            gl.framebufferTexture2D( gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, null, 0 );
            gl.bindFramebuffer( gl.FRAMEBUFFER, null );

            var result = CL.uniforms[name].value;
            CL.uniforms[name].value = temp;
            temp = result;

            // Setup Materials
            speeds_shader.inputs.s2speeds.value = CL.uniforms.s2speeds.value;
            speeds_shader.inputs.s2positions.value = CL.uniforms.s2positions.value;
            speeds_shader.inputs.s2normals.value = CL.uniforms.s2normals.value;

            positions_shader.inputs.s2speeds.value = CL.uniforms.s2speeds.value;
            positions_shader.inputs.s2positions.value = CL.uniforms.s2positions.value;

            normals_shader.inputs.s2positions.value = CL.uniforms.s2positions.value;
        }

        function tick() {
            renderSpeeds(speeds_shader, 's2speeds', programs.speeds);
            renderSpeeds(positions_shader, 's2positions', programs.positions);
            renderSpeeds(normals_shader, 's2normals', programs.normals);
        }

        CL.timer = setInterval(function() {
            tick();
            tick();
            tick();
            tick();
            tick();
            tick();
            tick();
            tick();
            tick();
            tick();
            //Dont fuck with this, black magic
            //gl.getParameter( gl.DEPTH_CLEAR_VALUE );

            cam.setViewport(window_width, window_height);

            //if( horizontalRotation ) {
            //    cam.rotate( angularVelocity * horizontalRotation, [ 0, 1, 0 ], true );
            //    console.log(cam.getPosition(), cam.getOrientation());
            //}
            //if( verticalRotation ) {
            //    cam.rotate( angularVelocity * verticalRotation, [ 1, 0, 0 ] );
            //    console.log(cam.getPosition(), cam.getOrientation());
            //}

            gl.viewport(0, 0, window_width, window_height);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

            gl.useProgram(programs.cloth);
            //gl.useProgram(CL.programs.cloth);
            //flagDrawable.render(clothMat, gl, cam);

            var world_uniform;

            world_uniform = mat4.create();
            mat4.multiply(cam.perspectiveMatrix, cam.inverse, world_uniform);
            world_uniform = mat4.multiply(world_uniform, flag_matrix);
            gl.uniformMatrix4fv(clothMat.inputs.WorldViewProjectionMatrix, false, world_uniform);

            // s2positions
            gl.activeTexture(gl.TEXTURE0 + 0);
            gl.bindTexture(gl.TEXTURE_2D, CL.uniforms.s2positions.value);
            gl.uniform1i(clothMat.inputs.s2positions.location, 0);

            // s2normals
            gl.activeTexture(gl.TEXTURE0 + 1);
            gl.bindTexture(gl.TEXTURE_2D, CL.uniforms.s2normals.value );
            gl.uniform1i(clothMat.inputs.s2normals.location, 1);

            // s2flag
            gl.activeTexture(gl.TEXTURE0 + 2);
            gl.bindTexture(gl.TEXTURE_2D, CL.uniforms.s2flag.value);
            gl.uniform1i(clothMat.inputs.s2flag.location, 2);

            // Load UVCoords
            gl.bindBuffer(gl.ARRAY_BUFFER, d_uvcoord);
            gl.vertexAttribPointer(clothMat.attributes.UVCoord, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(clothMat.attributes.UVCoord);

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, d_indices);
            gl.drawElements(gl.TRIANGLES, d_indices.length, gl.UNSIGNED_SHORT, 0);

        }, 17 );
    },

    init_shaders: function (gl, callback) {
        var shader_list = ['positions', 'speeds', 'normals', 'cloth'];
        var loaded = 0;
        var ret = {};

        var _callback = function (program, name) {
            ret[name] = program;

            if (++loaded === shader_list.length) {
                callback(ret);
            }
        }

        $.each(shader_list, function (i, v) {
            CL.load_shader_program(gl, v, _callback);
        });
    },

    load_texture: function (gl, url, generateMipMap, callback) {
        var img = new Image();
        img.onload = function () {
            var texture = gl.createTexture();

            gl.bindTexture(gl.TEXTURE_2D, texture );
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true );
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            //gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, this );
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, this );
            if ( generateMipMap ) {
                gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR );
                gl.generateMipmap( gl.TEXTURE_2D );
            }
            else {
                gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR );
            }
            gl.bindTexture( gl.TEXTURE_2D, null );

            callback(texture);
        };
        img.src = url;
    },

    load_shader_program: function(gl, name, callback) {
        var loaded = 0;
        var vertex_shader, fragment_shader;

        var _callback = function () {
            if (++loaded === 2) {
                var program = gl.createProgram();
                gl.attachShader(program, vertex_shader);
                gl.attachShader(program, fragment_shader);
                gl.linkProgram(program);

                callback(program, name);
            }
        }

        $.get(CL.BASE_URL + 'shaders/' + name + '/vertex.c', function (source) {
            vertex_shader = gl.createShader( gl.VERTEX_SHADER );
            gl.shaderSource(vertex_shader, source);
            gl.compileShader(vertex_shader);
            vertex_shader.name = name;

            _callback();
        });

        $.get(CL.BASE_URL + 'shaders/' + name + '/fragment.c', function (source) {
            fragment_shader = gl.createShader( gl.FRAGMENT_SHADER );
            gl.shaderSource(fragment_shader, source);
            gl.compileShader(fragment_shader);
            fragment_shader.name = name;

            _callback();
        });
    }
};

//CL.init();
