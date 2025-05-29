const container = document.querySelector('.container');

container.addEventListener('mousemove', (e) => {
    const { offsetX, offsetY } = e; // موقعیت موس نسبت به container
    const { offsetWidth, offsetHeight } = container; // اندازه container

    // محاسبه میزان چرخش بر اساس موقعیت موس
    const rotateX = ((offsetY - offsetHeight / 2) / offsetHeight) * 25; // چرخش حول محور X
    const rotateY = ((offsetX - offsetWidth / 2) / offsetWidth) * 25; // چرخش حول محور Y

    // اعمال چرخش به container
    container.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

container.addEventListener('mouseleave', () => {
    // بازگرداندن container به حالت اولیه وقتی موس خارج می‌شود
    container.style.transform = 'rotateX(0deg) rotateY(0deg)';
});

function playAudio() {
    try {
        document.getElementById('myAudio').play();
        document.getElementById('playButton').style.display = 'none';
    } catch (error) {
        console.error('Error playing audio:', error);
    }
}

// ذرات موس
let debounceTimer;

if (!window.matchMedia("(max-width: 768px)").matches) {
    document.addEventListener('mousemove', function (e) {
        if (debounceTimer) clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            createParticle(e.clientX, e.clientY);
        }, 10);
    });
}

function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    document.body.appendChild(particle);

    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;
    particle.style.left = `${x + scrollX - 5}px`;
    particle.style.top = `${y + scrollY - 5}px`;

    setTimeout(() => {
        particle.remove();
    }, 1000);
}

fetch('https://raw.githubusercontent.com/Khomeninii/khomeninii/main/README.md')
    .then(res => res.text())
    .then(data => {
        document.getElementById('readme-content').textContent = data;
    })
    .catch(err => {
        document.getElementById('readme-content').textContent = 'خطا در بارگذاری README.md';
        console.error(err);
    });
