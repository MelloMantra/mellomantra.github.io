// imports

document.addEventListener("DOMContentLoaded", () => {  
    let topButton = document.getElementById("bttButton");
    let topText = document.getElementById("topText");
    let adjective = document.getElementById("wordscroll");
    var wordIndex = 0;
    var words = ["programmer", "musician", "maker", "engineer", "composer", "speedrunner", "dreamer", "producer", "gamer", "TASer", "artist", "creator."];

    window.onscroll = function( ) {scrollFunction()};
    topText.onclick = function( ) {topFunction()};
    topButton.onclick = function( ) {topFunction()};

    //Scrolly stuff
    gsap.registerPlugin(ScrollTrigger);

    // lenis
    const lenis = new Lenis();

    lenis.on('scroll', (e) => {
        console.log(e);
    })

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);


    // functions

    function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    function typingAnimation() {
        taptap(0);
        setTimeout(typewrite(words[wordIndex],0),1000);
        taptap(0);
        backspace();
        wordIndex++;
        if (wordIndex<12) {
            setTimeout(typingAnimation(),1000);
        }
    }

    function taptap(taps) {
        if (taps<7) {
            if (adjective.innerHTML.charAt(adjective.innerHTML.length-1)=="█") {
                adjective.innerHTML = adjective.innerHTML.substring(0, adjective.innerHTML.length-1);
            } else {
                adjective.innerHTML += "█";
            }
            setTimeout(taptap(taps+1),1000);
        }
    }

    function backspace() {
        adjective.style.backgroundColor = "darkslateblue";
        adjective.style.color = "white";
        setTimeout(function() {
            adjective.style.color = "darkslateblue";
            adjective.style.backgroundColor = "white";
            adjective.innerHTML = "";
        }, 1000)
    }

    function typewrite(text, index) {
        if (index<text.length) {
            adjective.innerHTML += text.charAt(index);
            setTimeout(typewrite(text, index+1),100);
        }
    }

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            topButton.style.display = "block";
        } else {
            topButton.style.display = "none";
        }
    }

    
});