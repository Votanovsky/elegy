import * as THREE from 'three';
import {gsap} from 'gsap';
import {createNoise3D} from 'simplex-noise';
import { randFloat } from 'three/src/math/MathUtils';
import { Vector2, Vector3 } from 'three';

let renderer,
scene,
sizes,
aspectRatio,
camera,
defaultColor,
radius,
meshPosition,
vertexNormals = false,
mesh,
scale,
noise = new createNoise3D(),
velocities,
clock,
blobScale = {scale: 0.3};

export function init() {
    scene = new THREE.Scene();

    sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
    }

    window.addEventListener('resize', () =>
    {
        // Update sizes
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight
    
        // Update camera
        camera.aspect = sizes.width / sizes.height
        camera.updateProjectionMatrix()
    
        // Update renderer
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })

    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        // domElement: document.querySelector("canvas")
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setClearColor(0xEDEDED, 0.5);
    document.body.appendChild(renderer.domElement);

    aspectRatio = sizes.width / sizes.height;
    camera = new THREE.PerspectiveCamera( 
        45, aspectRatio, 0.1, 1000 );
    camera.position.set(15, 15, 15);
    scene.add(camera);
    
    const dLightR = new THREE.PointLight(0xffffff, 1);
    dLightR.position.set(15, 6, 0);
    scene.add(dLightR);
    const dLightBack = new THREE.PointLight(0xffffff, 1.5);
    dLightBack.position.set(10, 15, -20);
    scene.add(dLightBack);
    const dLightTop = new THREE.PointLight(0xffffff, 1.2);
    dLightTop.position.set(-10, 10, -5);
    scene.add(dLightTop);

    const detalization = 180;

    defaultColor = 0x404040;

    radius = 3;

    meshPosition = new THREE.Vector3(5, 0, 5);
    camera.lookAt(meshPosition.x, meshPosition.y, meshPosition.z);

    const loader = new THREE.TextureLoader();
    const texture = loader.load("/media/img/blob/coal-texture.jpg");
    const normal = loader.load("/media/img/blob/NormalMap.png");
    const displacement = loader.load("/media/img/blob/DisplacementMap.png");
    const ao = loader.load("/media/img/blob/AmbientOcclusionMap.png");
    const specular = loader.load("/media/img/blob/SpecularMap.png");
    texture.anisotropy = 16;

    scale = {
        x: 1.4,
        y: 1,
        z: 1.4,
    }

    let geometry2 = new THREE.SphereGeometry(radius, detalization, detalization); 

    let material = new THREE.MeshPhysicalMaterial({
        color: defaultColor,
        bumpMap: texture,
        bumpScale: 0.0,
        clearcoatMap: texture,
        clearcoatNormalMap: normal,
        clearcoatNormalScale: new Vector2(0.1, 0.3),
        displacementMap: displacement,
        displacementScale: 0,
        roughness: 0.67,
        metalness: 1,
        reflectivity: .79,
        clearcoat: 0.767,
        clearcoatRoughness: 0.431,
        flatShading: 767
    });
    
    mesh = new THREE.Mesh(geometry2, material);
    mesh.position.set(meshPosition.x, meshPosition.y, meshPosition.z);
    scene.add(mesh);

    mesh.scale.x = scale.x;
    mesh.scale.y = scale.y;
    mesh.scale.z = scale.z;

    gsap.fromTo(mesh.scale, {x: scale.x, y: scale.y, z: scale.z}, {x: scale.x * 1.3, y: scale.y * 1, z: scale.z * 1.3, duration: 5, ease: 'expo.inOut'});
    let tlScale = gsap.timeline({repeat: -1, repeatDelay: 0});
    tlScale.startTime(5);
    tlScale.to(mesh.scale, {x: scale.x * 0.8, y: scale.y * 1.4, z: scale.z * 0.8, duration: 5, ease: 'expo.inOut'})
    .to(mesh.scale, {x: scale.x * 1.3, y: scale.y * 1, z: scale.z * 1.3, duration: 5, ease: 'expo.inOut'});
    

    clock = new THREE.Clock();

    velocities = {
        x: Array.from(Array(1), () => randFloat(-0.5, 0.5)),
        y: Array.from(Array(1), () => randFloat(-0.5, 0.5)),
        z: Array.from(Array(1), () => randFloat(-0.5, 0.5))
    }

    const duration = 3;
    const multiplier = 1.6;
    let blobScaleTl = gsap.timeline({repeat: -1, repeatDelay: 0});
    blobScaleTl.startTime(duration);
    gsap.fromTo(blobScale, {scale: blobScale.scale}, {scale: blobScale.scale * multiplier, duration: duration, ease: 'sine.inOut'});
    blobScaleTl.to(blobScale, {scale: blobScale.scale / multiplier**2, duration: duration, ease: 'sine.inOut'})
    .to(blobScale, {scale: blobScale.scale * multiplier, duration: duration, ease: 'sine.inOut'});

    
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
}

export function tick() {
    const delta = clock.getDelta();

    mesh.rotation.x += delta * 0.3;
    mesh.rotation.y += velocities.y[0] * delta;

    const position = mesh.geometry.attributes.position;
    const v = new THREE.Vector3();
    for ( let k = 0; k < position.count; k++ ) {
        v.fromBufferAttribute( position, k );
        let time = Date.now();
        v.normalize();
        let distance = mesh.geometry.parameters.radius + noise(
            v.x + time * 0.0005,
            v.y + time * 0.0005,
            v.z + time * 0.0005) * blobScale.scale;
        v.multiplyScalar(distance);
        position.setXYZ(k, v.x, v.y, v.z);
    }
    
    mesh.geometry.verticesNeedUpdate = true;
    mesh.geometry.attributes.position.needsUpdate = true;
    mesh.geometry.normalsNeedUpdate = true;
    if (vertexNormals)
        mesh.geometry.computeVertexNormals();

    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
}