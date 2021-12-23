import Button from "../../../components/common/Button/Button";
import React from "react";
import { CardsType } from "../bll/cardsTypes";

type CardsPropsType = {
    card: CardsType
    // deleteCard: (id: string) => void
}

export const Card = ({ card }: CardsPropsType) => {

    // const deleteCardId = () => {
    //     deleteCard(card._id)
    // }
    //
    // const editCardPack = () => {
    //     //  захардкодженное имя
    //     props.editCardPack(cardPack._id, 'ssssss')
    // }
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
            <Button onClick={()=> {}}>Delete</Button>
            <Button onClick={()=>{}}>Edit</Button>
        </td>
    </tr>
}