console.log("Welcome to Spotify");

//vars
let songIndex=0;
let audioElement = new Audio("./songs/1.mp3");
let masterPlay  = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName("songItem"));
let mastersongname = document.getElementById("masterSongname");


let songs = [
    {songname:"Yeh Shaam Mastani", filePath:"./songs/1.mp3", covers:"./covers/1.jpg" },
    {songname:"Lag Ja Gale", filePath:"songs/2.mp3", covers:"./covers/2.jpeg" },
    {songname:"Kahin na jaa", filePath:"./songs/3.mp3", covers:"./covers/3.jpeg" },
    {songname:"Gunche lage hai kahne", filePath:"./songs/4.mp3", covers:"./covers/4.jpeg" },
    {songname:"Yaar Bina Chain Kaha Re", filePath:"./songs/5.mp3", covers:"./covers/5.jpeg" },
    {songname:"Neele-Neele Ambar Pe", filePath:"./songs/6.mp3", covers:"./covers/6.jpeg" },
    {songname:"Mana Ho Tum", filePath:"./songs/7.mp3", covers:"./covers/7.jpeg" },
    {songname:"Tu Nazm Nazm sa Mere", filePath:"./songs/8.mp3", covers:"./covers/8.jpeg" },
    {songname:"Mai Rang Sharbaton Ka", filePath:"./songs/9.mp3", covers:"./covers/9.jpeg" },
    {songname:"Mene tere liye hi saat rang ke sapne", filePath:"./songs/10.mp3", covers:"./covers/10.jpeg" }
]


songItems.forEach((element,i) => {
   // console.log(element,i);
    element.getElementsByTagName("img")[0].src = songs[i].covers;
    element.getElementsByClassName("songname")[0].innerText = songs[i].songname;
    element.getElementsByClassName("timestamp")[0].innerText;
});





//Listens to Events
//Audio Play
masterPlay.addEventListener('click',() =>{
     if (audioElement.paused || audioElement.currentTime<=0) {
        audioElement.play();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");

        gif.style.opacity = 1;
     }
     else{
        audioElement.pause();
        masterPlay.classList.add("fa-play-circle");
        masterPlay.classList.remove("fa-pause-circle");

        gif.style.opacity = 0;
     }
})


audioElement.addEventListener('timeupdate',() => {
    //Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100)
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change',() =>{
    audioElement.currentTime = myProgressBar.value*audioElement.duration/100;
})

const makeallplays = () => {
  
    Array.from(document.getElementsByClassName("songitemplay")).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

let indexed = 0;

Array.from(document.getElementsByClassName("songitemplay")).forEach((element) => {
    element.addEventListener('click',(e) => {
      // console.log(e.target);
      if (e.target.classList == "songitemplay far fa-pause-circle") {
       
      
        makeallplays();
        e.target.classList.add('fa-play-circle');
        e.target.classList.remove('fa-pause-circle');
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;

        indexed = e.target.id; 
      
      }else{
       if (audioElement.currentTime >= 0 && songIndex == indexed) {
        
        makeallplays();
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.play();
        mastersongname.innerText = songs[songIndex].songname;
         console.log(songIndex);
        masterPlay.classList.add('fa-pause-circle');
        masterPlay.classList.remove('fa-play-circle');
        gif.style.opacity = 1;
       }else{
      
        makeallplays();
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        songIndex = parseInt(e.target.id);
        audioElement.src = `songs/${songIndex+1}.mp3`
        audioElement.play();
        mastersongname.innerText = songs[songIndex].songname;
         console.log(songIndex);
        masterPlay.classList.add('fa-pause-circle');
        masterPlay.classList.remove('fa-play-circle');
        gif.style.opacity = 1;
       }
     
      }
    })   
})

document.getElementById("previous").addEventListener('click',() =>{
    if(songIndex <= 0){
        songIndex = 9;
    }
    else{
    songIndex -= 1;
    }
    console.log(songIndex);
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    gif.style.opacity = 1;
    audioElement.play();
    mastersongname.innerText = songs[songIndex].songname;
    masterPlay.classList.add('fa-pause-circle');
    masterPlay.classList.remove('fa-play-circle');
})

document.getElementById('next').addEventListener('click',() =>{
    if(songIndex >= 9){
        songIndex = 0;
    }
    else{
    songIndex += 1;
    }
    console.log(songIndex);
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    gif.style.opacity = 1;
    audioElement.play();  
      mastersongname.innerText = songs[songIndex].songname;
    masterPlay.classList.add('fa-pause-circle');
    masterPlay.classList.remove('fa-play-circle');
})

audioElement.addEventListener('ended',()=>{
    songIndex +=1;
    console.log(songIndex);

    makeallplays();


    audioElement.src = `songs/${songIndex+1}.mp3`;

    audioElement.play();
    mastersongname.innerText = songs[songIndex].songname;
     console.log(songIndex);

    gif.style.opacity = 1;
})