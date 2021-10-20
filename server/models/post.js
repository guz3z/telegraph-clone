const { init } = require('../dbConfig');
const { ObjectId } = require('mongodb');


class Post {

    constructor(data) {
        this.title = data.title;
        this.lowerCaseTitle = data.title.toLowerCase();
        this.name = data.name;
        this.story = data.story;
        let dateObj = new Date();
        this.date = Math.floor(dateObj.getTime() / 1000);
        this.day = dateObj.getDate();
        this.month = dateObj.getMonth();
        this.url = `${data.title.replace(/ /g, "-").toLowerCase()}-${dateObj.getDate()}-${dateObj.getMonth() + 1}`
    }

    static create({title, name, story}) {
        
        return new Promise (async (resolve, reject) => {

            try {
                const db = await init();
                let lowerTitle = title.toLowerCase();
                let newPost = new Post({
                    title,
                    name,
                    story
                });

                let urlCount = await db.collection('posts').find({ lowerCaseTitle: lowerTitle, day: newPost.day, month: newPost.month }).count();
                if (urlCount > 0) {
                    newPost.url += `-${urlCount+1}`
                }

                let postContent = await db.collection('posts').insertOne(newPost)
                resolve(newPost.url);


            } catch(err) {
                reject(err);
            }
        });
    }



    static findById(id) {
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init();
                let postContent = await db.collection('posts').find({ url:id }).toArray()
                let post = new Post({...postContent[0], id: postContent[0]._id});
                resolve (post);
            } catch (err) {
                reject('Post does not exist');
            }
        })
    }
}
module.exports = Post