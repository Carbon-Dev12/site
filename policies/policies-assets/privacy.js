
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

function addPrintButton() {
    const btn = document.createElement('button');
    btn.textContent = 'Print / Save as PDF';
    btn.style.cssText = 'position:fixed; bottom:20px; right:20px; padding:10px 20px; background:#0f0; color:#000; border:none; border-radius:8px; cursor:pointer; z-index:9999;';
    btn.onclick = () => window.print();
    document.body.appendChild(btn);
}
addPrintButton();
// VISIBLE PURPLE RAIN — 100% works
const rainContainer = document.createElement('div');
rainContainer.className = 'rain-container';
document.body.appendChild(rainContainer);

function createDrop() {
    const drop = document.createElement('div');
    drop.className = 'drop';
    drop.style.left = Math.random() * 100 + 'vw';
    drop.style.animationDuration = (Math.random() * 3 + 2) + 's';
    drop.style.opacity = Math.random() * 0.6 + 0.4;
    rainContainer.appendChild(drop);
    setTimeout(() => drop.remove(), 5000);
}
setInterval(createDrop, 80);

// Print button
const btn = document.createElement('button');
btn.id = 'print-btn';
btn.innerHTML = '<i class="fas fa-download"></i> Save as PDF';
btn.onclick = () => window.print();
document.body.appendChild(btn);