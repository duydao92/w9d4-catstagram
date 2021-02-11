window.addEventListener('DOMContentLoaded', () => {
    async function getCat () {
        const catJson = await fetch('/kitten/image');
        const json = await catJson.json()
        console.log(json)
    }

    getCat()
})
