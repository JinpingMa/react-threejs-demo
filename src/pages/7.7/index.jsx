import React, {useRef, useEffect} from 'react';

const THREE = require('three');
const OrbitControls = require('three-orbit-controls')(THREE);

const ShapeDemo = ()　=> {
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
        camera.lookAt(scene.position);
    }

    const createRenderer = () => {
        modelRenderer = new THREE.WebGLRenderer({antialias: true});
        modelRenderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
        modelRenderer.setClearColor(0xb9d3ff, 1);
        canvasRef.current.appendChild(modelRenderer.domElement);
    }

    const createMeshModel = () => {
        const points = [
            new THREE.Vector2(-50, -50),
            new THREE.Vector2(-60, 0),
            new THREE.Vector2(0, 50),
            new THREE.Vector2(60, 0),
            new THREE.Vector2(50, -50),
            new THREE.Vector2(-50, -50)
        ];
        // todo
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

export default ShapeDemo;