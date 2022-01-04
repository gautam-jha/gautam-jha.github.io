import React, { ReactElement } from 'react';
import * as THREE from 'three';
import { doomApp } from './assets/doomApp';

export default function MrDoob(props: { path: string }): ReactElement {
    React.useEffect(() => {
        // instantiate a loader

        // Canvas
        const container = document.querySelector(
            '.container',
        ) as HTMLCanvasElement;

        var loader = new THREE.FileLoader();
        setTimeout(() => {
            loader.load(props.path, function (text: any) {
                var player = new doomApp.Player();
                player.load(JSON.parse(text));
                player.setSize(window.innerWidth, window.innerHeight);
                player.play();
                container.innerHTML = '';
                container.appendChild(player.dom);

                window.addEventListener('resize', function () {
                    player.setSize(window.innerWidth, window.innerHeight);
                });
            });
        }, 2500);
    },[props.path]);

    return <div className="container slider" id="galaxy-banner"></div>;
}
