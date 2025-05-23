function drawMiZiGe(ctx,width,height, outterColor=null,innerColor=null){
    ctx.clearRect(0, 0, width, height);

    // 绘制外围实线
    ctx.strokeStyle = outterColor || '#f00';
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, width, height);

    // 绘制内部虚线
    ctx.strokeStyle =innerColor|| '#f99';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.moveTo(0, 0);
    ctx.lineTo(width, height);
    ctx.moveTo(width, 0);
    ctx.lineTo(0, height);
    ctx.stroke();
    ctx.setLineDash([]);
}
// 通过canvas增加触摸手写支持
function enableHandwriting(canvas) {
    const ctx = canvas.getContext('2d');
    let isDrawing = false;

    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        ctx.beginPath();
        ctx.moveTo(touch.clientX - rect.left, touch.clientY - rect.top);
        isDrawing = true;
    });

    canvas.addEventListener('touchmove', (e) => {
        if (!isDrawing) return;
        e.preventDefault();
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        ctx.lineTo(touch.clientX - rect.left, touch.clientY - rect.top);
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.stroke();
    });

    canvas.addEventListener('touchend', () => {
        isDrawing = false;
    });
}
