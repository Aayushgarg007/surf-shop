const faker = require('faker');
const Post = require('./models/post');

async function seedPosts() {
  await Post.remove({});
  for(const i of new Array(40)) {
    const post = {
      title: faker.lorem.word(),
      description: faker.lorem.text(),
      coordinates: [-122, 37],
      author: {
        '_id' : '5ec1ed3613730335b86b27af',
        'username' : 'aayush'
      },
    }
    await Post.create(post);
  }
  console.log('40 new post created');
}

module.exports = seedPosts;