import React from 'react';
import * as THREE from 'three';

export const Particles = () => {
    React.useEffect(() => {
        // mouse
        const mouse = {
            x: 0,
            y: 0,
        };

        function animateParticle(event: any) {
            mouse.x = event.clientX;
            mouse.y = event.clientY;
        }
        // Canvas
        const canvas = document.querySelector('canvas.webgl');

        // Scene
        const scene = new THREE.Scene();

        // texture
        const textureLoader = new THREE.TextureLoader();
        const star = textureLoader.load('../star.png');

        // Objects
        const geometry = new THREE.TorusGeometry(0.7, 0.2, 16, 100);

        const particlesGeometry = new THREE.BufferGeometry();

        const particleCount = 5000;
        const posArray = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i++) {
            posArray[i] = (Math.random() * 2 - 1) * (Math.random() * 5);
        }

        particlesGeometry.setAttribute(
            'position',
            new THREE.BufferAttribute(posArray, 3),
        );

        // Materials
        const material = new THREE.PointsMaterial({
            size: 0.007,
        });

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.002,
            map: star,
            transparent: true,
            color: '#e2effb',
            // blending: THREE.AdditiveBlending,
        });

        // Mesh
        const sphere = new THREE.Points(geometry, material);
        const particleMesh = new THREE.Points(
            particlesGeometry,
            particlesMaterial,
        );
        scene.add(sphere, particleMesh);
        // scene.add()

        // Lights

        const pointLight = new THREE.PointLight(0xffffff, 0.1);
        pointLight.position.x = 2;
        pointLight.position.y = 3;
        pointLight.position.z = 4;
        scene.add(pointLight);

        /**
         * Sizes
         */
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight,
        };

        /**
         * Camera
         */
        // Base camera
        const camera = new THREE.PerspectiveCamera(
            75,
            sizes.width / sizes.height,
            0.1,
            100,
        );
        camera.position.x = 0;
        camera.position.y = 0;
        camera.position.z = 2;
        scene.add(camera);

        // Controls
        // const controls = new OrbitControls(camera, canvas)
        // controls.enableDamping = true

        /**
         * Renderer
         */
        if (canvas) {
            const renderer = new THREE.WebGLRenderer({
                canvas: canvas,
                antialias: true,
            });
            renderer.setSize(sizes.width, sizes.height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.setClearColor(new THREE.Color('#21282a'), 1);

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

            window.addEventListener('scroll', () => {
                const scrollY = window.scrollY;
                particleMesh.position.z = scrollY * 0.0005;
                sphere.position.z = -scrollY * 0.0005;
            });

            /**
             * Animate
             */

            const clock = new THREE.Clock();

            document.addEventListener('mousemove', animateParticle);

            document.addEventListener('touchmove', animateParticle);
            setTimeout(() => {
                const tick = () => {
                    const elapsedTime = clock.getElapsedTime();

                    particleMesh.rotation.y += 0.0003;

                    if (mouse.x > 0 && mouse.y > 0) {
                        particleMesh.position.x = mouse.x / sizes.width;
                        particleMesh.position.y = mouse.y / sizes.height;
                    }

                    // Update objects
                    sphere.rotation.y = 0.5 * elapsedTime;
                    sphere.rotation.x = 0.01 * elapsedTime;

                    // if mouse is left of center
                    if (mouse.x < window.innerWidth / 2) {
                        sphere.rotation.y =
                            0.0005 *
                            elapsedTime *
                            (mouse.x - window.innerWidth / 2);
                    }

                    // if mouse is right of center
                    if (mouse.x > window.innerWidth / 2) {
                        sphere.rotation.y =
                            0.0005 *
                            elapsedTime *
                            (mouse.x - window.innerWidth / 2);
                    }

                    // if mouse is left of center
                    if (mouse.x < window.innerHeight / 2) {
                        sphere.rotation.x =
                            0.0005 *
                            elapsedTime *
                            (mouse.y - window.innerWidth / 2);
                    }

                    // if mouse is right of center
                    if (mouse.x > window.innerHeight / 2) {
                        sphere.rotation.x =
                            0.0005 *
                            elapsedTime *
                            (mouse.y - window.innerWidth / 2);
                    }

                    // Update Orbital Controls
                    // controls.update()

                    // Render
                    renderer.render(scene, camera);

                    // Call tick again on the next frame
                    window.requestAnimationFrame(tick);
                };
                tick();
            }, 3000);
        }
    }, []);
    return (
        <div className="container slider" id="galaxy-banner">
            <canvas className="webgl"></canvas>
        </div>
    );
};
