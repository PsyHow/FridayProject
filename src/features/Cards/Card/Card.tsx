import Button from "../../../components/common/Button/Button";
import React from "react";
import { CardsType } from "../bll/cardsTypes";
import { useSelector } from "react-redux";
import { AppRootStoreType } from "bll/Store";

export const Card = ({ card, deleteCard, getUpdateCard }: CardsPropsType) => {

    const userId=useSelector<AppRootStoreType, string>(st=>st.profileReducer.user._id)

    const deleteCardId = () => {
        deleteCard(card._id)
    }

    const editCardPack = () => {
        getUpdateCard(card._id,'Why so serious?', '****')
    }

    return <tr>
        <td>{card.question}</td>
        <td>{card.answer}</td>
        <td>{card.grade}</td>
        <td>{card.updated}</td>
        <td>
            {card.user_id===userId && <Button onClick={deleteCardId}>Delete</Button>}
            {card.user_id===userId && <Button onClick={editCardPack}>Edit</Button>}
        </td>
    </tr>
}

type CardsPropsType = {
    card: CardsType
    deleteCard: (id: string) => void
    getUpdateCard:(id: string, question: string, answer: string)=> void
}