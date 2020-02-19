const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function isCollision(rect1 = {}, rect2 = {}) {
    return rect1.x < rect2.x + rect2.width &&
           rect2.x < rect1.x + rect1.width &&
           rect1.y < rect2.y + rect2.height &&
           rect2.y < rect1.y + rect1.height
}

async function createScore(name, time, score) {
    return await fetch('http://localhost:5000/api/score/create', {
        method: "POST",
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify({name, time, score})
    })
}

async function getScore() {
    return await fetch('http://localhost:5000/api/score')
        .then(res => res.json())
}

async function tableCreator(name, time, score) {
    getScore().then(res => {
        let
            lst = res.scores;

        lst.push({name: '+| '+name+' |+', time: time, score: score});

        lst.sort((a, b) => {
            if (a.score > b.score){return -1}
            if (b.score > a.score){return 1}
            return 0;
        });

        for (let i = 0; i < 10; i++){
            let str = document.createElement('tr');
            str.className = "str" + String(i);
            document.querySelector('.tbody').append(str);

            let element = document.createElement('th');
            element.innerHTML = String(i + 1);
            document.querySelector('.' + "str" + String(i)).append(element);

            element = document.createElement('th');
            element.innerHTML = lst[i].name;
            document.querySelector('.' + "str" + String(i)).append(element);

            element = document.createElement('th');
            element.innerHTML = lst[i].time;
            document.querySelector('.' + "str" + String(i)).append(element);

            element = document.createElement('th');
            element.innerHTML = lst[i].score;
            document.querySelector('.' + "str" + String(i)).append(element);

        }
    })
}