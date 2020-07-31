import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
// import  './index.less'
// const THREE = require('three');
const OrbitControls = require('three-orbit-controls')(THREE);

const OrbitControlsPage =() => {
    useEffect(() => {
        init();
    },[]);
    
    const canvasRef = useRef(null);
    let scene;
    let camera;
    let renderer;
    let cube;
    let line;
    const init = () => {
        scene =  new THREE.Scene()
        const width = canvasRef.current.clientWidth;
        const height = canvasRef.current.clientHeight;
        const k = width/height;
        const s = 200;
        camera = new THREE.OrthographicCamera(-s*k, s*k, s, -s, 1, 1000);
        camera.position.set(200, 300, 200);
        camera.lookAt(scene.position);

        // camera = new THREE.PerspectiveCamera( 75, canvasRef.current.clientWidth / canvasRef.current.clientHeight, 0.1, 1000 );
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight );
        renderer.setClearColor(0xb9d3ff, 1);
        canvasRef.current.appendChild( renderer.domElement );
        camera.position.z = 5;
        // createCube();
        // createLine();
        createAxes();
        createPoint();
        animate();

    }

    const createCube = () => {
        const geometry = new THREE.BoxGeometry(100, 100, 100);
        const material = new THREE.MeshLambertMaterial( { color: 0xff0000 } );
        cube = new THREE.Mesh( geometry, material );
        scene.add(cube);
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        const point = new THREE.PointLight(0xffffff);
        point.position.set(400, 200, 300);
        scene.add(point);

    }
    const createAxes = () => {
        const axisHelper = new THREE.AxesHelper(250);
        scene.add(axisHelper);
    }

    const createPoint = () => {
        const geometry = new THREE.BufferGeometry();
        const vertices = new Float32Array([
            0, 0, 0,
            50, 0, 0,
            0, 100, 0,
            0, 0, 0,
            0, 0, 100,
            50, 0, 0,
        ]);
        const attribute =  new THREE.BufferAttribute(vertices, 3);
        geometry.attributes.position = attribute;
        // 渐变色
        const colors = new Float32Array([
            1, 0, 0,
            0, 1, 0,
            0, 0, 1,
            1, 1, 0,
            0, 1, 1,
            1, 0, 1,
        ]);
        geometry.attributes.color = new THREE.BufferAttribute(colors, 3);
        // 法向量
        const normals = new Float32Array([
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
        ]);
        geometry.attributes.normal = new THREE.BufferAttribute(normals, 3);
        // 面
        const material = new THREE.MeshBasicMaterial({
            // color: 0x0000ff,
            vertexColors: THREE.VertexColors,
            side: THREE.DoubleSide
        });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        // // 点
        // const material = new THREE.PointsMaterial({
        //     // color: 0xff0000,
        //     vertexColors: THREE.VertexColors,
        //     size: 10.0
        // });
        // const points = new THREE.Points(geometry, material);
        // scene.add(points);
        // //线
        // const material = new THREE.LineBasicMaterial({
        //     // color: 0xff0000,
        //     vertexColors: THREE.VertexColors
        // });
        // const line = new THREE.Line(geometry, material);
        // scene.add(line);


    }

    const createLine = () => {
        const material = new THREE.LineBasicMaterial({color: 0x0f00ff}) //定义线的材质
        const geometry = new THREE.Geometry()
        geometry.vertices.push(new THREE.Vector3(-2, 0, 0))
        geometry.vertices.push(new THREE.Vector3( 0, 2, 0) ); //相当于是从 将前两个坐标连成一条线
        // geometry.vertices.push(new THREE.Vector3( 2, 0, 0) );
        line = new THREE.Line(geometry, material)
        line.position.x = -1
        line.position.y = 2
        scene.add(line)
    }

    const render = () => {
            renderer.render(scene, camera);
    }

    const animate =() => {
        // requestAnimationFrame( animate );
        // cube.rotation.x += 0.01;
        // cube.rotation.y += 0.01;
        // line.rotation.x += 0.02
        renderer.render( scene, camera );
        const controls = new OrbitControls(camera, renderer.domElement );
        controls.addEventListener("change", render);
    }

    return (
        <div
            id= "canvas"
            style={{ height: '100%',background:'#b9d3ff' }}
            ref={canvasRef}
        />
    );
}

export default OrbitControlsPage;