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
    let chart = document.getElementById('tbody');
    let betwiz = document.getElementById("betwizard");
    let actiondropdown = document.querySelector(".dropdown");
    if (actiondropdown!=null) {let namesdropdown = document.querySelectorAll(".dropdown")[1]};

    var data = [
        {name: "P1 Average", scores: [85, 88.5], overunder: [0,0]},
        {name: "P4 Average", scores: [85, 82.5], overunder: [0,0]}
    ]

    var users = [
        {username: "Matteo", password: "password", email: "mgdr0777@gmail.com", points: 5}
    ]

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

    // populate table
    function loadTable(items) {
        items.forEach(item => {
            let row = chart.insertRow();
            let namecell = row.insertCell(0);
            namecell.innerHTML = '"'+item.name+'"';
            namecell.style.textAlign = "center";
            namecell.style.paddingRight = "50px";
            namecell.style.paddingLeft = "50px";

            var g = 0;
            for (var j=0; j<item.scores.length; j++) {
                g += item.scores[j];
            }
            g /= item.scores.length;
            let gradecell = row.insertCell(1);
            gradecell.innerHTML = g.toString();
            gradecell.style.fontWeight = "bold";
            gradecell.style.paddingLeft = "30px";
            gradecell.style.paddingRight = "30px";
            gradecell.style.textAlign = "center";

            var trend = Math.round(((item.scores[item.scores.length-1]-item.scores[item.scores.length-2]) + Number.EPSILON) * 100) / 100;
            let trendcell = row.insertCell(2);
            if (trend>0 && Math.abs(trend)>=2.5) {
                var color = "green";
                var icon = "▲";
                trend = "+"+trend;
                trendcell.style.backgroundColor = "rgba(85, 204, 61, 0.5)";
            } else if (trend<0 && Math.abs(trend)>=2.5) {
                var color = "red";
                var icon = "▼";
                trendcell.style.backgroundColor = "rgba(247, 126, 126, 0.5)";
            } else {
                var color = "black";
                var icon = "◀";
            }
            trend = trend+" "+icon;
            trendcell.innerHTML = trend;
            trendcell.style.color = color;
            trendcell.style.textAlign = "center";
            trendcell.style.borderRadius = "5px";
        });
    }

    if (chart!=null) {
        loadTable(data);
    }

    // populate dropdown
    function popDrop(data, menu) {
        
    }

    if (chart!=null) {
        var names = []
        for (var i=0; i<data.length; i++) {
            names.append(data[i].name);
        }
        popDrop(names, namesdropdown);
        popDrop(["Over", "Under"], actiondropdown);
    }

});
