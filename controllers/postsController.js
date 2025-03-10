const connection = require("../data/db");

// * INDEX
function index(req, res) {
  const sql = `SELECT * FROM posts;`;

  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    res.json(results);
  });

  // TODO
  /*   
  const titleFilter = req.query.title;
  const hashtagFilter = req.query.hashtag;
  let newPostList = posts;

  if (titleFilter) {
    newPostList = posts.filter((post) =>
      post.title.toLowerCase().includes(titleFilter.toLowerCase())
    );
  }

  if (hashtagFilter) {
    newPostList = newPostList.filter((post) => {
      let hashtagIncluded = false;
      post.tags.forEach((hashtag) => {
        if (hashtag.toLowerCase().includes(hashtagFilter.toLowerCase())) {
          hashtagIncluded = true;
        }
      });
      return hashtagIncluded;
    });
  }

  res.json({
    newPostList,
    categories,
    listLength: newPostList.length,
  }); */
}

// * SHOW
function show(req, res) {
  const id = parseInt(req.params.id);

  // controllo se l'id è valido
  if (isNaN(id)) {
    const err = new Error("Id required not valid");
    err.status = 400;
    err.error = "Bad request by client";
    throw err;
  }

  const postsSql = `
              SELECT * 
              FROM posts 
              WHERE id = ?
              `;

  const tagsSql = `
              SELECT tags.* 
              FROM tags               
              INNER JOIN post_tag
              ON tags.id = post_tag.tag_id
              WHERE post_tag.post_id = ?
              `;

  connection.query(postsSql, [id], (err, postsResults) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    if (postsResults.length === 0)
      return res.status(404).json({ error: "Id required not found" });

    const post = postsResults[0];

    connection.query(tagsSql, [id], (err, tagsResults) => {
      if (err) return res.status(500).json({ error: "Database query failed" });
      post.tags = tagsResults;
      res.json(post);
    });
  });
  // TODO
  /* 
  // trovo il post tramite l'id
  const postRequired = posts.find((post) => post.id === id);

  if (!postRequired) {
    const err = new Error("Id required not found");
    err.status = 404;
    err.error = "Not Found";
    throw err;
  }

  // res.send(`Show post with id ${id}`);
  res.json(postRequired); */
}

// * STORE
function store(req, res) {
  const { title, content, image } = req.body;

  if (!title || !content || !image) {
    const err = new Error("Check all parameters passed");
    err.status = 400;
    err.error = "Bad request by client";
    throw err;
  }

  const sql = `
              INSERT INTO posts (title, content, image) 
              VALUES (?, ?, ?);
              `;

  connection.query(sql, [title, content, image], (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    res.json({ title, content, image });
  });

  // TODO
  /*  
  if (!title || !content || !Array.isArray(tags) || !category || !tags.length) {
    const err = new Error("Check all parameters passed");
    err.status = 400;
    err.error = "Bad request by client";
    throw err;
  }

  const id = posts.at(-1).id + 1;

  const newPost = {
    id,
    title,
    content,
    author,
    image,
    category,
    isPublished,
    tags,
  };
  posts.push(newPost);

  res.json({ newPost, posts }); */
}

// * UPDATE
function update(req, res) {
  const id = parseInt(req.params.id);
  const { title, content, image } = req.body;

  if (isNaN(id)) {
    const err = new Error("Id required not valid");
    err.status = 400;
    err.error = "Bad request by client";
    throw err;
  }

  if (!title || !content || !image) {
    const err = new Error("Check all parameters passed");
    err.status = 400;
    err.error = "Bad request by client";
    throw err;
  }

  const sql = `UPDATE posts SET title = ?, content = ?, image = ? WHERE (id = ?);`;

  connection.query(sql, [title, content, image, id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    res.json({ id, title, content, image });
  });

  // TODO
  /* 
  // controllo se l'id è valido
  if (isNaN(id)) {
    const err = new Error("Id required not valid");
    err.status = 400;
    err.error = "Bad request by client";
    throw err;
  }

  const { title, content, image, tags } = req.body;

  if (!title || !content || !image || !Array.isArray(tags) || !tags.length) {
    const err = new Error("Check all parameters passed");
    err.status = 400;
    err.error = "Bad request by client";
    throw err;
  }

  const postUpdated = posts.find((post) => post.id === id);

  if (!postUpdated) {
    const err = new Error("Id required not found");
    err.status = 404;
    err.error = "Not Found";
    throw err;
  }

  postUpdated.title = title;
  postUpdated.content = content;
  postUpdated.image = image;
  postUpdated.tags = tags;

  res.json({ postUpdated, posts }); */
}

