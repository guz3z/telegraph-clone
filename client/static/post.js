let url = window.location.href;
if(url.includes('#')) {
    const id = url.split('#').pop(); 
    renderPost(id);
} else {
    let form = document.getElementById('postForm');
    form.addEventListener('submit', postData)
}

async function postData(e) {
    e.preventDefault();
    const postData = {
        title: e.target.postTitle.value,
        author: e.target.postAuthor.value,
        content: e.target.postContent.value
    };

    const options = { 
        method: 'POST',
        body: JSON.stringify(postData),
        headers: { "Content-Type": "application/json" }
    };

    const response = await fetch('http://localhost:3000/', options)
    const json = await response.json()

    window.location.replace(`/#${json.post}`);
    location.reload();

};

async function getData(id) {
    const data = await fetch(`http://localhost:3000/${id}`)
    const json = await data.json()
    return json
}

async function renderPost(id) {

    const section = document.getElementById('main-content');
    section.textContent = ''
    let postData

    try {
        postData = await getData(id)
        if(postData.message) {
            throw new Error ('Error returned')
        }
        postData = postData.post
    } catch (err) {
        return(err)
    }

    const date = new Date(postData.date * 1000)

    const post = document.createElement('div')
    const postTitle = document.createElement('h1')

    const postMeta = document.createElement('address')
    const postAuthor = document.createElement('a')
    const postDate = document.createElement('time')

    const postContent = document.createElement('p')

    post.classList.add('container')
    post.classList.add('flex-column')

    postDate.setAttribute('datetime',date.toISOString()) 

    postTitle.textContent = postData.title
    postAuthor.textContent = postData.author
    postAuthor.rel = 'Author'
    postDate.textContent = formatDate(date)
    postContent.textContent = postData.content

    postMeta.append(postAuthor)
    postMeta.append(postDate)

    post.appendChild(postTitle)
    post.appendChild(postMeta)
    post.appendChild(postContent)

    section.appendChild(post)
    
}

function formatDate(date) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const month = monthNames[date.getMonth()];
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    const output = day  + '\n'+ month  + ',' + year;

    return output
}

// const url = window.location.href;

// const postTitle = document.getElementById('postTitle');
// const postName = document.getElementById('postName');
// const postStory = document.getElementById('postStory');

// if(url.includes('#')) {
//     const id = urlCon.split('#').pop();
//     renderPost(id);
// } else {
//     let publishForm = document.getElementById('publishForm');
//     publishForm.addEventListener('submit', postContent)
// }

// async function postContent(e) {
//     e.preventDefault();


//     const postContent = {
//         title: e.target.postTitle.value,
//         name: e.target.postName.value,
//         story: e.target.postStory.value
//     };

//     const options = {
//         method: 'POST',
//         body: JSON.stringify(postContent),
//         headers: { "Content-Type": "application/json" }
//     };

//     const response = await fetch('http://localhost:3000/', options)
//     const json = await response.json()

//     window.location.replace(`/#${json.post}`);
//     location.reload();
// };

// async function getContent(id) {
//     const data = await fetch(`http://localhost:3000/${id}`)
//     const json = await data.json()
//     return json
// }

// async function renderPost(id) {
//     const bodyContent = document.getElementById('bodyContent');
//     bodyContent.textContent = ''
//     let postContent
    
//     const date = new Date(postContent.date * 1000)

//     const post = document.createElement('div')
//     const postTitle = document.createElement('h1')
//     const postName = document.createElement('h3')
//     const postDate = document.createElement('time')
//     const postStory = document.createElement('p')
    
//     post.classList.add('container')
//     post.classList.add('flex-columm')


//     postDate.setAttribute('datetime', date.toISOString())

//     postTitle.textContent = postContent.title
//     postName.textContent = postContent.name
//     postName.rel = "name"
//     postDate.textContent = formatDate(date)
//     postStory.textContent = postContent.content

//     post.appendChild(postDate)
//     post.appendChild(postTitle)
//     post.appendChild(postName)
//     post.appendChild(postStory)

//     bodyContent.appendChild(post)
    
// }

// function formateDate(date) {
//     const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//     const month = months[date.getMonth()];
//     const day = String(date.getDate()).padStart(2, '0');
//     const year = date.getFullYear();
//     const output = day + `\n` + month + ',' + year;

//     return output
// }
