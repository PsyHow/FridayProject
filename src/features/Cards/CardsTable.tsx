import s from "../Packs/Table.module.css";
import { Sorting } from "components/Sorting/Sorting";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStoreType } from "bll/Store";
import { Card } from "./Card/Card";
import { useParams } from "react-router-dom";
import { CardsType } from "./bll/cardsTypes";
import { createCardTC, deleteCardTC, getCardsTC, updateCardTC } from "./bll/cardsThunks";
import Button from "components/common/Button/Button";
import { Search } from "../../components/Search/Search";
import { Paginator } from "../../components/common/Paginator/Paginator";

export const CardsTable = () => {
    const dispatch = useDispatch();
    const cards = useSelector<AppRootStoreType, CardsType[]>(state => state.cardReducer.cards)
    const sortCards = useSelector<AppRootStoreType, string>(state => state.cardReducer.sortCards)
    const minGrade = useSelector<AppRootStoreType, string>(state => state.cardReducer.min)
    const maxGrade = useSelector<AppRootStoreType, string>(state => state.cardReducer.max)
    const page = useSelector<AppRootStoreType, number>(state => state.cardReducer.page)
    const pageCount = useSelector<AppRootStoreType, number>(state => state.cardReducer.pageCount)
    const questionName = useSelector<AppRootStoreType, string>(state => state.cardReducer.cardQuestion)

    const pageSize = useSelector<AppRootStoreType, number>(state => state.cardReducer.pageCount)
    const currentPage = useSelector<AppRootStoreType, number>(state => state.cardReducer.page)
    const totalItemsCount = useSelector<AppRootStoreType, number>(state => state.cardReducer.cardsTotalCount)

    const { token } = useParams();

    useEffect(() => {
        if(token) {
            dispatch(getCardsTC(token))
        }
    }, [dispatch, token, sortCards, minGrade, maxGrade, page, pageCount, questionName])

    const deleteCard = (id: string) => {
        if(token)
            dispatch(deleteCardTC(token, id))
    }

    const createCard = () => {
        if(token)
            dispatch(createCardTC(token))
    }

    const updateCard = (id: string, question: string, answer: string) => {
        if(token)
            dispatch(updateCardTC(token, question, answer, id))
    }

    return ( <>
        <Button onClick={ createCard }>add Card</Button>
        <Search min={ +minGrade } max={ +maxGrade }/>
        <table className={ s.table }>
            <thead>
            <tr>
                <td>Question</td>
                <td>Answer</td>
                <td>Grade<Sorting sortName={ "grade" }/></td>
                <td>Created by<Sorting sortName={ "created" }/></td>
                <td>Actions</td>
            </tr>
            </thead>
            <tbody>
            { cards.map((card: any) => {
                return <Card card={ card }
                             deleteCard={ deleteCard }
                             getUpdateCard={ updateCard }
                />
            }) }
            </tbody>
        </table>
        <Paginator totalItemsCount={ totalItemsCount }
                   currentPage={ currentPage }
                   pageSize={ pageSize }/>
    </> )
}