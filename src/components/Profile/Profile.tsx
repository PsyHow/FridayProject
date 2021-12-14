import React from "react";
import {useSelector} from "react-redux";
import {AppRootStoreType} from "../../bll/Store";
import {UserType} from "../../bll/profileReducer";

export const Profile = () => {
    let user = useSelector<AppRootStoreType, UserType>(state => state.profileReducer.user)


    const style = {
        width: "200px",
        height: "200px"
    }
    return (
        <div>
            {
                user._id === "fake_ID"
                    ? <span>You need to login first</span>
                    : <>
                        <span>{user.name}</span>
                        <img style={style} src={user.avatar} alt="user avatar"/>
                    </>
            }


        </div>
    )
}