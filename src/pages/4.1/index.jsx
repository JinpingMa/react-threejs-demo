import React, {useRef, useEffect} from 'react';
import * as THREE from 'three';
const OrbitControls = require('three-orbit-controls')(THREE);

const ModelClone = () => {
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
        const geometry = new THREE.BoxGeometry(100, 100, 100);
        // // 点渲染
        // const material = new THREE.PointsMaterial({
        //     color: 0xff0000,
        //     size: 5.0
        // });
        // const points = new THREE.Points(geometry, material);
        // scene.add(points);
        // // 面渲染
        // const material = new THREE.LineBasicMaterial({
        //     color: 0xff0000,
        // });
        // const line = new THREE.Line(geometry, material);
        // scene.add(line);
        // // 网络模型
        // const material = new THREE.MeshLambertMaterial({
        //     color: 0xff0000,
        //     wireframe: true
        // });
        // const mesh = new THREE.Mesh(geometry, material);
        // // mesh.scale.set(0.5, 1.5, 2);
        // // mesh.position.set(80, 2, 10);
        // // mesh.translateX(100);
        // const axis = new THREE.Vector3(0, 1, 0);
        // axis.normalize();
        // // mesh.translateOnAxis(axis, 100);
        // mesh.rotateOnAxis(axis,Math.PI/8);
        //
        // scene.add(mesh);

        const box = new THREE.BoxGeometry(10, 10, 10);
        box.scale(5, 5, 5);
        const material = new THREE.MeshBasicMaterial({color: 0x0000ff});
        const mesh = new THREE.Mesh(box, material);
        const mesh2 = mesh.clone();
        mesh.translateX(100);
        scene.add(mesh, mesh2);

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

export default ModelClone;