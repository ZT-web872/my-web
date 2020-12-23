"use strict";

var canvas;
var gl;
var theta;

window.onload = function () {
        var canvas = document.getElementById('draw'),
            gl = canvas.getContext('webgl');
        var vertices = [
				0.0,1,0.0,
				0.7,0.7,0.0,
				-0.7,0.7,0.0,
				
				0.0,0.7,0.0,
				0.7,0.4,0.0,
				-0.7,0.4,0.0,
				
				0.0,0.4,0.0,
				0.7,0.1,0.0,
				-0.7,0.1,0.0,
				
				0.2,0.1,0.0,
				-0.2,0.1,0.0,
				0.2,-0.5,0.0,
				
				-0.2,0.1,0.0,
				-0.2,-0.5,0.0,
			    0.2,-0.5,0.0,
            ],
            indices =[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];
        var vertex_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

        var Index_Buffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
        // 创建和编译着色器程序
        var vertCode =
            'attribute vec3 coordinates;' +
            'uniform mat4 translation;' +
            'void main(void) {' +
            ' gl_Position = translation*vec4(coordinates,1.0);' +//这里一定要注意  是translation在前
            '}';

        var fragCode =
            'void main(void) {' +
            //' gl_FragColor = vec4(1, 0.5, 0.0, 1);' +
			"if(gl_FragCoord.y > 180.0){"+
				"gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);"+
				"}else{"+
					"gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);"+
			"}"+
            '}';
        var vertShader = gl.createShader(gl.VERTEX_SHADER);
        var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(vertShader, vertCode);
        gl.shaderSource(fragShader, fragCode);
        gl.compileShader(vertShader);
        gl.compileShader(fragShader);
        var shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertShader);
        gl.attachShader(shaderProgram, fragShader);
        gl.linkProgram(shaderProgram);
        gl.useProgram(shaderProgram);
        var coord = gl.getAttribLocation(shaderProgram, 'coordinates');
        gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(coord);

        var x =0.0,y = 0.0,z = 0.0;
        var xformMatrix = new Float32Array([
           1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            x, y, z, 1.0
        ]);
        //然后将矩阵传输给定点着色器
        var translation = gl.getUniformLocation(shaderProgram,'translation');
        gl.uniformMatrix4fv(translation, false, xformMatrix);
        gl.clearColor( 0.0, 0.0, 0.0,0.0);
        gl.enable(gl.DEPTH_TEST);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.viewport(0, 0, draw.width, draw.height);
        gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
        document.addEventListener("keyup",function (event) {
            switch (event.keyCode){
                case 40:
                    y -= 0.5;
                    break;
                
                case 38:
                    y += 0.5;
                    break;
					
					case 37:
					    x -= 0.2;
					    break;
					
					case 39:
					    x += 0.2;
					    break;
            }
            xformMatrix = new Float32Array([
                1.0, 0.0, 0.0, 0.0,
                0.0, 1.0, 0.0, 0.0,
                0.0, 0.0, 1.0, 0.0,
                x, y, z, 1.0
            ]);
            gl.uniformMatrix4fv(translation, false, xformMatrix); 
            gl.clearColor( 0.0, 0.0, 0.0,0.0);
            gl.enable(gl.DEPTH_TEST);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.viewport(0, 0, draw.width, draw.height);
            gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
        });
    }
