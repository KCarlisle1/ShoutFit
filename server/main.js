import express from "express";
import fs from "fs"; //file system. allows reading of api
import path, { dirname } from "path"; //adds path receiving functionality
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = express();
const PORT = 3000;

server.use(express.json()); //ensures server can read json data

server.get("/api/clothing", (req, res) => { //set the link for 'clothing.json' api access
    const apiFilePath = path.join(__dirname, "clothing.json"); //leads to location in directory
    const clothesData = JSON.parse(fs.readFileSync(apiFilePath, "utf-8"));
    res.json(clothesData);
});

server.get("/api/posts", (req, res) => { //reads from userData.json
    const postsFilePath = path.join(__dirname, "userData.json");
    const postsData = JSON.parse(fs.readFileSync(postsFilePath, "utf-8"));
    res.json(postsData);
});

server.post("/api/posts", (req, res) => { //handles submission to userData.json
    const postsFilePath = path.join(__dirname, "userData.json");
    const newPost = { id: Date.now().toString(), comments: [], ...req.body }; //stores user outfit in variable called newPost

    let posts = [];
    posts = JSON.parse(fs.readFileSync(postsFilePath, "utf-8"));

    posts.unshift(newPost);

    fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2)); //overwrites whats currently in file

    res.json(newPost);
});

server.post("/api/posts/:id/comments", (req, res) => { //handles pushing comments to data file
    const postsFilePath = path.join(__dirname, "userData.json");
    const { username, comment } = req.body;
    const postId = req.params.id;

    if(!username || !comment){
        return res.json({ error: "Username and comment required!" });
    }

    const posts = JSON.parse(fs.readFileSync(postsFilePath, "utf-8"));
    const postIndex = posts.findIndex(p => String(p.id) === String(postId));
    if(postIndex === -1){
        return res.json({ error: "Post not found" });
    }

    if(!posts[postIndex].comments){
        posts[postIndex].comments = [];
    }

    const newComment = { id: Date.now(), username, comment };
    posts[postIndex].comments.push(newComment);

    fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2));
    res.json(newComment);
})

server.listen(PORT, () => { //start the server on the specified port
    console.log(`Server running on http://localhost:${PORT}`);
});