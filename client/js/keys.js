class Keys{
    constructor(){
        this.init()
    };

    _keyDown = [];

    init(){
        document.addEventListener('keyup', (e) => {
            this._clear(e.code);
        });
        document.addEventListener('keydown', (e) => {
            this._set(e.code);
        })
    }

    _set(code){
        this._keyDown[code] = true
    }

    _clear(code){
        this._keyDown[code] = false
    }

    isDown(code){
        return this._keyDown[code]
    }
}

const key = new Keys();