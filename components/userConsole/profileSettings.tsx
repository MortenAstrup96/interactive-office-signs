import React, {useState} from "react";
import {Button, TextField} from "@material-ui/core";
import IconMail from "../../img/icons/iconMail";
import IconPerson from "../../img/icons/iconPerson";
import {UserInformation} from "../../library/general_interfaces";
import {generalStyle} from "../../styles/generalStyles";

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
                const avatarReal = require("../../img/profile/" + currentUser.nameId + ".jpg");
                return (<img style={{
                    objectFit: "cover",
                    borderRadius: "50%",
                    height: "150px",
                    width: "150px"
                }} src={avatarReal} alt={avatarFake}/>)
            } catch (e) {
                return (<img src={avatarFake} alt={avatarFake} width="150px"/>);
            }
        }
        return (<img src={avatarFake} alt={avatarFake} width="150px"/>);
    }

    return (
        <div className={generalStyling.profile}>
            <h1>PROFILE SETTINGS</h1>
            <div style={{display: "grid", gridTemplateColumns: "1fr 2fr"}}>
                <div>
                    {getProfileImage()}
                    <div style={{marginTop: "10px"}}></div>
                    <Button
                        variant="contained"
                        component="label"
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
                    <div>
                        <IconPerson/>
                        <TextField id="outlined-basic" label="Name" value={currentUser?.name} variant="outlined"
                                   size="small"
                                   style={{width: "280px"}}/>
                    </div>

                    <div>
                        <IconMail/>
                        <TextField id="outlined-basic" label="Mail" value={currentUser?.mail} variant="outlined"
                                   size="small"
                                   style={{width: "280px"}}/>
                    </div>
                </div>
            </div>
        </div>);
};