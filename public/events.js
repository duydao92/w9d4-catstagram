window.addEventListener('DOMContentLoaded', () => {
    async function getCat () {
        const loader = document.querySelector(".loader");
        loader.innerHTML = "Loading...";
        const catJson = await fetch('/kitten/image');
        const catObj = await catJson.json();
        const catImg = document.getElementsByClassName('cat-pic');
        loader.innerHTML = "";
        if (catJson.ok) {
            catImg[0].src = catObj.src;
        } else {
            const errorDiv = document.querySelector('.error');
            errorDiv.innerHTML = catObj.message;
        }
    }
    const newPicButton = document.getElementById('new-pic');
    newPicButton.addEventListener('click', e =>{
        getCat();
    })



})
