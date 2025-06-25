import { Button, Table, TableHead, TableBody, TableCell, TableRow,styled } from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";

const categories = [
    { id: 1, type: "Music" },
    { id: 2, type: "Movies" },
    { id: 3, type: "Sports" },
    { id: 4, type: "Tech" },
    { id: 5, type: "Fashion" }
];
const Styledtable=styled(Table)`
border:1px solid rgba(224,224,224,1);
margin-top:10px;
`
const StyledButton=styled(Button)`
width:85%;
background:#6495ed;

color:#fff;`

const StyledLink=styled(Link)`
text-decoration:none;
color:inherit;`


export const Categories = () => {

    const [searchParams]=useSearchParams();
    const category=searchParams.get("category")


    return (
        <>  
            <StyledLink to={`/create?category=${category || ""}`}>
            <StyledButton variant="contained"> Create a Blog</StyledButton></StyledLink>

            <Styledtable>
                <TableHead>
                    <TableRow>
                        <TableCell><StyledLink to={"/home"}>All Categories</StyledLink> </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {categories.map((category) => (
                        <TableRow key={category.id}>
                            <TableCell><StyledLink to={`/home/?category=${category.type}`}>{category.type}</StyledLink></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Styledtable>
        </>
    );
};
