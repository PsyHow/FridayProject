import s from "../Table.module.css";
import { Sorting } from "../../Sorting/Sorting";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStoreType } from "../../../bll/Store";
import { CardsType, getCadIdAC, getCardsTC } from "../../../bll/cardReducer";
import { Card } from "./Card/Card";
import { useParams } from "react-router-dom";
import { CardPackType } from "../CardPacks/CardPacksReducer";

export const CardsTable = () => {
    const { token }  = useParams();
    const dispatch = useDispatch();
    const cards = useSelector<AppRootStoreType, CardsType[]>(state => state.cardReducer.cards)
    const cardsPack = useSelector<AppRootStoreType, CardPackType[]>(state => state.cards.cardPacks)
    console.log(token)
    useEffect(()=> {
        if(token){
            // dispatch(getCadIdAC(token))
            dispatch(getCardsTC(token))
        }
    }, [])

    return (<>
        <table className={s.table}>
            <thead>
            <tr>
                <td>Question<Sorting sortName={'name'}/></td>
                <td>Answer<Sorting sortName={'cardsCount'}/></td>
                <td>Grade<Sorting sortName={'updated'}/></td>
                <td>Created by<Sorting sortName={'created'}/></td>
                <td>Actions</td>
            </tr>
            </thead>
            <tbody>
            {cards.map((card: any) => {
                return <Card card={card}
                                deleteCardPack={()=> {}}
                />
            })}
            </tbody>
        </table>
    </>)
}