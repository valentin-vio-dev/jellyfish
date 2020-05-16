

export class BrainSignal {
    element;
    width;
    height;
    ctx;
    sensors;
    
    constructor(element) {
        this.element = element;
        this.width = element.width;
        this.height = element.height;
        this.ctx = this.element.getContext("2d");
        this.sensors = [];
        this.draw();
    }

    getInitSens() {
        return [
            {
                name: 'AF3',
                color: '#DDDDDD',
                prev: 100,
                value: 100,
                pos: {
                    x: this.width / 2.6,
                    y: this.height / 5
                }
            },
            {
                name: 'AF4',
                color: '#DDDDDD',
                prev: 100,
                value: 100,
                pos: {
                    x: this.width - (this.width / 2.6),
                    y: this.height / 5
                }
            },
            {
                name: 'F3',
                color: '#DDDDDD',
                prev: 100,
                value: 100,
                pos: {
                    x: this.width / 2.3,
                    y: this.height / 3.5
                }
            },
            {
                name: 'F4',
                color: '#DDDDDD',
                prev: 100,
                value: 100,
                pos: {
                    x: this.width - (this.width / 2.3),
                    y: this.height / 3.5
                }
            },
            {
                name: 'F7',
                color: '#DDDDDD',
                prev: 100,
                value: 100,
                pos: {
                    x: this.width / 3.5,
                    y: this.height / 3
                }
            },
            {
                name: 'F8',
                color: '#DDDDDD',
                prev: 100,
                value: 100,
                pos: {
                    x: this.width - (this.width / 3.5),
                    y: this.height / 3
                }
            },
            {
                name: 'FC5',
                color: '#DDDDDD',
                prev: 100,
                value: 100,
                pos: {
                    x: this.width / 2.9,
                    y: this.height / 2.5
                }
            },
            {
                name: 'FC6',
                color: '#DDDDDD',
                prev: 100,
                value: 100,
                pos: {
                    x: this.width - (this.width / 2.9),
                    y: this.height / 2.5
                }
            },
            {
                name: 'T7',
                color: '#DDDDDD',
                prev: 100,
                value: 100,
                pos: {
                    x: this.width / 4.2,
                    y: this.height / 2
                }
            },
            {
                name: 'T8',
                color: '#DDDDDD',
                prev: 100,
                value: 100,
                pos: {
                    x: this.width - (this.width / 4.2),
                    y: this.height / 2
                }
            },
            {
                name: 'P7',
                color: '#DDDDDD',
                prev: 100,
                value: 100,
                pos: {
                    x: this.width / 3.2,
                    y: this.height - (this.height / 4)
                }
            },
            {
                name: 'P8',
                color: '#DDDDDD',
                prev: 100,
                value: 100,
                pos: {
                    x: this.width - (this.width / 3.2),
                    y: this.height - (this.height / 4)
                }
            },
            {
                name: 'O1',
                color: '#DDDDDD',
                prev: 100,
                value: 100,
                pos: {
                    x: this.width / 2.3,
                    y: this.height - (this.height / 5.3)
                }
            },
            {
                name: 'O2',
                color: '#DDDDDD',
                prev: 100,
                value: 100,
                pos: {
                    x: this.width - (this.width / 2.3),
                    y: this.height - (this.height / 5.3)
                }
            },
        ];
    }

