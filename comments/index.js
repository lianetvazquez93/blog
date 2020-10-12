const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

const commentsByPostId = [];

app.post("/posts/:id/comments", async (req, res) => {
  const postId = req.params.id;
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  const comments = commentsByPostId[postId] || [];
  comments.push({ id: commentId, content });

  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId,
    },
  });

  commentsByPostId[postId] = comments;

  res.status(201).send(comments);
});

app.post("/events", (req, res) => {
  console.log("Received Event:", req.body.type);

  res.send({});
});

app.listen(4001, () => {
  console.log("Listening on 4001");
});
