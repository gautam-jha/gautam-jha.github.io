import React, { ReactElement } from 'react';

export default function Branching(): ReactElement {
    React.useEffect(() => {
        // instantiate a loader

        // Canvas
        const canvas = document.querySelector(
            'canvas.webgl',
        ) as HTMLCanvasElement;

        var WIDTH: number, HEIGHT: number;

        let context = canvas.getContext('2d');

        var branches: any, mouseX: any, mouseY: any;

        init();
        setInterval(loop, 1000 / 120);
        function startup() {
            var el = canvas;

            el.addEventListener('touchstart', onWindowMouseMove, false);
            el.addEventListener('touchend', onWindowMouseMove, false);
            el.addEventListener('touchcancel', onWindowMouseMove, false);
            el.addEventListener('touchmove', onWindowMouseMove, false);
        }

        document.addEventListener('DOMContentLoaded', startup);
        function init() {
            WIDTH = window.innerWidth;
            HEIGHT = window.innerHeight;
            if (canvas) {
                canvas.width = WIDTH;
                canvas.height = HEIGHT;
            }
            if (context) {
                context.fillStyle = 'rgb(0, 0, 0)';
                context.fillRect(0, 0, WIDTH, HEIGHT);
            }
            branches = new Array();

            window.addEventListener('mousemove', onWindowMouseMove, false);
        }

        function onWindowMouseMove(event: any) {
            mouseX = event.clientX;
            mouseY = event.clientY;
        }

        function loop() {
            if (branches.length < 500) {
                const arr: any = new (Branch as any)(mouseX, mouseY);
                branches.push(arr);
            }
            if (context) {
                context.beginPath();
                context.strokeStyle = '#f80';
            }
            for (var i = 0; i < branches.length; i++) {
                var branch = branches[i];
                branch.life++;

                if (branch.life > 500) {
                    branches.shift();
                    continue;
                }
                if (context) {
                    context.moveTo(branch.x, branch.y);
                }
                branch.rw += Math.random() - 0.5;
                branch.x += Math.cos(branch.rw);
                branch.y += Math.sin(branch.rw);
                if (context) {
                    context.lineTo(branch.x, branch.y);
                }
            }
            if (context) {
                context.stroke();
                context.closePath();

                context.fillStyle = 'rgba(17, 17, 17, 0.1)';
                context.fillRect(0, 0, WIDTH, HEIGHT);
            }
        }

        var Branch = function (this: any, x: any, y: any) {
            this.life = 0;
            this.x = x;
            this.y = y;
            this.rw = Math.random() * 360;
        };
    });

    return <canvas className="webgl"></canvas>;
}
