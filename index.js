const interval = 604800

function getPost() {
  const subreddit = document.getElementById("subreddit").value;
  fetch(`https://www.reddit.com/r/${subreddit}/about.json`)
    .then(response => {
      return response.json();
    }).then (about => {
      const min = about.data.created_utc;
      const max = Math.round((new Date()).getTime() / 1000) - interval;
      const start = Math.floor(Math.random() * (max - min + 1) + min)
      const end = start + interval;

      fetch(`https://api.pushshift.io/reddit/submission/search/?after=${start}&before=${end}&sort_type=score&sort=desc&subreddit=${subreddit}`)
        .then(response => {
          return response.json();
        }).then(posts => {
          if (posts.data.length > 0) {
            const post = posts.data[Math.floor(Math.random()*posts.data.length)];
            const results = document.getElementById('results');
            results.innerHTML = `<a href='${post.url}' target='_blank' rel='noopener noreferrer'>${post.title}</a>`;
          }
          else {
            getPost();
          }
        });
    });
}

document.getElementById("get-post").onclick = getPost;
