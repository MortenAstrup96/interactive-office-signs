import React, {useState} from "react";
import {Button, SvgIcon, SvgIconProps, TextField, ThemeProvider} from "@material-ui/core";
import IconMail from "../../img/icons/iconMail";
import IconPerson from "../../img/icons/iconPerson";
import {UserInformation} from "../../library/general_interfaces";
import {generalStyle, theme} from "../../styles/generalStyles";


interface ProfileSettingsProps {
    user: UserInformation;
}

export const ProfileSettings = (props: ProfileSettingsProps) => {
    const [currentUser] = useState<UserInformation>(props.user);
    const avatarFake = require("../../img/avataricon.png");
    const generalStyling = generalStyle();

    const postProfileImage = async (e: any) => {
        const file = e.currentTarget.files[0];
        if (currentUser) {
            await fetch("/api/uploadImageById/" + currentUser.nameId, {
                method: "POST",
                headers: {
                    "Content-Type": file.type
                },
                body: file
            });
        }
    };

    function getProfileImage() {
        if (currentUser) {
            try {
                return (<img style={{
                    objectFit: "cover",
                    borderRadius: "50%",
                    height: "200px",
                    width: "200px"
                }} src={require("../../img/profile/" + currentUser.nameId + ".jpg")} alt={avatarFake}/>)
            } catch (e) {
                return (<img style={{
                    objectFit: "cover",
                    borderRadius: "50%",
                    height: "200px",
                    width: "200px"
                }} src={avatarFake}/>)
            }

        }
    }

    function PersonIcon(props: SvgIconProps) {
        return (
            <SvgIcon {...props}>
                <path
                    d="M9 8c1.66 0 2.99-1.34 2.99-3S10.66 2 9 2C7.34 2 6 3.34 6 5s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V16h14v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
            </SvgIcon>
        );
    }

    function EmailIcon(props: SvgIconProps) {
        return (
            <SvgIcon {...props}>
                <path d="M22 4H2v16h20V4zm-2 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </SvgIcon>
        );
    }

    function TitleIcon(props: SvgIconProps) {
        return (
            <SvgIcon {...props}>
                <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"></path>
            </SvgIcon>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <div className={generalStyling.profile}>
                <h1>PROFILE SETTINGS</h1>
                <div style={{display: "grid", gridTemplateColumns: "1fr 2fr"}}>
                    <div>
                        {getProfileImage()}
                        <Button
                            variant="contained"
                            component="label"
                            style={{marginTop: "10px"}}
                        >
                            Change Picture
                            <input
                                type="file"
                                onChange={postProfileImage}
                                style={{display: "none"}}
                            />
                        </Button>
                    </div>

                    <div style={{marginRight: "20px", marginTop: "30px"}}>
                        <ThemeProvider theme={theme}>
                            <div>
                                <PersonIcon style={{color: '#002546', fontSize: 48}}/>
                                <TextField id="outlined-basic" label="Name" value={currentUser?.name} variant="outlined"
                                           size="small"
                                           style={{width: "280px", marginBottom: "15px"}}/>
                            </div>

                            <div>
                                <EmailIcon fontSize="large" style={{color: '#002546', marginTop: "10px"}}/>
                                <TextField id="outlined-basic" label="Mail" value={currentUser?.mail} variant="outlined"
                                           size="small"
                                           style={{width: "280px", marginLeft: "11px", marginTop: "7px"}}/>
                            </div>

                            <div>
                                <TitleIcon fontSize="large" style={{color: '#002546', marginTop: "22px"}}/>
                                <TextField id="outlined-basic" label="Title" value={currentUser?.title}
                                           variant="outlined" size="small"
                                           style={{width: "280px", marginLeft: "11px", marginTop: "20px"}}/>
                            </div>

                        </ThemeProvider>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
};


