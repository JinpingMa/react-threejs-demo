import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
// import  './index.less'
// const THREE = require('three');
const OrbitControls = require('three-orbit-controls')(THREE);

const Face3Demo = () => {
    useEffect(() => {
        init();
    },[]);

    const canvasRef = useRef(null);
    let scene, camera, renderer;
    const init = () => {
        scene =  new THREE.Scene();
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
        // camera.position.z = 5;
        createAxes();
        createGeometry();
        animate();
    }

    const createAxes = () => {
        const axisHelper = new THREE.AxesHelper(250);
        scene.add(axisHelper);
    }

    const createGeometry = () => {
        const geometry = new THREE.BoxGeometry(100, 100, 100);

        geometry.faces.forEach(face => {
            face.vertexColors = [
                new THREE.Color(0xffff00),
                new THREE.Color(0xff00ff),
                new THREE.Color(0x00ffff)
            ]
        });

        geometry.scale(2, 2, 2);
        geometry.translate(50, 0, 0);
        // geometry.rotateX(Math.PI / 4);
        geometry.center();
        const material = new THREE.MeshBasicMaterial({
            vertexColors: THREE.FaceColors,
            transparent: true,
            opacity: 0.7
        });

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
    }

    const render = () => {
        renderer.render(scene, camera);
    }

    const animate =() => {
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

export default Face3Demo;