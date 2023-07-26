let side = 16
let penType = 'black'
const createGridButton = document.querySelector('.btn')
const clearGridButton = document.querySelector('.clear')
createGridButton.addEventListener('click',() => {
    getGridSize()
    generateGrid()
})

clearGridButton.addEventListener('click',() => {
    const squares = document.querySelectorAll('.square')
    squares.forEach((square) => {
        square.style.backgroundColor = 'white'
    })
})

function getGridSize() {
    let gridsize = null // you made a mistake here by using const
    while(isNaN(gridsize) || gridsize === null || gridsize < 0 || gridsize > 100){
        gridsize = prompt("Enter a number between 1 and 100 only")
    }
    side = Number(gridsize)
}

function checkPenType() {
    const radioButtons = document.querySelectorAll('input[type="radio"][name="pen"]');
    radioButtons.forEach(radioButton => {
        if (radioButton.checked) {
          penType = radioButton.value; 
        }
      });
}

function generateRandomColor() {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
}

function darkenSquare(square) {
    const currentColor = square.style.backgroundColor || 'rgb(255, 255, 255)'; //or condition is used because for white cell , background color isnt actually set yet.
    const rgbValues = currentColor.match(/\d+/g);
    const newR = Math.max(rgbValues[0] - 25.5, 0);
    const newG = Math.max(rgbValues[1] - 25.5, 0);
    const newB = Math.max(rgbValues[2] - 25.5, 0);
    square.style.backgroundColor = `rgb(${newR}, ${newG}, ${newB})`;
}

function generateGrid () {
    //for clearing grid
    const container = document.querySelector('.container')
    container.innerHTML = ''

    checkPenType()
    
    for (let i=0;i<side;i++) {
        const row = document.createElement('div')
        row.classList.add('row')
        row.style.display = 'flex'
        row.style.flex = '1'
        for (let i = 0 ; i < side ; i++) {
            const square = document.createElement('div')
            square.classList.add('square')
            square.style.minWidth = '1px'
            square.style.minHeight = '1px'
            square.style.border = '2px solid black'
            square.style.flex = '1'
            row.appendChild(square)
        }
        container.appendChild(row)
    }

    const radioButtons = document.querySelectorAll('input[type="radio"][name="pen"]');
    radioButtons.forEach((radioButton) => {
        radioButton.addEventListener('change', () => {
            checkPenType();
        });
    });

    const boxes = document.querySelectorAll('.square')
    boxes.forEach((box) => {
        box.addEventListener('mouseenter',()=> {
        if (penType === 'black') {
            box.style.backgroundColor = 'black';
        } else if (penType === 'rainbow') {
            box.style.backgroundColor = generateRandomColor();
        } else {
            darkenSquare(box)
        }
      })
    })
}


generateGrid()