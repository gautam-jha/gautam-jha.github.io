import React, { ReactElement, useEffect } from 'react'
import * as THREE from 'three'

interface Props {
    slider: any
}

export default function Banner({ slider }: Props): ReactElement {

    useEffect(() => {
        // instantiate a loader
        const loader = new THREE.ImageLoader();

        // load a image resource
        loader.load(
            // resource URL
            './slider/bg1.jpg',

            // onLoad callback
            function (image) {
                // use the image, e.g. draw part of it on a canvas
                // const canvas = <HTMLCanvasElement> document.querySelector('#canvas');
                const canvas = document.getElementById('canvas')  as HTMLCanvasElement;
                canvas.height = image.height;
                canvas.width = image.width;
                // @eslint-disable-next-line
                const context = canvas.getContext('2d'); 
                if(context){
                    context.drawImage(image, 0, 0);
                }
            },

            // onProgress callback currently not supported
            undefined,

            // onError callback
            function () {
                console.error('An error happened.');
            }
        );
    }, [])

    return (
        <canvas id="canvas">

        </canvas>
    )
}
