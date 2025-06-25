import { useState, useEffect, useContext } from 'react';
import { Box, TextareaAutosize, Button, styled } from '@mui/material';
import { UserContext } from '../context/Context';
import { Comment } from './Comment';
import axios from 'axios';

const Container = styled(Box)`
    margin-top: 100px;
    display: flex;
`;

const Image = styled('img')({
    width: 50,
    height: 50,
    borderRadius: '50%'
});

const Mini = styled(Box)(({ theme }) => ({
    margin: "0 50px 0 50px",
    [theme.breakpoints.down("md")]: {
      margin: "0 30px 0 30px", // Reduced margin for medium screens
    },
    [theme.breakpoints.down("sm")]: {
      margin: "0 10px 0 10px", // Further reduced margin for small screens
    },
  }));
  

const StyledTextArea = styled(TextareaAutosize)`
    height: 100px !important;
    width: 100%; 
    margin: 0 20px;
    border: none;
    &:focus-visible {
        outline: none;
    }
`;

const initialValue = {
    name: '',
    postId: '',
    date: new Date(),
    comments: ''
};

export const Comments = ({ post }) => {
    const url = 'https://static.thenounproject.com/png/12017-200.png';

    const [comment, setComment] = useState(initialValue);
    const [comments, setComments] = useState([]);
    const [toggle, setToggle] = useState(false);

    const { user } = useContext(UserContext);

    useEffect(() => {
        const getData = async () => {
            try {
                const token = sessionStorage.getItem('accessToken');
                const response = await axios.get(`http://localhost:3000/comments/${post._id}`, {
                    headers: {
                        Authorization: `${token}`
                    }
                });
                if (response.status === 200) {
                    const fetchedComments = Array.isArray(response.data) ? response.data : [];
                    setComments(fetchedComments);
                }
            } catch (error) {
                console.error("Error fetching comments", error);
                setComments([]); // Set to an empty array in case of an error
            }
        };
        if (post._id) {
            getData();
        }
    }, [toggle, post]);

    const handleChange = (e) => {
        setComment({
            ...comment,
            name: user.userName,
            postId: post._id,  // Ensure postId is set correctly
            comments: e.target.value
        });
        console.log("Comment state:", { ...comment, postId: post._id }); // Debugging
    };
    

    const addComment = async () => {
        if (!comment.postId) {
            console.error("postId is missing");
            return;
        }
        try {
            const token = sessionStorage.getItem('accessToken');
            await axios.post('http://localhost:3000/comment', {
                ...comment,
                date: new Date()
            }, {
                headers: {
                    Authorization: `${token}`
                }
            });
            setComment(initialValue);
            setToggle(prev => !prev);
        } catch (error) {
            console.error("Error adding comment", error);
        }
    };
    

    return (
        <Mini>
            <Container>
                <Image src={url} alt="dp" />
                <StyledTextArea 
                    minRows={5} 
                    placeholder="What's on your mind?"
                    onChange={handleChange} 
                    value={comment.comments}
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                    size="medium" 
                    style={{ height: 40 }}
                    onClick={addComment}
                >Post</Button>             
            </Container>
            <Box>
                {Array.isArray(comments) && comments.length > 0 ? (
                    comments.map(comment => (
                        <Comment key={comment._id} comment={comment} setToggle={setToggle} />
                    ))
                ) : (
                    <p>No comments yet</p>
                )}
            </Box>
        </Mini>
    );
};
