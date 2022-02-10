import Button from "../../../components/common/Button/Button";
import React from "react";
import { Navigate, NavLink } from "react-router-dom";
import { CardPackType } from "../bll/CardPacksTypes";
import { useSelector } from "react-redux";
import { AppRootStoreType } from "bll/Store";

type CardPackPropsType = {
    cardPack: CardPackType
    deleteCardPack: (id: string) => void
    editCardPack: (id: string, name: string) => void
}

export const CardPack = (props: CardPackPropsType) => {
    const {cardPack} = props;
    const userId=useSelector<AppRootStoreType, string>(st=>st.profileReducer.user._id)

    const deleteCardPack = () => {
        props.deleteCardPack(cardPack._id)
    }

    const editCardPack = () => {
        //  захардкодженное имя
        props.editCardPack(cardPack._id, 'ssssss')
    }
   
    return <tr>
        <td>
            <NavLink style={{textDecoration: "none", color: "#1d1d1d"}} to={`/card/${cardPack._id}`}>
                <span >{cardPack.name}</span>
            </NavLink>
        </td>
        <td>{cardPack.cardsCount}</td>
        <td>{cardPack.updated}</td>
        <td>{cardPack.user_name}</td>
        <td>

            {cardPack.user_id===userId && <Button onClick={deleteCardPack}>Delete</Button>}
            {cardPack.user_id===userId && <Button onClick={editCardPack}>Edit</Button>}

            <NavLink to={`/learn/${cardPack._id}`}>
                <Button>Learn</Button>
            </NavLink>

        </td>
    </tr>
}