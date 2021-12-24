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
        THREE.Cache.enabled = true;
        let i = 0;

        const sliderLoader  = ():void => {
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
            
            i++;
            if (i === slider.length) {
                i = 0;
            }
            
        };
        sliderLoader();
        setInterval(sliderLoader, 8000);
    });

    return <canvas id="canvas"></canvas>;
}
