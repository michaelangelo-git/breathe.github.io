
/* FUNCTION GRAVEYARD
let box1 = document.querySelector('.count-one');
let box2 = document.querySelector('.count-two');
let box3 = document.querySelector('.count-three');
let box4 = document.querySelector('.count-four');
let elements = [box1, box2, box3, box4];
let count = 0;

// Returns a Promise that resolves after "ms" Milliseconds
const timer = ms => new Promise(res => setTimeout(res, ms))

async function breathInBoxAnimation() { // We need to wrap the loop into an async function for this to work
    for (var i = 0; i < elements.length; i++) {
        elements[i].animate([
            { opacity: 1.0 },
            { opacity: 0.0 }
        ], {
            duration: 1200,
            iterations: 1, //if iteration is 90 we get a cool cascading fade, this can be good for an animation in the futured  
            easing: 'ease',
            fill: 'forwards'


        });
        await timer(1000); // then the created Promise can be awaited
    }
}



//boxes fade in is going to fade in from bottom box to the top
//restructure array, and box breathe in method
async function breathOutBoxAnimation() {
    for (var i = elements.length - 1; i >= 0; i--) {
        elements[i].animate([
            { opacity: 0.0 },
            { opacity: 1.0 }
        ], {
            duration: 1200,
            iterations: 1,
            easing: 'ease',
            fill: 'forwards'
        });
        await timer(1000);
    }
}
//function is going to perform a switch animation between two div tags
function breathInstructionSwitch(beginningElement, targetElement) { //idea, spans around letters maybe opacity fade

    let timeline = anime.timeline({});
    timeline

        .add({
            //enlarge initial element
            targets: `${beginningElement}`,
            color: "#add8e6",
            scale: [1, 1.5],
            duration: 250,
            easing: 'linear',
        })
        .add({
            //enlarge target element 3.8 seconds after initial element is enlarged
            targets: `${targetElement}`,
            color: "#add8e6",
            scale: [1, 1.5],
            duration: 250,
            easing: 'linear',

        }, '+=3800')
        .add({
            //shrink initial element
            targets: `${beginningElement}`,
            color: "#ffffff",
            scale: [1.5, 1],
            duration: 250,
            easing: 'linear'

        })


}




*/ 
/* END FUNCTION GRAVEYARD */

/** FUTURE IDEAS/GOALS
 * 
 * 
 * select your breath in rate, and breath out rate
 * choose how long you would like to breath
 */




//I can do this, I am proud of myself for taking the time to think about it. Clearing my mind is very helpful. 
//I now have a plan and I know what to do to complete the boxes animation. Typography and fancy stuff can be figured out later on.
//Plus this can help myself and others who choose to view it. It can help increase their focus



//use anime.js timelines and function loop on final h2 to add a text effect
//TO DO: finish countdown method
// link this code with github
// media queries

//this animation is creating an interesting 3D vertical carasel effect over the text
//how can this be added with parameters to automatically swap two divs? may be good to consider
//one for breath in, one for hold, one for breathe out, one for hold transition breathe in back to breathe out


//This is specifically designed to swap the 4 breathing instructions aside the box animation
//This in essence creates a "breathing instructin cycle"
function swap() {

    scaleUp('.breathe-in','#00ffff');

    setTimeout(()=>{
        scaleDown('.breathe-in','#ffffff');
        scaleUp('.breathe-hold', '#00ffff');
    }, 4000);
    setTimeout(()=>{
        scaleDown('.breathe-hold', '#ffffff');
        scaleUp('.breathe-out', '#00ffff');
    }, 8000);
    setTimeout(() =>{
        scaleDown('.breathe-out', '#ffffff');
        scaleUp('.breathe-hold2', '#00ffff');
    }, 12000);
    setTimeout(()=>{
        scaleDown('.breathe-hold2', '#ffffff');
    }, 16000);
    
}

//function will scale an element up by 1.5 times, and change it to a desired color
function scaleUp(targetElement, desiredHexColor) {

    anime({
        targets: `${targetElement}`,
        scale: [1, 1.5],
        color: `${desiredHexColor}`,
        duration: 250,
        easing: 'linear'
    });
}

//function will scale an element down to size, and change it to a desired color
function scaleDown(targetElement, desiredHexColor) {
    anime({
        targets: `${targetElement}`,
        scale: [1.5, 1],
        color: `${desiredHexColor}`,
        duration: 250,
        easing: 'linear'
    });
}

//this function will run through the breathing instruction cycle 'loop' amount of times
//keep in mind each loop takes 16 seconds
function changeBreathingInstructions(loop) {
    swap();
    let count = 1;
    let id = setInterval(callSwap, 16000);
    function callSwap() {
        if (count == loop) {
            clearInterval(id);
        } else {
            count++;
            swap();
        }
    }
}

//function to perform cool transition on any text for robusticity
//text fade
function textCountDown() {

    let timeline = anime.timeline({});


    timeline
        .add({
            targets: ['.text1', '.text2'],
            opacity: [1, 0],

            //learned that color in anime.js only accepts hex values
            color: "#ff0066",
            duration: 1000,
            easing: 'linear',
            scale: [1, 1.5],
            //adding a function to a delay can cause nice animations for individual elements
            delay: function (el, i) {
                //paramntheses dictate timing between element animations
                return (i * 1250);
            }

        })
        .add({
            targets: '.text3 span',
            opacity: [0, 1],
            duration: 200,
            easing: 'linear',
            delay: function (el, i) {
                return (i * 300);
            }
        });

}


//this timeline specifically works with the boxes only, there will be a separate method for fading in/fading out text
//timing offsets can be used to time certain animations in the timeline as a second paramter to the .add
function boxBreathingAnimation(iterations) {

    let defaultLoops = 2; //the animation timeline below will always have to loop twice
    let loopIterations = iterations + 2;

    let timeline = anime.timeline({
        //change number of breathing animations
        loop: loopIterations
    }); //init timeline variable
    
    timeline
        //boxes fade downward
        .add({
            targets: '.count',
            opacity: [1, 0],
            duration: 1000,
            easing: 'linear',
            delay: function (el, i,l) {
                return (i * 1000);
            }

        })
        //boxes fade back in upward
        .add({
            targets: ['.count-four', '.count-three', '.count-two', '.count-one'],
            opacity: [0, 1],
            duration: 1000,
            easing: 'linear',
            delay: function (el, i) {
                return (i  * 1000);
            }
        });

}


/***************************************************************************************************/
/***************************FUNCTION TESTING AREA **************************************************/


boxBreathingAnimation(2);
changeBreathingInstructions(2);



