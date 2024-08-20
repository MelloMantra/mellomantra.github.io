document.addEventListener("DOMContentLoaded", () => {
    var coords = {x: 0, y: 0};
    var mouseMagnifier = 1;
    var fadingOut = false;
    let blobs = document.querySelectorAll(".blob");
    let mouse = document.querySelector(".mouse");
    let topButton = document.getElementById("bttButton");
    let topText = document.getElementById("topText");
    let typetext = document.getElementById("typetext");
    let cursor = document.getElementById('cursor');
    const words = ["programmer.", "musician.", "maker.", "engineer.", "composer.", "speedrunner.", "dreamer.", "producer.", "gamer.", "student.", "artist.", "creator."];

    // back to tops
    window.onscroll = function( ) {scrollFunction()};
    topText.onclick = function( ) {topFunction()};
    topButton.onclick = function( ) {topFunction()};

    function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    const scrollFunction = async() => {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            topButton.style.display = "block";
        } else {
            topButton.style.display = "none";
        }
    }

    // scrolly text
    gsap.registerPlugin(ScrollTrigger);

    const splitTypes = document.querySelectorAll('.reveal-type')

    splitTypes.forEach((char,i) => {

        const text = new SplitType(char, { types: 'chars'})

        gsap.from(text.chars, {
            scrollTrigger: {
                trigger: char,
                start: 'top 100%',
                end: 'top 50%',
                scrub: true,
                markers: false
            },
            y: -20,
            opacity: 0,
            stagger: 0.1
        });

    });

    // lenis smooth scroll
    const lenis = new Lenis();

    lenis.on('scroll', (e) => {
        console.log(e);
    })

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // typewriter text

    var wordIndex = 0;
    const writeLoop = async () => {
        while (true) {
            typetext.innerHTML = "";
            typetext.style.backgroundColor = 'inherit';
            typetext.style.color = 'black';
            cursor.style.display = 'inline-block';
            await sleep(1000);
            let word = words[wordIndex];
            let sleeptime = 500/word.length + Math.random()*100;
            for (let i=0; i<word.length; i++) {
                typetext.innerHTML += word.charAt(i);
                await sleep(sleeptime);
            }
            if (wordIndex==words.length-1) {
                wordIndex = 0;
            } else {
                wordIndex++;
            }
            await sleep(2000);
            typetext.style.backgroundColor = 'black';
            typetext.style.color = 'white';
            cursor.style.display = 'none';
            await sleep(400);
        }
    }

    writeLoop();

    function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    // mouse followers

    /*document.addEventListener("mouseover", (e) => {
        if (e.target.matches(".hover-type")) {
            mouseMagnifier = 3;
        }
    })

    document.addEventListener("mouseout", (e) => {
        if (e.target.matches(".hover-type")) {
            mouseMagnifier = 1;
        }
    })*/

    blobs.forEach(function(blob) {
        blob.x = 0;
        blob.y = 0;
        blob.style.backgroundColor = "white";
    });

    document.addEventListener("mousemove", (e) => {
        coords.x = e.clientX;
        coords.y = e.clientY;
    });

    function animateBlobs() {
        let x = coords.x;
        let y = coords.y;

        mouse.style.left = x;
        mouse.style.top = y;

        blobs.forEach(function(blob, index) {
            const scrollLeft = (window.scrollX !== undefined) ? window.scrollX : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
            const scrollTop = (window.scrollY !== undefined) ? window.scrollY : (document.documentElement || document.body.parentNode || document.body).scrollTop;

            blob.style.left = (x - 12) + scrollLeft +"px";
            blob.style.top = (y - 12) + scrollTop + "px";
            blob.x = x;
            blob.y = y;

            blob.style.scale = ((blobs.length - index) / blobs.length) * mouseMagnifier;

            const nextBlob = blobs[index+1] || blobs[0];
            x+=(nextBlob.x - x)*0.32;
            y+=(nextBlob.y - y)*0.32;

            blob.style.zIndex = 9999 - index;
        });

        requestAnimationFrame(animateBlobs)
    }

    animateBlobs();

});