    initSensors() {
        this.sensors.push(
            {
                name: 'AF3',
                color: '#DDDDDD',
                prev: 100,
                value: 100,
                pos: {
                    x: this.width / 2.6,
                    y: this.height / 5
                }
            },
            {
                name: 'AF4',
                color: '#DDDDDD',
                prev: 100,
                value: 100,
                pos: {
                    x: this.width - (this.width / 2.6),
                    y: this.height / 5
                }
            },
            {
                name: 'F3',
                color: '#DDDDDD',
                prev: 100,
                value: 100,
                pos: {
                    x: this.width / 2.3,
                    y: this.height / 3.5
                }
            },
            {
                name: 'F4',
                color: '#DDDDDD',
                prev: 100,
                value: 100,
                pos: {
                    x: this.width - (this.width / 2.3),
                    y: this.height / 3.5
                }
            },
            {
                name: 'F7',
                color: '#DDDDDD',
                prev: 100,
                value: 100,
                pos: {
                    x: this.width / 3.5,
                    y: this.height / 3
                }
            },
            {
                name: 'F8',
                color: '#DDDDDD',
                prev: 100,
                value: 100,
                pos: {
                    x: this.width - (this.width / 3.5),
                    y: this.height / 3
                }
            },
            {
                name: 'FC5',
                color: '#DDDDDD',
                prev: 100,
                value: 100,
                pos: {
                    x: this.width / 2.9,
                    y: this.height / 2.5
                }
            },
            {
                name: 'FC6',
                color: '#DDDDDD',
                prev: 100,
                value: 100,
                pos: {
                    x: this.width - (this.width / 2.9),
                    y: this.height / 2.5
                }
            },
            {
                name: 'T7',
                color: '#DDDDDD',
                prev: 100,
                value: 100,
                pos: {
                    x: this.width / 4.2,
                    y: this.height / 2
                }
            },
            {
                name: 'T8',
                color: '#DDDDDD',
                prev: 100,
                value: 100,
                pos: {
                    x: this.width - (this.width / 4.2),
                    y: this.height / 2
                }
            },
            {
                name: 'P7',
                color: '#DDDDDD',
                prev: 100,
                value: 100,
                pos: {
                    x: this.width / 3.2,
                    y: this.height - (this.height / 4)
                }
            },
            {
                name: 'P8',
                color: '#DDDDDD',
                prev: 100,
                value: 100,
                pos: {
                    x: this.width - (this.width / 3.2),
                    y: this.height - (this.height / 4)
                }
            },
            {
                name: 'O1',
                color: '#DDDDDD',
                prev: 100,
                value: 100,
                pos: {
                    x: this.width / 2.3,
                    y: this.height - (this.height / 5.3)
                }
            },
            {
                name: 'O2',
                color: '#DDDDDD',
                prev: 100,
                value: 100,
                pos: {
                    x: this.width - (this.width / 2.3),
                    y: this.height - (this.height / 5.3)
                }
            },
        );
    }

    draw() {
        this.ctx.fillStyle = "#FFFFFF";
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.initSensors();
        this.drawSensors();
    }

    drawBrain() {
        this.ctx.beginPath();
        this.ctx.arc(this.width/2, this.height/2, this.width/2-20, 0, 2 * Math.PI);
        this.ctx.fillStyle = '#F4F4F4';
        this.ctx.fill();
    }

    update() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.drawBrain();

        this.ctx.beginPath();
        this.ctx.moveTo(this.width/2, 30);
        this.ctx.lineTo(this.width/2, this.height-30);
        this.ctx.strokeStyle = '#DDDDDD';
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.moveTo(30, this.height/2);
        this.ctx.lineTo(this.width-30, this.height/2);
        this.ctx.strokeStyle = '#DDDDDD';
        this.ctx.stroke()
    }

    drawSensors() {
        this.sensors.forEach(sensor => {
            this.ctx.beginPath();     
            this.ctx.arc(sensor.pos.x, sensor.pos.y, this.width/30, 0, 2 * Math.PI);
            this.ctx.strokeStyle = sensor.color + '99';
            this.ctx.lineWidth = "8";
            this.ctx.stroke();  
            this.ctx.fillStyle = sensor.color;
            this.ctx.fill();
            this.ctx.fillStyle = '#000000';
            this.ctx.font = "10px";
            this.ctx.textAlign = "center";
            this.ctx.fillText(sensor.name, sensor.pos.x, sensor.pos.y+4);
            this.ctx.fillStyle = '#000000';
            this.ctx.fillText(sensor.value, sensor.pos.x, sensor.pos.y-20);
        }); 
        this.ctx.lineWidth = "1";
    }

    updateSensors(data) {
        if(data.length != this.sensors.length) {
            return;
        }

        for(let i=0;i<this.sensors.length;i++) {
            this.sensors[i].value = data[i];
        }

        this.updateSensorColors();
        this.update();
        this.drawSensors();
    }

    updateSensorColors() {
        for(let i=0;i<this.sensors.length;i++) {
            let diff = Math.abs(this.sensors[i].value - this.sensors[i].prev);
            if(this.sensors[i].value > this.sensors[i].prev) {
                if(diff > 200) {
                    this.sensors[i].color = '#3b16f2';
                }
            }else{
                if(diff > 10) {
                    this.sensors[i].color = '#DDDDDD';
                }
            }

            this.sensors[i].prev = this.sensors[i].value;
        }
    }

    updateSize(size) {
        this.width = size;
        this.height = size;
        for(let i=0;i<this.sensors.length;i++) {
            this.sensors[i].pos = this.getInitSens()[i].pos;
        }
    }
}