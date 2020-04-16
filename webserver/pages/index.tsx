import {Button, Grid, TextField,} from "@material-ui/core";
import Link from "next/link";
import {useState} from "react";
import fetch from 'isomorphic-unfetch'


function Index() {
    const [username, setUsername] = useState<string>("");

    return (
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
                                       style={{width: 300, height: 40, margin: "10px"}}/>
                        </Grid>
                        <Grid item>
                            <TextField id="outlined-basic" label="Pincode" variant="outlined"
                                       style={{width: 300, height: 40, margin: "10px"}}/>
                        </Grid>
                    </Grid>
                </form>
            </div>

            <Grid item>
                <Link href={"/user/" + username}>
                    <Button variant="contained" color="primary" style={{width: 180, height: 45}}>Sign In</Button>
                </Link>
            </Grid>
            <Link href={"/create-account/"}>
                <Grid item>
                    <Button variant="outlined" color="primary" style={{width: 180, height: 45}}>Create Account</Button>
                </Grid>
            </Link>

            <Grid item>
                <Link href={"/tablets/"}>
                    <Button variant="contained" color="primary" style={{width: 250, height: 45, marginTop: "20px"}}>Tablet
                        Overview</Button>
                </Link>
            </Grid>
        </Grid>

    );
}

export default Index;