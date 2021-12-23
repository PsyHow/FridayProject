import s from "../Packs/Table.module.css";
import { Sorting } from "components/Sorting/Sorting";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStoreType } from "bll/Store";
import { Card } from "./Card/Card";
import { useParams } from "react-router-dom";
import { CardsType } from "../Cards/bll/cardsTypes";
import { getCardsTC } from "./bll/cardsThunks";

export const CardsTable = () => {
    const dispatch = useDispatch();
    const cards = useSelector<AppRootStoreType, CardsType[]>(state => state.cardReducer.cards)
    const { token } = useParams();

    useEffect(() => {
        if (token) {
            dispatch(getCardsTC(token))
        }
    }, [token])

    // const deleteCard = (id:string) => {
    //     dispatch(deleteCardTC(id))
    // }

    return ( <>
        <table className={ s.table }>
            <thead>
            <tr>
                <td>Question<Sorting sortName={ "name" }/></td>
                <td>Answer<Sorting sortName={ "cardsCount" }/></td>
                <td>Grade<Sorting sortName={ "updated" }/></td>
                <td>Created by<Sorting sortName={ "created" }/></td>
                <td>Actions</td>
            </tr>
            </thead>
            <tbody>
            { cards.map((card: any) => {
                return <Card card={ card }
                             // deleteCard={ deleteCard }
                />
            }) }
            </tbody>
        </table>
    </> )
}