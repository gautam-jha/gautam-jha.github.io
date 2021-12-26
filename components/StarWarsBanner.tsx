import React, { ReactElement } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default function StarWarsBanner(): ReactElement {
    React.useEffect(() => {
        // instantiate a loader

        // Canvas
        const canvas = document.querySelector('canvas.webgl');

        // Scene
        const scene = new THREE.Scene();

        const sphere = new GLTFLoader();

        // GLTFLoader.load(
        let gltfRef: any = null;
        setTimeout(() => {
            sphere.load('/model/scene.glb', async function (gltf) {
                gltf.scene.position.set(-0.21, 0.02, 0.02);

                gltf.scene.scale.set(0.002, 0.002, 0.002);

                gltf.scene.rotation.set(1, 2, -3);

                gltfRef = gltf.scene;
                scene.add(gltfRef);

                let ev = new MouseEvent('mousemove', {
                    view: window,
                    bubbles: true,
                    cancelable: true,
                    clientX: 200,
                    clientY: 400,
                });

                // Send event
                document.querySelector('canvas')?.dispatchEvent(ev);
            });
        }, 2000);

        const light = new THREE.AmbientLight(0x404040); // soft white light
        scene.add(light);

        // // Lights

        const pointLight = new THREE.PointLight(0xffffff, 0.6);
        pointLight.position.x = 2;
        pointLight.position.y = 3;
        pointLight.position.z = 4;
        scene.add(pointLight);

        // light 2
        const Light1 = new THREE.PointLight(0xffffff, 0.1);
        Light1.position.set(-3.5, -2.4, -2.9);
        Light1.intensity = 1;
        scene.add(Light1);

        // light 3
        const Light2 = new THREE.PointLight(0xfffbd9, 0.3);
        Light2.position.set(2.9, 3, 4.2);
        Light2.intensity = 1;
        scene.add(Light2);

        // creating stars
        const points = [];
        for (let i = 0; i < 6000; i++) {
            let star = new THREE.Vector3(
                Math.random() * 600 - 300,
                Math.random() * 600 - 300,
                Math.random() * 600 - 300,
            );

            points.push(star);
        }

        let starGeo = new THREE.BufferGeometry().setFromPoints(points);

        let sprite = new THREE.TextureLoader().load('/star.png');
        let starMaterial = new THREE.PointsMaterial({
            color: 0xaaaaaa,
            size: 0.3,
            map: sprite,
        });

        const stars = new THREE.Points(starGeo, starMaterial);
        scene.add(stars);

        /**
         * Sizes
         */
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight,
        };

        window.addEventListener('resize', () => {
            // Update sizes
            sizes.width = window.innerWidth;
            sizes.height = window.innerHeight;

            // Update camera
            camera.aspect = sizes.width / sizes.height;
            camera.updateProjectionMatrix();

            // Update renderer
            renderer.setSize(sizes.width, sizes.height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        });

        /**
         * Camera
         */
        // Base camera
        const camera = new THREE.PerspectiveCamera(
            60,
            sizes.width / sizes.height,
            0.1,
            100,
        );
        camera.position.x = 0;
        camera.position.y = 0;
        camera.position.z = 2;
        scene.add(camera);

        let renderer: any = null;
        /**
         * Renderer
         */
        if (canvas) {
            renderer = new THREE.WebGLRenderer({
                canvas: canvas,
                alpha: true,
                powerPreference: 'high-performance',
            });
            renderer.setSize(sizes.width, sizes.height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        }

        /**
         * Animate
         */

        document.addEventListener('mousemove', onDocumentMouseMove);

        // tap
        // document.addEventListener('touchmove', onDocumentMouseMove);

        let mouseX: number,
            targetX: number = 0;
        let mouseY: number,
            targetY: number = 0;
        function onDocumentMouseMove(event: any) {
            mouseX = event?.clientX - window.innerWidth / 2;
            mouseY = event?.clientY - window.innerHeight / 2;
        }

        const clock = new THREE.Clock();

        const tick = () => {
            const elapsedTime = clock.getElapsedTime();

            if (mouseX == undefined) {
                mouseX = 0.185;
                mouseY = 1.615;
            }
            starGeo.translate(0.01, 0.01, -0.01);

            // starGeo.verticesNeedUpdate = true;
            targetX = mouseX * 0.01;
            targetY = mouseY * 0.01;

            if (gltfRef) {
                gltfRef.rotation.x = targetY * 0.05 * elapsedTime;
                gltfRef.rotation.y = targetX * 0.05 * elapsedTime;
                gltfRef.rotation.z = targetY * 0.05;
                gltfRef.position.x = targetX * 0.02 * elapsedTime;
                gltfRef.position.y = -targetY * 0.05;
                gltfRef.position.z = -targetY * 0.5;
            }

            // Render
            renderer.render(scene, camera);

            // Call tick again on the next frame
            window.requestAnimationFrame(tick);
        };

        tick();
    });

    return <canvas className="webgl"></canvas>;
}
