import React, { ReactElement, useEffect } from 'react';
import * as THREE from 'three';
import { Slider } from '../config/interface';

interface Props {
    slider: Slider[];
}

export default function Banner({ slider }: Props): ReactElement {
    useEffect(() => {
        // instantiate a loader
        const loader = new THREE.ImageLoader();
        let i = 0;
        setInterval(() => {
            const resource = slider[i];
            const resourceUrl = resource?.Picturehandle;
            // load a image resource
            loader.load(
                // resource URL
                resourceUrl,

                // onLoad callback
                (image) => {
                    // use the image, e.g. draw part of it on a canvas
                    const canvas = document.getElementById(
                        'canvas',
                    ) as HTMLCanvasElement;
                    canvas.height = image.height;
                    canvas.width = image.width;
                    // @eslint-disable-next-line
                    const context = canvas.getContext('2d');
                    if (context) {
                        context.drawImage(image, 0, 0);
                    }
                },

                // onProgress callback currently not supported
                undefined,

                // onError callback
                () => {
                    console.error('An error happened.');
                },
            );
            
            if (i === slider.length -1) {
                i = 0;
            }
            
            i++;
        }, 5000);
    }, []);

    return <canvas id="canvas"></canvas>;
}
