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
    const commentSection = document.querySelector('.comments');

    let counter = -1;
    commentBtn.addEventListener('submit', e => {
        e.preventDefault();
        counter++;
        const commentInput = document.getElementById("user-comment");
        const userComment = commentInput.value;
        const newComment = document.createElement('div');
        const deleleBtn = document.createElement('button');
        const commentBox = document.createElement('div')
        commentBox.setAttribute('id', `${counter}`)
        deleleBtn.innerHTML = "Delete";
        deleleBtn.setAttribute('class', 'delete');
        commentBox.appendChild(newComment);
        commentBox.appendChild(deleleBtn);
        commentSection.appendChild(commentBox);

        fetch('/kitten/comments', {method: "POST", headers: {'Content-Type' : "application/json"}, body: JSON.stringify({comment: userComment}) })
            .then(res => res.json())
            .then(res =>
                newComment.innerHTML = res.comments[res.comments.length - 1])
        })

    commentSection.addEventListener('click', e => {
        if (e.target.innerHTML === 'Delete') {
            const div = e.target.parentNode;
            console.log(div)
            commentSection.removeChild(div)
            let divId = div.id;
            fetch(`/kitten/comments/${divId}`, {method: 'DELETE'})
                .then(res => res.json())
                .then(res => console.log(res))
        }
    })
})
