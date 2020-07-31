import React, {useRef, useEffect} from 'react';
import * as THREE from 'three';
const OrbitControls = require('three-orbit-controls')(THREE);

const ShadowObject = () => {
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
        const geometry = new THREE.BoxGeometry(40, 100, 40);
        const material = new THREE.MeshLambertMaterial({
            color: 0x0000ff
        });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        mesh.castShadow = true;
        const planeGeometry = new THREE.PlaneGeometry(300, 200);
        const planeMaterial = new THREE.MeshLambertMaterial({
            color: 0x999999
        });

        const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
        scene.add(planeMesh);
        planeMesh.rotateX(-Math.PI/2);
        planeMesh.position.y = -50;
        planeMesh.receiveShadow = true;


        const directionLight = new THREE.DirectionalLight(0xffffff, 1);
        directionLight.position.set(60, 100, 40);
        scene.add(directionLight);

        // directionLight.castShadow = true;
        //
        // directionLight.shadow.camera.near = 0.5;
        // directionLight.shadow.camera.far = 300;
        // directionLight.shadow.camera.left = -50;
        // directionLight.shadow.camera.right = 50;
        // directionLight.shadow.camera.top = 200;
        // directionLight.shadow.camera.bottom = -100;
        //
        // console.log(directionLight.shadow.camera);


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

export default ShadowObject;
