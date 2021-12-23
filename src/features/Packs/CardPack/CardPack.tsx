import Button from "../../../components/common/Button/Button";
import React from "react";
import { NavLink } from "react-router-dom";
import { CardPackType } from "../bll/CardPacksTypes";

type CardPackPropsType = {
    cardPack: CardPackType
    deleteCardPack: (id: string) => void
    editCardPack: (id: string, name: string) => void
}

export const CardPack = (props: CardPackPropsType) => {
    const {cardPack} = props;

    const deleteCardPack = () => {
        props.deleteCardPack(cardPack._id)
    }

    const editCardPack = () => {
        //  захардкодженное имя
        props.editCardPack(cardPack._id, 'ssssss')
    }

    return <tr>
        <td>{cardPack.name}</td>
        <td>{cardPack.cardsCount}</td>
        <td>{cardPack.updated}</td>
        <td>{cardPack.user_name}</td>
        <td>
            <Button onClick={deleteCardPack}>Delete</Button>
            <Button onClick={editCardPack}>Edit</Button>
            <NavLink to={`/card/${cardPack._id}`}>
                <Button>Learn</Button>
            </NavLink>

        </td>
    </tr>
}