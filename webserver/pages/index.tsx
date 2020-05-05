import {Button, CssBaseline, Grid, TextField, ThemeProvider,} from "@material-ui/core";
import Link from "next/link";
import React, {useState} from "react";
import {theme} from "../styles/generalStyles";

function Index() {
    const [username, setUsername] = useState<string>("");

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
        <Grid container
              direction="column"
              justify="space-between"
              alignItems="center"
              spacing={2}>
            <Grid item>
                <h1>LOGIN TO YOUR ACCOUNT</h1>
            </Grid>
            <div style={{marginBottom: "2%"}}>
                <form noValidate autoComplete="off">
                    <Grid container direction="column" justify="space-between" alignItems="center" spacing={2}>
                        <Grid item>
                            <TextField id="outlined-basic" label="Username" variant="outlined" value={username}
                                       onChange={event => setUsername(event.target.value)}
                                       style={{width: 350, height: 40, margin: "10px"}}/>
                        </Grid>
                        <Grid item>
                            <TextField id="outlined-basic" label="Pincode" variant="outlined"
                                       style={{width: 350, height: 40, margin: "10px"}}/>
                        </Grid>
                    </Grid>
                </form>
            </div>

            <Grid item>
                <Link href={"/user/" + username}>
                    <Button variant="contained" color="primary"
                            style={{width: 140, height: 45, marginRight: "10px"}}>Console</Button>
                </Link>

                <Link href={"/office/" + username}>
                    <Button variant="contained" color="primary"
                            style={{width: 140, height: 45, marginLeft: "10px"}}>Tablet</Button>
                </Link>
            </Grid>
            <Link href={"/create-account/"}>
                <Grid item>
                    <Button variant="outlined" color="primary" style={{width: 300, height: 45}}>Create Account</Button>
                </Grid>
            </Link>
        </Grid>
        </ThemeProvider>
    );
}


export default Index;
