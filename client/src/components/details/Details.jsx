import { useState, useEffect, useContext } from 'react';
import { Box, Typography, styled } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { useParams ,Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { Header } from '../home/header';
import { Comments } from './Comments';
import axios from 'axios';
import { UserContext } from '../context/Context';

const Container = styled(Box)(({ theme }) => ({
  margin: '50px 10px', // Adjust margin for responsiveness
  [theme.breakpoints.up('md')]: {
    margin: '50px 100px', // Margin for larger screens
  },
  overflow: 'hidden', // Prevent overflow
}));

const Image = styled('img')({
  width: '100%',
  height: '60vh', // Adjust height to maintain aspect ratio
  objectFit: 'cover',
});

const EditIcon = styled(Edit)`
  margin: 5px;
  padding: 5px;
  border: 1px solid #878787;
  border-radius: 10px;
`;

const DeleteIcon = styled(Delete)`
  margin: 5px;
  padding: 5px;
  border: 1px solid #878787;
  border-radius: 10px;
`;

const Heading = styled(Typography)`
  font-size: 2rem; // Responsive font size
  font-weight: 600;
  text-align: center;
  margin: 20px 0;
  word-break: break-word; // Break long words
`;

const Author = styled(Box)(({ theme }) => ({
  color: '#878787',
  display: 'flex',
  flexDirection: 'column',
  margin: '20px 0',
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row', // Flex direction for larger screens
  },
}));

const Description = styled(Typography)`
  word-break: break-word; // Break long words
`;

export const Details = () => {
  const [post, setPost] = useState({});
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const Navigate=useNavigate();

  const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/getPost/${id}`, {
          headers: {
            Authorization: `${sessionStorage.getItem('accessToken')}`, // Fixed token header format
          },
        });
        if (response.status === 200) {
          setPost(response.data);
        }
      } catch (error) {
        console.error('Error fetching post', error);
      }
    };

    fetchData();
  }, [id]);

  const extractUsernameBeforeDomain = (username) => {
    if (username && typeof username === 'string') {
      const match = username.match(/^([^@]+)@gmail\.com$/);
      return match ? match[1] : username;
    }
    return '';
  };


  const deleteBlog = async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/deletepost/${post._id}`, {
        headers: {
          Authorization: `${sessionStorage.getItem('accessToken')}`,
        },
      });
      if (response.status === 200) {
        console.log("Post deleted successfully");
        // You can redirect the user or update the UI accordingly
        Navigate("/home")
        
      }
    } catch (error) {
      console.error("Error deleting post", error);
    }
  };
  

  return (
    <Box>
      <Header />
      <Container>
        <Image src={post.picture || url} alt="post" />
        <Box sx={{ float: 'right' }}>
          {user.userName === post.userName && (
            <>
              <Link to={`/update/${post._id}`}>
                <EditIcon color="primary" />
              </Link>
              <DeleteIcon onClick={deleteBlog} color="error" />
            </>
          )}
        </Box>
        <Heading>{post.title}</Heading>
  
        <Author>
          <Typography>
            Author: <span style={{ fontWeight: 600 }}>{extractUsernameBeforeDomain(post.userName)}</span>
          </Typography>
          <Typography sx={{ marginLeft: 'auto' }}>
            {new Date(post.createDate).toDateString()}
          </Typography>
        </Author>
  
        <Description>{post.description}</Description>
      </Container>
      {/* Conditionally render Comments if post._id exists */}
      {post._id && <Comments post={post} />}
    </Box>
  );
  
};
