import React, {useRef, useEffect} from 'react';

const THREE = require('three');
const OrbitControls = require('three-orbit-controls')(THREE);

const ArcCurve = ()　=> {
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
        const geometry = new THREE.Geometry();
        const arc = new THREE.ArcCurve(0, 0, 100, 0, 2*Math.PI);
        const points = arc.getPoints(50);
        geometry.setFromPoints(points);
        const material = new THREE.LineBasicMaterial({
            color: 0x000000
        });
        const line = new THREE.Line(geometry, material);
        scene.add(line);
        const geometry1 = new THREE.Geometry();
        const R = 100;
        const N = 1000;
        for(let i = 0; i<N; i++) {
            const angle = 2 * Math.PI / N * i;
            const x = R * Math.sin(angle);
            const y = R * Math.cos(angle);
            geometry.vertices.push(new THREE.Vector3(x, y, 0));
        }
        const material1 = new THREE.LineBasicMaterial({
            color: 0x000000
        });
        const line1 = new THREE.Line(geometry1, material1);
        scene.add(line1);

        const geometry2 = new THREE.Geometry();
        const p1 = new THREE.Vector3(50, 0, 0);
        const p2 = new THREE.Vector3(0, 70, 0);
        geometry2.vertices.push(p1, p2);
        const material2 = new THREE.LineBasicMaterial({
            color: 0xffff00
        });
        const line2 = new THREE.Line(geometry2, material2);
        scene.add(line2);
        // 三维线
        const geometry3 = new THREE.Geometry();
        const p3 = new THREE.Vector3(20, 0, 0);
        const p4 = new THREE.Vector3(0, 30, 10);
        const LineCurve3 = new THREE.LineCurve3(p3, p4);
        const LineCurve = new THREE.LineCurve(new THREE.Vector2(50, 0), new THREE.Vector2(0, 70));
        const pointArr = LineCurve3.getPoints(10);
        geometry3.setFromPoints(pointArr);
        const line3 = new THREE.Line(geometry3, material2);
        scene.add(line3);

        const geometry4 = new THREE.Geometry();
        const curve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(-50, 20, 90),
            new THREE.Vector3(-10, 40, 40),
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(60, -60, 0),
            new THREE.Vector3(70, 0, 80)
        ]);
        const points4 = curve.getPoints(100);
        geometry4.setFromPoints(points4);
        const material4 = new THREE.LineBasicMaterial({
            color: 0x000000
        });
        const line4 = new THREE.Line(geometry4, material4);
        scene.add(line4);

        // 贝塞尔曲线
        const geometry5 = new THREE.Geometry();
        const pb1 = new THREE.Vector3(-80, 0, 0);
        const pb2 = new THREE.Vector3(20, 100, 0);
        const pb3 = new THREE.Vector3(80, 0, 0);
        const curve1 = new THREE.QuadraticBezierCurve3(pb1, pb2, pb3);
        geometry5.setFromPoints(curve1.getPoints(100));
        const line5 = new THREE.Line(geometry5, material1);
        scene.add(line5);

        // u型曲线
        const geometry6 = new THREE.Geometry();
        const arcCurve1 = new THREE.ArcCurve(0, 0, R, 0, Math.PI, true);
        const line6 =  new THREE.LineCurve(new THREE.Vector2(R, 200, 0), new THREE.Vector2(R, 0, 0));
        const line7 = new THREE.LineCurve(new THREE.Vector2(-R, 0, 0), new THREE.Vector2(-R, 200, 0));
        const curvePath = new THREE.CurvePath();
        curvePath.curves.push(line6, arcCurve1, line7);
        const points5 = curvePath.getPoints(200);
        geometry6.setFromPoints(points5);
        const line9 = new THREE.Line(geometry6, material);
        line9.position.set(0, -50, 0);
        scene.add(line9);



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

export default ArcCurve;