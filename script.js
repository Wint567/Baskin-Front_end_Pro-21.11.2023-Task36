const searchBtn = document.querySelector('.searchBtn');
const mainContainer = document.querySelector('.container')

function validation(value) {
    if(isNaN(value) || value < 1 || value > 100) {
        alert('Введіть значення від 0 до 100')
        return false
    }
    return true
}

function addPostToPage(post) {
    const postsContainer = document.querySelector('.posts')
    const commentsContainer = document.querySelector('.comments')
    
    postsContainer.innerHTML = ''
    commentsContainer.innerHTML= '';

    const newPost = document.createElement('div');
    newPost.innerHTML = `<h2>${post.title}</h2>
                        <p>${post.body}</p>
                        <button class='get-comments'>Get comments</button>`
    postsContainer.appendChild(newPost);
    mainContainer.append(postsContainer)

    const getCommentBtn = document.querySelector('.get-comments');
    getCommentBtn.addEventListener("click", getCommentByIdRequest)
}

function addCommentsToPage(postComments) {
    const commentsContainer = document.querySelector('.comments');
    commentsContainer.innerHTML = '';

    postComments.forEach(comment => {
        const commentDiv = document.createElement('div');
    
        commentDiv.innerHTML = `<h4>${comment.name}</h4>
                                <p>${comment.email}<p>
                                <p>${comment.body}<p>`                        
     commentsContainer.appendChild(commentDiv)
     mainContainer.append(commentsContainer)
    });
}

async function getPostByIdRequest() {
    const getIdValue = document.querySelector('.inputId').value;
   
    if(validation(getIdValue)) {
        try{
            const request = await fetch(`https://jsonplaceholder.typicode.com/posts/${getIdValue}`);
            const post = await request.json();
            addPostToPage(post);
        }catch(e) {
            console.log(e)
        }
        
    }
}


async function getCommentByIdRequest() {
    const getIdValue = document.querySelector('.inputId').value;
   
    if(validation(getIdValue)) {
        try{
            const request = await fetch(`https://jsonplaceholder.typicode.com/posts/${getIdValue}/comments`);
            const comments = await request.json();
            addCommentsToPage(comments);
        }catch(e) {
            console.log(e)
        }
        
    }
}


searchBtn.addEventListener('click', getPostByIdRequest)
