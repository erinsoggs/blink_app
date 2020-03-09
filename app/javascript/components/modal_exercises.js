const playButtons = document.querySelectorAll(".play-btn");

const setPlayButton = (button, audio) => {
  button.addEventListener('click', (event) => {
    if (event.currentTarget.classList.contains('playing')){
      event.currentTarget.classList.remove('playing');
      event.currentTarget.classList.add('paused');
      event.currentTarget.innerHTML = "<i class='fas fa-play-circle'></i>";
      audio.pause();
    } else {
      if (window.audio && window.audio != audio){
        window.audio.pause();
        window.audio.currentTime = 0;
        playButtons.forEach((playButton) => {
          playButton.classList.remove('paused');
          playButton.classList.remove('playing');
          playButton.innerHTML = "<i class='far fa-play-circle'></i>";
        })
      }
      window.audio = audio;
      event.currentTarget.classList.remove('paused');
      event.currentTarget.classList.add('playing');
      event.currentTarget.innerHTML = "<i class='fas fa-pause-circle'></i>";
      audio.play();
    }
  });
};

const setPlayButtonModal = (playButtonModal, audio) => {
  setPlayButton(playButtonModal, audio);
  playButtonModal.addEventListener('click', (event) => {
    const playButtonInPageDiv = document.getElementById(playButtonModal.dataset.playid);
    const playButtonInPage = playButtonInPageDiv.querySelector('button');
    playButtonInPage.classList = playButtonModal.classList;
    playButtonInPage.innerHTML = playButtonModal.innerHTML;
    audio.addEventListener('ended', (event) => {
      audio.pause();
      audio.currentTime = 0;
      playButtonModal.classList.remove('playing');
      playButtonModal.innerHTML = "<i class='far fa-play-circle'></i>";
      playButtonInPage.classList.remove('playing');
      playButtonInPage.innerHTML = "<i class='far fa-play-circle'></i>";
    })
  })
};

const setplayButtons = () => {
  if (playButtons){
    playButtons.forEach((button) => {
      const audio = new Audio(button.dataset.sound);
      setPlayButton(button, audio);
      audio.addEventListener('ended', (event) => {
        audio.pause();
        audio.currentTime = 0;
        button.classList.remove('playing');
        button.innerHTML = "<i class='far fa-play-circle'></i>";
      })
    });
  }
};

const fillInModalContent = (title, directions, repetition) => {
  document.getElementById("title-in-modal").innerText = title;
  let directionListHTML = "";
  directions.split("/").forEach( direction => {
    directionListHTML = directionListHTML + `<li>${direction}</li>`
  });
  document.getElementById("directions-list-in-modal").innerHTML = directionListHTML;
  const nbRepetitions = document.getElementById("repetition");
  if (nbRepetitions){
    nbRepetitions.innerText = repetition;
  }
};

const setModalExercises = () => {
  const openModalButtons = document.querySelectorAll('.open-btn-modal');
  if (openModalButtons){
    openModalButtons.forEach((openModalButton) => {
      openModalButton.addEventListener('click', (event) => {
        const title = event.currentTarget.dataset.title;
        const directions = event.currentTarget.dataset.directions;
        const repetition = event.currentTarget.dataset.repetition;
        fillInModalContent(title, directions, repetition);
        const playButtonModalDiv = document.getElementById('play-btn-modal-div');
        if (playButtonModalDiv) {
          const playButtonInPageDiv = document.getElementById(event.currentTarget.dataset.playid);
          const playButtonInPage = playButtonInPageDiv.querySelector('button');
          playButtonModalDiv.innerHTML = playButtonInPage.outerHTML;
          const playButtonModal = playButtonModalDiv.querySelector('button');
          playButtonModal.dataset.playid = event.currentTarget.dataset.playid;
          let audio = new Audio(playButtonModal.dataset.sound);
          if (playButtonModal.classList.contains('playing') || playButtonModal.classList.contains('paused')){
            audio = window.audio;
          }
          setPlayButtonModal(playButtonModal, audio);
        }
      })
    })
  }
};


const setModalRoutineExercises = () => {
  const openModalButtons = document.querySelectorAll('.open-btn-modal-routine');
  if (openModalButtons){
    openModalButtons.forEach((openModalButton) => {
      openModalButton.addEventListener('click', (event) => {
        const title = event.currentTarget.dataset.title;
        const directions = event.currentTarget.dataset.directions;
        const repetition = event.currentTarget.dataset.repetition;
        fillInModalContent(title, directions, repetition);
        const playButtonModalDiv = document.getElementById('play-btn-modal-div');
        if (playButtonModalDiv) {
          const playButtonModal = playButtonModalDiv.querySelector('button');
          let audio = new Audio(openModalButton.dataset.sound);
          if (playButtonModal.classList.contains('playing') || playButtonModal.classList.contains('paused')){
            audio = window.audio;
          } else {
            setPlayButton(playButtonModal, audio);
          }
        }
      })
    })
  }
};



export { setplayButtons, setModalExercises, setModalRoutineExercises };
