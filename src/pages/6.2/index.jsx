import React, {useRef, useEffect} from 'react';

const THREE = require('three');
const OrbitControls = require('three-orbit-controls')(THREE);

const BodyModel = ()　=> {
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

    function sphereMesh(R, x, y, z, name='', color=0x0000ff) {
        const geometry = new THREE.SphereGeometry(R, 25, 25);
        const material = new THREE.MeshPhongMaterial({
            color: color || 0x0000ff
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);
        if (name) mesh.name = name;
        return mesh;
    }

    function cylinderMesh(R, h, x, y, z, name, color=0x0000ff) {
        const geometry = new THREE.CylinderBufferGeometry(R, R, h, 25, 25);
        const material = new THREE.MeshPhongMaterial({
            color: color || 0x0000ff
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);
        if (name) mesh.name = name;
        return mesh;

    }

    const createMeshModel = () => {
        // 头部模型组
        const headMesh = sphereMesh(10, 0, 0, 0, '脑壳');
        const leftEyeMesh = sphereMesh(1, 8, 5, 4, '左眼', 0xff0000);
        const rightEyeMesh = sphereMesh(1, 8, 5, -4, '右眼', 0xff0000);
        const headGroup = new THREE.Group();
        headGroup.name = '头部';
        headGroup.add(headMesh, leftEyeMesh, rightEyeMesh);
        // 身体模型组
        const neckMesh = cylinderMesh(3, 10, 0, -15, 0, '脖子');
        const bodyMesh = cylinderMesh(14, 30, 0, -35, 0, '主干');
        const leftLegMesh = cylinderMesh(4, 60, 0, -80, -7, '左腿');
        const rightLegMesh = cylinderMesh(4, 60, 0, -80, 7, '右腿');
        const legGroup = new THREE.Group();
        legGroup.name = '腿';
        legGroup.add(leftLegMesh, rightLegMesh);
        const bodyGroup = new THREE.Group();
        bodyGroup.name = '身体';
        bodyGroup.add(neckMesh, bodyMesh, legGroup);
        // 整体
        const personGroup = new THREE.Group();
        personGroup.name = '人';
        personGroup.add(headGroup, bodyGroup);
        personGroup.translateY(50);
        scene.add(personGroup);
        const ambient = new THREE.AmbientLight(0xffffff);
        scene.add(ambient);

        // 递归遍历获取所有模型元素
        scene.traverse((item) => {
            const {type, name, id, parent, children} = item;

            if (type === 'Group') {
                console.log(name);
            }
            if (item.type === 'Mesh') {
                console.log(' ' + name);
            }
            if (name === '左眼' || name === '右眼') {
                item.material.color.set(0x000000);
            }

            console.log(id);
            console.log(parent);
            console.log(children);
            const nameNode = scene.getObjectByName ( "左腿" );
            nameNode.material.color.set(0xff0000);

            const geometry = new THREE.BoxGeometry(20, 20, 20);
            const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
            const mesh = new THREE.Mesh(geometry, material)
            mesh.position.set(50, 0, 0);
            const group = new THREE.Group();
            // group本地坐标设置和mesh一样设置为(50, 0, 0)
            // mesh父对象设置position会影响得到mesh的世界坐标
            group.position.set(50, 0, 0);
            group.add(mesh);
            scene.add(group);
            // .position属性获得本地坐标
            console.log('本地坐标',mesh.position);

            // getWorldPosition()方法获得世界坐标
            //该语句默认在threejs渲染的过程中执行,如果渲染之前想获得世界矩阵属性、世界位置属性等属性，需要通过代码更新
            scene.updateMatrixWorld(true);
            const worldPosition = new THREE.Vector3();
            mesh.getWorldPosition(worldPosition);
            console.log('世界坐标',worldPosition);
        })
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

export default BodyModel;