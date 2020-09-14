const btnCreate = document.querySelector('.btnCreateVertex');
const vertexValue = document.querySelector('.vertexInput');
const dataEntry = document.querySelector('.dataEntry');
const btnResult = document.querySelector('.result');

btnCreate.addEventListener('click', getValue);

function getValue() {
    const valueOfInput = vertexValue.value;
    if (!valueOfInput) {
        alert('Поле пустое');
        return;
    }
    dataEntry.textContent = '';
    for (let i = valueOfInput; i > 0; i--) {
        dataEntry.insertAdjacentHTML('afterbegin',
            `
        <div class="row mt-2"> 
            <div>G<sup>-</sup>(${i}) = </div>
            <input type="text" class="inputOfNumbers">
        </div>
        `
        )
    }
    // btnOutMatrix.style.display = 'block';
    btnResult.addEventListener('click', Result);
}

function Result() {
    let data = getData();

    let matrixA = getAfromGminus(data);
    let Gplus = getGplusFromA(matrixA);

    outputMatrixA(matrixA);
    outputGplus(Gplus);

}

function getData() {
    let dataOfInputs = Array.from(document.querySelectorAll('.inputOfNumbers'), el => el.value);

    return dataOfInputs;
}

function getAfromGminus(data) {
    let arr = [];

    for (let t = 0; t < data.length; t++) {
        arr[t] = data[t].split(',');
    }
    for (let el in arr) {
        arr[el] = arr[el].map(parseFloat);
    }


    let matrixA = new Array();
    for (let i = 0; i < arr.length; i++) {
        matrixA[i] = new Array();
        for (let j = 0; j < arr.length; j++) {
            matrixA[i][j] = 0;
        }
    }

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (!isNaN(arr[i][j])) {
                matrixA[arr[i][j] - 1][i] = 1;
            }
        }
    }

    console.log(matrixA);

    return matrixA;
}

function getGplusFromA(matrixA) {
    var G = new Array();

    for (let i = 0; i < matrixA.length; i++) {
        G[i] = new Array();
        for (let j = 0; j < matrixA[i].length; j++) {
            if (matrixA[i][j] == 1) {
                G[i].push(j + 1);
            }
        }
    }

    return G;
}

function outputMatrixA(matrixA) {
    var node = document.querySelector('.matrix-output');

    for (var i = 0; i < matrixA.length; i++) {
        var row = node.insertRow();

        for (var j = 0; j < matrixA[0].length; j++) {
            var cell = row.insertCell();
            var number = document.createTextNode(matrixA[i][j]);
            cell.appendChild(number);
        }
    }
}

function outputGplus(G) {
    const dataEntry = document.querySelector('.data-output')

    for (let i = 0; i < G.length; i++) {
        var i1 = i + 1
        dataEntry.innerHTML += `<li class="list-group-item">G<sup>+</sup>` + '(' + i1 + ') = ' + '[ ' + G[i] + ' ]' + '</li>'
    }
}