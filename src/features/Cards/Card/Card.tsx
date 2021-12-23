import Button from "../../../components/common/Button/Button";
import React from "react";
import { CardsType } from "../bll/cardsTypes";

type CardsPropsType = {
    card: CardsType
    deleteCard: (id: string) => void
    getUpdateCard:(id: string, question: string, answer: string)=> void
}

export const Card = ({ card, deleteCard, getUpdateCard }: CardsPropsType) => {

    const deleteCardId = () => {
        deleteCard(card._id)
    }
    //
    const editCardPack = () => {
        //  захардкодженное имя
        getUpdateCard(card._id,'Why so serious?', '****')
    }
    //
    // const learnCardPack = () => {
    //
    // }


    return <tr>
        <td>{card.question}</td>
        <td>{card.answer}</td>
        <td>{card.grade}</td>
        <td>{card.updated}</td>
        <td>
            <Button onClick={deleteCardId}>Delete</Button>
            <Button onClick={editCardPack}>Edit</Button>
        </td>
    </tr>
}