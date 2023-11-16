const burger = document.querySelector('.burger')
const navList = document.querySelector('.nav__list')

burger.addEventListener('click', (e) => {
    e.preventDefault()
    if (burger.classList.contains('burger--active')) {
        burger.classList.remove('burger--active')
        navList.classList.remove('nav__list--active')
    }
    else {
        burger.classList.add('burger--active')
        navList.classList.add('nav__list--active')
    }
})

const scrls = document.querySelectorAll('a.hairdresser-btm')
for (let scrl of scrls) {
    scrl.addEventListener('click', function (e) {
        e.preventDefault()

        const blockID = scrl.getAttribute('href').substr(1)

        if (blockID === 'man') {
            document.getElementById(blockID).scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            })
        } else {
            document.getElementById(blockID).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        }        
    })
}
// const manScroll = document.querySelector('a[href="#man"]')
// manScroll.addEventListener('click', function (e) {
//     e.preventDefault()
    
//     const manBlockID = manScroll.getAttribute('href').substr(1)
    
//     document.getElementById(manBlockID).scrollIntoView({
//         behavior: 'smooth',
//         block: 'center'
//     })
// })