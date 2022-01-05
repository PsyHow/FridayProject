import React from "react";
import { useSelector } from "react-redux";
import { AppRootStoreType } from "bll/Store";
import { UserType } from "bll/profileReducer";
import { Navigate } from "react-router-dom";
import styles from "./Profile.module.css";

export const Profile = () => {

    let user = useSelector<AppRootStoreType, UserType>(state => state.profileReducer.user)
    const loggedIn = useSelector<AppRootStoreType, boolean>(state => state.authReducer.isLogged)

    const style = {
        width: "200px",
        height: "200px",
    }

    if(!loggedIn) {
        return <Navigate to={ "/login" }/>
    }

    return (
        <div className={styles.box}>
            Name:<span>{ user.name }</span>
            Public Pack:<span>{ user.publicCardPacksCount }</span>
            Email:<span>{ user.email }</span>
            Created by:<span>{ user.created }</span>
            <img style={ style } src={ user.avatar || "https://habrastorage.org/r/w780/webt/fs/uc/ng/fsucngwjrulpxpcwgrrmehvhhf0.jpeg" } alt="user avatar"/>
        </div>
    )
}