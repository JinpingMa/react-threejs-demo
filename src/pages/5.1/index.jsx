import React, {useRef, useEffect} from 'react';
import * as THREE from 'three';
import {render} from "react-dom";
const OrbitControls = require('three-orbit-controls')(THREE);

const LightObject = () => {
    const canvasRef = useRef(null);
    const scene = new THREE.Scene();
    let camera, renderer;

    useEffect(() => {
        initCanvas();
        createModel();
    }, []);

    const initCanvas = () => {
        const width = canvasRef.current.clientWidth;
        const height = canvasRef.current.clientHeight;
        const k = width / height;
        const s = 200;
        camera = new THREE.OrthographicCamera(-s*k, s*k, s, -s, 1, 1000);
        camera.position.set(200, 300, 200);
        camera.lookAt(scene.position);
        renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setSize(width, height);
        renderer.setClearColor(0xb9d3ff, 1);
        canvasRef.current.appendChild(renderer.domElement);
        createModel();
        modelRender();
        orbitControls();
    }

    const createModel = () => {
//         const geometry = new THREE.BoxGeometry(10, 10, 10);
//         geometry.scale(5, 5, 5);
//         const material = new THREE.MeshLambertMaterial({color: 0x0000ff});
//         const mesh = new THREE.Mesh(geometry, material);
//         const mesh2 = mesh.clone();
//         mesh.translateX(100);
//         scene.add(mesh, mesh2);
//         // 环境光
//         const ambient = new THREE.AmbientLight(0x444444);
//         scene.add(ambient);
//         // 点光
//         const pointLight = new THREE.PointLight(0x888888);
//         pointLight.position.set(400, 200, 300);
//         scene.add(pointLight);
//         // 平行光
//         const directionalLight = new THREE.DirectionalLight(0x999999, 1);
// // 设置光源的方向：通过光源position属性和目标指向对象的position属性计算
//         directionalLight.position.set(80, 100, 50);
// // 方向光指向对象网格模型mesh2，可以不设置，默认的位置是0,0,0
//         directionalLight.target = mesh2;
//         scene.add(directionalLight);
//         // 聚光源
//         const spotLight = new THREE.SpotLight(0x888888);
//         spotLight.position.set(200, 200, 200);
//         spotLight.target = mesh2;
//         spotLight.angel = Math.PI/6;
//         scene.add(spotLight);

        const geometry = new THREE.BoxGeometry(100, 100, 100);
        const material = new THREE.MeshLambertMaterial({
            color: 0xffffff
        });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        const ambient = new THREE.AmbientLight(0x440000);
        scene.add(ambient);
        const point = new THREE.PointLight(0xff0000);
        point.position.set(400, 200, 300);
        scene.add(point);

    }

    const modelRender = () => {
        renderer.render(scene, camera);
    }

    const orbitControls = () => {
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.addEventListener('change', modelRender);
    }

    return (
        <div ref={canvasRef} style={{height: '100%', background: '#b9d3ff'}}/>
    )
}

export default LightObject;