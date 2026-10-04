import  { useState } from "react" //only for post commenting - entirely contained within this file (no communication)
import "./Posts.css"

const PostsDisplay = ({ posts = [], setPosts }) => {

    const [commentInputs, setCommentInputs] = useState({});
    const [username, setUsername] = useState("Anonymous");

    const commentChange = (postId, value) => {
        setCommentInputs(prev => ({ ...prev, [postId]: value}));
    };

    const commentSubmit = async (postId) => {
        const commentText = commentInputs[postId];
        if(!commentText){
            return
        };

        const newComment = { username, comment: commentText };
        try{
            const res = await fetch(`/api/posts/${postId}/comments`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newComment),
            });

            const savedComment = await res.json();

            const updatedPosts = posts.map((p) => {
                if(p.id === postId){
                    return{ ...p, comments: [...(p.comments || []), savedComment] };
                }
                return p;
            });

            setPosts(updatedPosts);

            setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
        }
        catch (err){
            console.error(`Posting error found of type: ${err}`);
        }
    }

    return(
        <div id="posts-section">
            <input type="text" id="username-input" placeholder="please enter username..." value={username} onChange={(e) => setUsername(e.target.value)}></input>
            <div id="posts-container">
                {posts.length === 0 ? (
                    <p>No outfits posted yet, so get posting!</p>
                ) : (
                    posts.map((p) => (
                        <div className="post" key={p.id || Math.random()}>
                            <h1 className="post-title">{p.title}</h1>

                            {/*OUTFIT SECTION*/}
                            <div className="outfit-container">
                                <svg className="post-top" id="post-top-fill" viewBox="0 0 3000 3100" preserveAspectRatio="xMidYMid meet">
                                    <path d={p?.top?.dValue} fill={p?.top?.color || "var(--base-cream)"} />
                                </svg>
                                <img className="post-top" id="post-top-outline" src={p.top.outline} />

                                <svg className="post-bottom" id="post-bottom-fill" viewBox="0 0 3000 3100" preserveAspectRatio="xMidYMid meet">
                                    <path d={p?.bottom?.dValue} fill={p?.bottom?.color || "var(--base-cream)"} />
                                </svg>
                                <img className="post-bottom" id="post-bottom-outline" src={p.bottom.outline} />

                                <svg className="post-shoe" id="post-shoe-fill" viewBox="0 0 3000 3100" preserveAspectRatio="xMidYMid meet">
                                    <path d={p?.shoe?.dValueLeft} fill={p?.shoe?.color || "var(--base-cream)"} />
                                    <path d={p?.shoe?.dValueRight} fill={p?.shoe?.color || "var(--base-cream)"} />
                                </svg>
                                <img className="post-shoe" id="post-shoe-outline" src={p.shoe.outline} />
                                <img id="mannequin-img" src="./src/assets/mannequin.PNG" alt="mannequin" />
                            </div>

                            {/*COMMENTS SECTION*/}
                            <div className="post-comments-container">
                                {p.comments?.map((c) => (
                                    <div className="comment" key={c.id || `${p.id}-comment-${Math.random()}`}>
                                        <p className="comment-paragraph"><span className="username-span">{c.username}: </span> {c.comment}</p>
                                    </div>
                                ))}
                                <div className="comment-input-row">
                                    <input type="text" className="enter-comment" placeholder="add a comment..." value={commentInputs[p.id] || ""} onChange={(e) => commentChange(p.id, e.target.value)}></input>
                                    <button className="comment-post-btn" type="button" onClick={() => commentSubmit(p.id)}>Post!</button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default PostsDisplay;