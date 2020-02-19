class Background {
    constructor(count) {
        this._count = count
    }

    _nodes = [];

    add(x, w, h, speed, color_idx) {
        this._nodes.push(new Graph({
            x,
            y: -10,
            w,
            h,
            color: stars_colors[color_idx],
            speed
        }))
    }

    draw() {
        if (this._nodes.length < this._count) {
            this.add(random(0, width), random(1, 2), random(1, 2), random(1, 3), random(0, stars_colors.length - 1))
        }
        this._nodes.map((el, i) => {
            if (el.y > height) {
                this._nodes.splice(i, 1)
            } else {
                el.draw();
                el.y += el.speed
            }
        })
    }
}

class Player {
    constructor() { }

    _bullet = [];

    _lastFire = Date.now();

    _score = 0;

    username = 'NoName';

    _lastBoost = Date.now();

    _speed = player_speed;

    _player = new Graph({
        img: img_starship,
        x: (width / 2) - 50,
        y: height - 110,
        w: 100,
        h: 100
    });

    time = {
        min: 0,
        sec: 0,
        ms: 0
    };

    draw() {
        this._player.image()
    }

    move() {
        if (key.isDown('KeyD') && this._player.x < width - 110) this._player.x += this._speed;
        if (key.isDown('KeyA') && this._player.x > 10) this._player.x -= this._speed;
        if (key.isDown('KeyW') && this._player.y > 0) this._player.y -= this._speed;
        if (key.isDown('KeyS') && this._player.y < height - 110) this._player.y += this._speed;
    }

    startFire() {
        if (this._bullet.length != 0) {
            this._bullet.map((el, idx) => {
                if (el.y < -50) {
                    this._bullet.splice(idx, 1)
                } else {
                    el.image();
                    el.y -= bullet_speed
                }
            })
        }
        if (key.isDown('Space') && Date.now() - this._lastFire > 200) {
            this._bullet.push(new Graph({
                img: img_bullet,
                x: this._player.x,
                y: this._player.y,
                w: 100,
                h: 100
            }));

            this._lastFire = Date.now()
        }
    }

    boost() {
        if (key.isDown('ShiftLeft') && Date.now() - this._lastBoost > 5000) {
            this._speed = boost_speed;
            this._lastBoost = Date.now()
        }
        if (!key.isDown('ShiftLeft') && this._speed > player_speed || Date.now() - this._lastBoost > 2000) {
            this._speed = player_speed
        }
    }

    writeTip() {
        const element = document.createElement('p');

        element.classList.add('score');

        element.style.position = 'absolute';
        element.style.color = 'white';
        element.style.top = String(height - 40) + 'px';
        element.style.left = '10px';

        element.innerHTML = 'To  enable boost for 2 seconds, press "Shift"';

        document.body.appendChild(element);

        return element
    }

    collision(_enemy = []) {
        _enemy.map((enemy, idx) => {
            this._bullet.map(bullet => {
                if (
                    isCollision(
                        { x: bullet.x, y: bullet.y, width: 30, height: 20 },
                        { x: enemy.x, y: enemy.y, width: enemy.w, height: enemy.h - 50 }
                    )
                ) {
                    _enemy.splice(idx, 1);
                    this._bullet.splice(bullet, 1);
                    this._score += 1
                }
            })
            if (
                isCollision(
                    { x: this._player.x, y: this._player.y, width: this._player.w, height: this._player.h },
                    { x: enemy.x, y: enemy.y, width: enemy.w, height: enemy.h }
                )
            ) {
                tableCreator(this.username, document.querySelector('.time').innerHTML, this._score);
                setGame(gameOver);
                createScore(this.username, document.querySelector('.time').innerHTML, this._score)
            }
        })
    }

    timer() {
        this.time.ms++;

        if (this.time.ms === 100) {this.time.ms = 0; this.time.sec++}
        if (this.time.sec === 60) {this.time.sec = 0; this.time.min++}

        document.querySelector('.time').innerHTML = `${this.time.min < 10 ? '0' + this.time.min : this.time.min}:${this.time.sec < 10 ? '0' + this.time.sec : this.time.sec}`
    }
}

class Enemy {
    constructor(count) {
        this._count = count
    }

    _nodes = [];
    _lastCreateEnemy = Date.now();

    add(x, speed) {
        this._nodes.push(new Graph({
            img: img_enemy,
            x, y: -100,
            w: 100, h: 100,
            speed
        }))
    }

    draw() {

        if (this._nodes.length < this._count && Date.now() - this._lastCreateEnemy > 1000) {
            this.add(random(0, width - 120), random(1, 3));
            this._lastCreateEnemy = Date.now()
        }

        this._nodes.map((el, idx) => {
            if (el.y > height) {
                this._nodes.splice(idx, 1)
            } else {
                el.image();
                el.y += el.speed
            }
        })
    }

}

