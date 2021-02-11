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


    const upvote = document.getElementById('upvote');
    const downvote = document.getElementById('downvote');
    const score = document.querySelector('.score');
    upvote.addEventListener('click', () =>{
        fetch('/kitten/upvote', {method:'PATCH'})
        .then(res => res.json())
        .then(res => {
           score.innerHTML = res.score
        }).catch((err) =>{
            window.alert(err);
        })
    })

    downvote.addEventListener('click', () =>{
        fetch('/kitten/downvote', {method:'PATCH'})
            .then(res => res.json())
            .then(res => {
            score.innerHTML = res.score
            }).catch(err =>{
                window.alert(err);
            })
    })

    //comment section

    const commentBtn = document.querySelector('.comment-form');
    commentBtn.addEventListener('submit', e => {
        const commentInput = document.getElementById("user-comment");
        const userComment = commentInput.value;
        const commentSection = document.querySelector('.comments');
        const newComment = document.createElement('div');
        commentSection.appendChild(newComment);
        e.preventDefault();
        fetch('/kitten/comments', {method: "POST", headers: {'Content-Type' : "application/json"}, body: JSON.stringify({comment: userComment}) })
        .then(res => res.json())
        .then(res => newComment.innerHTML = res.comments[res.comments.length - 1])
    })
})
