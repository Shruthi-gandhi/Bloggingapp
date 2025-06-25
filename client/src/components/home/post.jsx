import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useSearchParams } from 'react-router-dom';
import { Box, Grid, styled } from '@mui/material';
import { SinglePost } from './SinglePost';

const AlternatePost = styled(Box)`
  color: #878787;
  margin: 30px 80px;
  font-size: 18px;
`;

export const Post = () => {
  const [posts, setPosts] = useState([]);
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || '';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = sessionStorage.getItem('accessToken');
        let endpoint = 'http://localhost:3000/getAllPosts';

        if (category) {
          endpoint += `?category=${category}`;
        }

        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `${accessToken}`,
          },
        });

        if (response.status === 200) {
          setPosts(response.data);
        }
      } catch (error) {
        console.error('Error fetching posts', error);
      }
    };

    fetchData();
  }, [category]);

  return (
    <>
      {posts && posts.length > 0 ? (
        <Grid container spacing={3}>
          {posts.map((post) => (
            <Grid item lg={3} sm={4} xs={12} key={post._id}>
              <Link
                to={`/details/${post._id}`}
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'block',
                }}
              >
                <SinglePost post={post} />
              </Link>
            </Grid>
          ))}
        </Grid>
      ) : (
        <AlternatePost>No Data Available to Display</AlternatePost>
      )}
    </>
  );
};
