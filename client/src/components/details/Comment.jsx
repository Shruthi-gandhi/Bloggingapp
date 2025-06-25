import { useContext } from "react";
import { Typography, Box, styled } from "@mui/material";
import { Delete } from '@mui/icons-material';
import axios from "axios";
import { UserContext } from "../context/Context";

const Component = styled(Box)`
    margin-top: 30px;
    background: #F5F5F5;
    padding: 10px;
`;

const Container = styled(Box)`
    display: flex;
    margin-bottom: 5px;
`;

const Name = styled(Typography)`
    font-weight: 600;
    font-size: 18px;
    margin-right: 20px;
`;

const StyledDate = styled(Typography)`
    font-size: 14px;
    color: #878787;
`;

const DeleteIcon = styled(Delete)`
    margin-left: auto;
`;

export const Comment = ({ comment, setToggle }) => {
    const { user } = useContext(UserContext);

    const removeComment = async () => {
        try {
            const token = sessionStorage.getItem('accessToken');
            await axios.delete(`http://localhost:3000/deletecomment/${comment._id}`, {
                headers: {
                    Authorization: `${token}`  // Include authorization token from session storage
                }
            });
            setToggle(prev => !prev);
        } catch (error) {
            console.error("Error deleting comment", error);
        }
    }

    return (
        <Component>
            <Container>
                <Name>{comment.name}</Name>
                <StyledDate>{new Date(comment.date).toDateString()}</StyledDate>
                {comment.name === user.userName && <DeleteIcon onClick={removeComment} />}
            </Container>
            <Typography>{comment.comments}</Typography>
        </Component>
    )
}
