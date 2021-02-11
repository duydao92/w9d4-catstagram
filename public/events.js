window.addEventListener('DOMContentLoaded', () => {
    async function getCat () {
        const loader = document.querySelector(".loader")
        loader.innerHTML = "Loading..."
        const catJson = await fetch('/kitten/image');
        const json = await catJson.json()
        const catImg = document.getElementsByClassName('cat-pic')
        catImg[0].src = json.src;
        loader.innerHTML = ""
    }
    const newPicButton = document.getElementById('new-pic');
    newPicButton.addEventListener('click', e =>{
        getCat()

    })
})