// * MODIFY
function modify(req, res) {
  const id = parseInt(req.params.id);
  const { title, content, image } = req.body;

  if (isNaN(id)) {
    const err = new Error("Id required not valid");
    err.status = 400;
    err.error = "Bad request by client";
    throw err;
  }

  /*   if (title) {
    let sql = `UPDATE posts SET title = ? WHERE (id = ?);`;

    connection.query(sql, [title, id], (err, results) => {
      if (err) return res.status(500).json({ error: "Database query failed" });
      res.json({ id, title });
    });
  }

  if (content) {
    let sql = `UPDATE posts SET content = ? WHERE (id = ?);`;

    connection.query(sql, [content, id], (err, results) => {
      if (err) return res.status(500).json({ error: "Database query failed" });
      res.json({ id, content });
    });
  }

  if (image) {
    let sql = `UPDATE posts SET image = ? WHERE (id = ?);`;

    connection.query(sql, [image, id], (err, results) => {
      if (err) return res.status(500).json({ error: "Database query failed" });
      res.json({ id, image });
    });
  } */

  // TODO
  /* 
  // controllo se l'id è valido
  if (isNaN(id)) {
    const err = new Error("Id required not valid");
    err.status = 400;
    err.error = "Bad request by client";
    throw err;
  }

  const { title, content, image, tags } = req.body;

  const postModified = posts.find((post) => post.id === id);

  if (!postModified) {
    const err = new Error("Id required not found");
    err.status = 404;
    err.error = "Not Found";
    throw err;
  }

  if (title) postModified.title = title;

  if (content) postModified.content = content;

  if (image) postModified.image = image;

  if (tags) {
    if (Array.isArray(tags)) {
      postModified.tags = tags;
    } else {
      const err = new Error("tags passed by client is not an array");
      err.status = 400;
      err.error = "Bad request by client";
      throw err;
    }
  }

  res.json({ postModified, posts }); */
}

// * DESTROY
function destroy(req, res) {
  const id = parseInt(req.params.id);

  // controllo se l'id è valido
  if (isNaN(id)) {
    const err = new Error("Id required not valid");
    err.status = 400;
    err.error = "Bad request by client";
    throw err;
  }

  const sql = `DELETE FROM posts WHERE id = ?`;
  connection.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    res.sendStatus(204);
  });

  // TODO
  /*
  // ricerca dell'index dell'elemento con l'id scelto da eliminare
  const postToDelete = posts.find((post) => post.id === id);

  if (!postToDelete) {
    const err = new Error("Id required not found");
    err.status = 404;
    err.error = "Bad request by client";
    throw err;
  }

  const postToDeleteIndex = posts.indexOf(postToDelete);

  if (!postToDeleteIndex && postToDeleteIndex !== 0) {
    const err = new Error("Id required not found");
    err.status = 404;
    err.error = "Bad request by client";
    throw err;
  }

  // rimozione dell'index trovato
  const postDeleted = posts.splice(postToDeleteIndex, 1);

  //   res.send(`Delete post with id ${id}`);
  console.log({ postDeleted, posts });
  res.status(200).json({ postDeleted, posts }); */
}

module.exports = { index, show, store, update, modify, destroy };
