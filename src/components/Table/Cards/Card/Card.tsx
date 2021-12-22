import Button from "../../../Button/Button";
import React from "react";
import { CardsType } from "../../../../bll/cardReducer";

type CardsPropsType = {
    card: CardsType
    deleteCardPack: (id: string) => void
}

export const Card = ({ card }: CardsPropsType) => {


    // const deleteCardPack = () => {
    //     props.deleteCardPack(cardPack._id)
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
            <Button onClick={()=>{}}>Delete</Button>
            <Button onClick={()=>{}}>Edit</Button>
            {/*<Button onClick={()=>{}}>Learn</Button>*/}
        </td>
    </tr>
}