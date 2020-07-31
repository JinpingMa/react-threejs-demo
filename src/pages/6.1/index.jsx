import React, {useRef, useEffect} from 'react';

const THREE = require('three');
const OrbitControls = require('three-orbit-controls')(THREE);

const LevelModel = ()　=> {
    let scene, camera, modelRenderer;

    const canvasRef = useRef(null);

    useEffect(() => {
        initCanvas();
    }, []);

    const initCanvas = () => {
        createScene();
        createCamera();
        createMeshModel();
        createRenderer();
        createControls();
    }

    const createScene = () => {
        scene = new THREE.Scene();
    }

    const createCamera = () => {
        const canvasWidth = canvasRef.current.clientWidth;
        const canvasHeight = canvasRef.current.clientHeight;
        const rate = canvasWidth / canvasHeight;
        const scope = 150;
        camera = new THREE.OrthographicCamera(-scope*rate, scope*rate, scope, -scope, 1, 1000);
        camera.position.set(200, 300, 200);
        console.log(scene.position, 'scene position');
        camera.lookAt(scene.position);
    }

    const createRenderer = () => {
        modelRenderer = new THREE.WebGLRenderer({antialias: true});
        modelRenderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
        modelRenderer.setClearColor(0xb9d3ff, 1);
        canvasRef.current.appendChild(modelRenderer.domElement);
    }

    const createMeshModel = () => {
        const geometry = new THREE.BoxGeometry(20, 20, 20);
        const material = new THREE.MeshBasicMaterial({color: 0x0000ff});
        const group = new THREE.Group();
        const mesh1 = new THREE.Mesh(geometry, material);
        const mesh2 = new THREE.Mesh(geometry, material);
        mesh2.translateX(100);
        group.add(mesh1, mesh2);
        group.translateY(100);
        group.scale.set(2, 2, 2);
        scene.add(group);
        group.rotateY(Math.PI/6);

    }

    const renderModel = () => {
        modelRenderer.render(scene, camera);
    }

    const createControls = () => {
        renderModel();
        const controls = new OrbitControls(camera, modelRenderer.domElement);
        controls.addEventListener('change', renderModel);
    }

    return (
        <div ref={canvasRef} style={{height: '100%'}}/>
    )
}

export default LevelModel;