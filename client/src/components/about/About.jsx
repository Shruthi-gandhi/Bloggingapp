import React from 'react';
import { Box, Typography, styled } from '@mui/material';
import { Header } from '../home/header';

const AboutContainer = styled(Box)`
  margin: 20px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
`;

const Title = styled(Typography)`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const SectionTitle = styled(Typography)`
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const TechList = styled(Box)`
  margin-left: 20px;
`;

export const Wrapping=styled(Box)
`
display:flex;
flex-direction:column;
gap:20px;
padding-top: 58px;
`
 export const About = () => {
  return (
    <Wrapping>
      <Header/>
    <AboutContainer>
      <Title>About the Project</Title>
      <Typography variant="body1">
      This project is a full-stack web application built with the MERN stack, offering a robust platform dedicated to blogging. It empowers users to create and share posts, engage with content, and interact with the community, providing a seamless and dynamic blogging experience.
      </Typography>

      <SectionTitle>Blogging Feature</SectionTitle>
      <Typography variant="body1">
      This blogging platform is designed for multiple users, allowing seamless login and personalized experiences. Users can create, edit, and categorize blog posts, with support for rich text formatting and image uploads. The platform also facilitates community engagement by enabling users to comment on posts, fostering discussions. Each user has control over their content, with the ability to edit or delete their own posts and comments. Categorization of posts ensures content is well-organized and easy to navigate, enhancing the overall user experience
      </Typography>

      <SectionTitle>Frontend Tech Stack</SectionTitle>
      <TechList>
        <Typography variant="body2">• React components (MUI)</Typography>
        <Typography variant="body2">• API calls - Axios</Typography>
        <Typography variant="body2">• Styling - MUI styled components</Typography>
      </TechList>

      <SectionTitle>Backend Tech Stack</SectionTitle>
      <TechList>
        <Typography variant="body2">• Node.js using Express</Typography>
        <Typography variant="body2">• Database - MongoDB</Typography>
        <Typography variant="body2">• Authentication - JWT (JSON Web Tokens)</Typography>
        <Typography variant="body2">• File Storage - Multer and GridFS</Typography>
      </TechList>
    </AboutContainer>
    </Wrapping>
  );
};

