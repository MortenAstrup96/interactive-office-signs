import React, {useState} from "react";
import {Button, TextField} from "@material-ui/core";
import IconMail from "../../img/icons/iconMail";
import IconPerson from "../../img/icons/iconPerson";
import {UserInformation} from "../../library/general_interfaces";

interface ProfileSettingsProps {
    user: UserInformation;
}

export const ProfileSettings = (props: ProfileSettingsProps) => {
    const [currentUser] = useState<UserInformation>(props.user);
    const avatarFake = require("../../img/avataricon.png");

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
        <div style={{margin: "30px", width: "600px"}}>
            <h1>PROFILE SETTINGS</h1>
            <div style={{display: "grid", gridTemplateColumns: "1fr 2fr"}}>
                <div>
                    {getProfileImage()}
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
                        <IconMail/>
                        <TextField id="outlined-basic" label="Name" value={currentUser?.name} variant="outlined"
                                   size="small"
                                   style={{width: "280px"}}/>
                    </div>

                    <div>
                        <IconPerson/>
                        <TextField id="outlined-basic" label="Mail" value={currentUser?.mail} variant="outlined"
                                   size="small"
                                   style={{width: "280px"}}/>
                    </div>
                </div>
            </div>
        </div>);
};