document.addEventListener('DOMContentLoaded',()=>{

  const videoSrc = `<iframe class='modalVideo' src="https://www.youtube.com/embed/FJcqzKFf5lI" title="Poland. Official trailer" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"></iframe>`


  const submitBtn = document.querySelector('form .button')
  const playerElements = document.querySelectorAll('.player-wrapper > *:not(.text)');

  //form controls
  const destination = document.getElementById('destination');
  const checkInDate = document.getElementById('checkInDate');
  const checkOutDate = document.getElementById('checkOutDate');
  const guests = document.getElementById('guests');


  const setTodayDate = ()=>{
    const todayDate = {
      day: new Date().getDate(),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    }
    const formatedTodayDate = 
    `${todayDate.year}-${todayDate.month<10 ? `0${todayDate.month}` : `${todayDate.month}`}-${todayDate.day<10 ? `0${todayDate.day}` : `${todayDate.day}`}`
    checkInDate.setAttribute('min', formatedTodayDate);
    checkOutDate.setAttribute('min', formatedTodayDate);
  }

  setTodayDate()

  const checkInDateChange = (e)=>{
    checkOutDate.setAttribute('min', e.target.value);
  }
  const checkOutDateChange = (e)=>{
    checkInDate.setAttribute('max', e.target.value);
  }

  checkInDate.addEventListener('change', checkInDateChange)
  checkOutDate.addEventListener('change', checkOutDateChange)
  
  const formSubmit = (event)=>{
    event.preventDefault();
    let destivationValid = false;
    let checkInDateValid = false;
    let checkOutDateValid = false;
    let guestsValid = false;

    if(!(/\w+/i.test(destination.value))){
      destivationValid = false;
      document.querySelector(`.destination span.error`).classList.add('on')
    } else{
      destivationValid = true;
      document.querySelector(`.destination span.error`).classList.remove('on')
    }

    if(checkInDate.value === ""){
      checkInDateValid = false;
      document.querySelector(`.checkIn span.error`).classList.add('on')
    }else{
      checkInDateValid = true;
      document.querySelector(`.checkIn span.error`).classList.remove('on')
    }
    if(checkOutDate.value === ""){
      checkOutDateValid = false;
      document.querySelector(`.checkOut span.error`).classList.add('on')
    }else{
      checkOutDateValid = true;
      document.querySelector(`.checkOut span.error`).classList.remove('on')
    }
    
    if(guests.value < 0 || guests.value > 5 || guests.value === ""){
      guestsValid = false;
      document.querySelector(`.guests span.error`).classList.add('on')
    }
    else{
      guestsValid = true;
      document.querySelector(`.guests span.error`).classList.remove('on')
    }
    
    if(destivationValid && checkInDateValid && checkOutDateValid && guestsValid){
      checkOutDate.setAttribute('min', "");
      checkOutDate.value = "";
      checkInDate.setAttribute('max', "");
      checkInDate.value = "";
      destination.value = "";
      guests.value = "";
      setTodayDate()
      console.log('przesyłanie formularza')
    }
  }

  const showModalVideo = () =>{  
    const modalContainer = document.createElement('div')
    const modal = document.createElement('div');
    modal.innerHTML= videoSrc;
    modalContainer.classList.add('modal-container')
    modal.classList.add('modal')
    const closeBtn = document.createElement('span');
    closeBtn.innerHTML='<i class="fa-solid fa-xmark-large"></i>'
    modalContainer.append(modal, closeBtn)
    document.getElementById('header').appendChild(modalContainer)
    playerElements.forEach(el => el.removeEventListener('click', showModalVideo))
  
    document.addEventListener('click', (event)=>{
      console.log(event.target)
      if(modalContainer.contains(event.target)){
        document.getElementById('header').removeChild(modalContainer);
        playerElements.forEach(el => el.addEventListener('click', showModalVideo))
      }
    })
  }
  
  playerElements.forEach(el => el.addEventListener('click', showModalVideo))
  
  submitBtn.addEventListener('click',formSubmit);
})

