const previous = document.getElementById("previous")
const next = document.getElementById("next")
const imgs = [
  {src: "imgs/village.jpg",
    alt: "christmas village at night with snow and christmas tree"},
  {src: "imgs/present.jpg",
    alt: "white and gold wrapped present on white table with snowflake decorations"},
  {src: "imgs/doggies.jpg",
    alt: "small black dog and small beige dog looking out the window at snow next to Christmas wreath"}
]
const width = 359
const delay = 500

const carousel = document.getElementById('carousel')
const track = document.createElement('div')
carousel.appendChild(track)

let slides = [...imgs].slice(-1)
slides.push(...imgs)
slides = [...slides, [...imgs].slice(0, 1)[0]]



slides.forEach((slide, i) => {
  const img = document.createElement('img')
  console.log(slide.src)
  img.setAttribute('src', slide.src)
  img.setAttribute('alt', slide.alt)
  img.dataset.index = i
  track.appendChild(img)
  if(i === 0 || i === slides.length - 1){
    img.classList.add('cloned')
  }
  track.style.width = `${width *  5}px`
  track.style.transition = `transform ${delay}ms ease 0s`
  track.style.transform = `translate3d(-${width}px, 0, 0)`
  track.dataset.position = `-${width}`
  track.dataset.current = 1

  carousel.style.width = `${width}px`
  carousel.style.overflowX = 'hidden'
})

next.addEventListener('click', () => {
  let current = parseInt(track.dataset.current, 10) + 1
  track.style.transition = `transform ${delay}ms ease 0s`
  track.style.transform = `translateX(${parseInt(track.dataset.position, 10) - width}px)`
  track.dataset.position = `${parseInt(track.dataset.position, 10) - width}`
  track.dataset.current = current
  if(current === 4){
    setTimeout(function(){
      track.style.transition = `none`
      track.style.transform = `translate3d(-${width}px, 0, 0)`
      track.dataset.position = `-${width}`
      track.dataset.current = 1
    }, delay)
  }
})

previous.addEventListener('click', () => {
  let current = parseInt(track.dataset.current, 10) - 1
  track.style.transition = `transform ${delay}ms ease 0s`
  track.style.transform = `translateX(${parseInt(track.dataset.position, 10) + width}px)`
  track.dataset.position = `${parseInt(track.dataset.position, 10) + width}`
  track.dataset.current = current
  if(current === 0){
    setTimeout(function(){
      track.style.transition = `none`
      track.style.transform = `translate3d(-${width * 3}px, 0, 0)`
      track.dataset.position = `-${width * 3}`
      track.dataset.current = 3
    }, delay)
  }
})


// Task:
// - Wire up the buttons to switch through the images in the imgs array.
// - Make sure that the gallery works no matter how many images are added.
// - Decide/implement what to do when you reach either end of the array - do nothing and disable buttons, loop back round to the other end, or something else?
// - Remember to also update the alt tags.

// Stretch goals:
// - Add transitions for a smooth effect.
// - Allow the user to zoom in and out of the images.
