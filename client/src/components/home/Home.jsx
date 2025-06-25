
import { Header } from "./header"
import { Banner } from "./banner"
import { Categories } from "./categories"
import { Post } from "./post"
import { Box,Grid,Typography,styled  } from "@mui/material"

export const Wrapping=styled(Box)
`
display:flex;
flex-direction:column;
gap:20px;
padding-top: 58px;
`
export function Home(){
    return(
        <Wrapping>
        <Header></Header>
        
        <Banner></Banner>
        <Grid container>
            <Grid item lg={2} sm={2} xs={12}><Categories/></Grid>
            <Grid container item xs={12} sm={10}>posts</Grid>
        </Grid>
        
        </Wrapping>
    )
}