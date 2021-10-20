const urlCon = window.location.href;

const postTitle = document.getElementById('PostTitle');
const postName = document.getElementById('postName');
const postStory = document.getElementById('postStory');

if(urlCon.includes('#')) {
    const idPost = urlCon.split('#').pop();
    renderPost(idPost);
} else {
    let postSubmit = document.getElementById('postSubmit');
    postSubmit.addEventListener('submit', postContent)
}

async function postContent(e) {
    e.preventDefault();
    const postContent = {
        title: e.target.postTitle.value,
        name: e.target.postName.value,
        story: e.target.postStory.value
    };

    const options = {
        method: 'POST',
        body: JSON.stringify(postContent),
        headers: { "content-Type": "application/json" }
    };

    const response = await fetch('http://localhost:3000/', options)
    const json = await response.json()

    window.location.replace(`/#${json.post}`);
    location.reload();
};

async function getContent(idPost) {
    const data = await fetch(`http://localhost:3000/${idPost}`)
    const json = await data.json()
    return json
}

async function renderPost(idPost) {
    const bodyContent = document.getElementById('bodyContent');
    bodyContent.textContent = ''
    
    const date = new Date(postContent.date * 1000)

    const post = document.createElement('div')
    const postTitle = document.createElement('h1')
    const postName = document.createElement('h3')
    const postDate = document.createElement('time')
    const postStory = document.createElement('p')
    
    post.classList.add('container')
    post.classList.add('flex-columm')


    postDate.setAttribute('datetime', date.toISOString())

    postTitle.textContent = postContent.title
    postName.textContent = postContent.name
    postName.rel = "name"
    postDate.textContent = formatDate(date)
    postStory.textContent = postContent.getContent

    post.appendChild(postDate)
    post.appendChild(postTitle)
    post.appendChild(postName)
    post.appendChild(postStory)

    bodyContent.appendChild(post)
    


    
}

function formateDate(date) {
    const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = months[date.getMonth()];
    const day = string(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    const output = day + `/n` + month + ',' + year;

    return output
}
