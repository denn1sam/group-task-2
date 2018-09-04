var ctx = canvas.getContext('2d'),
    columns = 3,
    rows = 3,
    w, h, tileWidth, tileHeight;

canvas.onresize = calcSize;
canvas.onmousemove = highlight;

calcSize();

function checkBorderColor() {
    let colorBtn = document.getElementById('bg-color');
    return colorBtn.value;
}
function checkBlockColor() {
    let colorBtn = document.getElementById('block-color');
    return colorBtn.value;
}

document.getElementById('generate-btn').addEventListener('click', GenerateNew);

function GenerateNew() {
    ctx.strokeStyle = checkBorderColor();
    ctx.fillStyle = checkBlockColor();
//    canvas.style.canvas = 'border: 1x solid ' + checkBorderColor();
    render();
}
function calcSize() {
    canvas.width = w = window.innerWidth / 2;
    canvas.height = h = window.innerHeight / 2;

    tileWidth = w / columns;
    tileHeight = h / rows;
    
    ctx.strokeStyle = '#929292';
    ctx.fillStyle = '#ff7700';
    
    render();
}
function render() {

    ctx.clearRect(0, 0, w, h);

    ctx.beginPath();

    for (var x = 0; x < columns; x++) {
        ctx.moveTo(x * tileWidth, 0);
        ctx.lineTo(x * tileWidth, h);
    }
    for (var y = 0; y < rows; y++) {
        ctx.moveTo(0, y * tileHeight);
        ctx.lineTo(w, y * tileHeight);
    }
    
    ctx.stroke();
}
function highlight(e) {

    var rect = canvas.getBoundingClientRect(),
        mx = e.clientX - rect.left,
        my = e.clientY - rect.top,

        /// get index from mouse position
        xIndex = Math.round((mx - tileWidth * 0.5) / tileWidth),
        yIndex = Math.round((my - tileHeight * 0.5) / tileHeight);

    render();

    ctx.fillRect(xIndex * tileWidth,
        yIndex * tileHeight,
        tileWidth,
        tileHeight);

}