import s from "../Packs/Table.module.css";
import { Sorting } from "components/Sorting/Sorting";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStoreType } from "bll/Store";
import { Card } from "./Card/Card";
import { useParams } from "react-router-dom";
import { createCardTC, deleteCardTC, getCardsTC, updateCardTC } from "./bll/cardsThunks";
import Button from "components/common/Button/Button";
import { Search } from "components/Search/Search";
import { Paginator } from "components/common/Paginator/Paginator";
import { setCurrentPageAC } from "../../components/common/Paginator/paginatorActions";

export const CardsTable = () => {
    const dispatch = useDispatch();
    const {
        cards,
        min,
        max,
        cardsTotalCount,
        maxGradeCount,
        minGradeCount,
        pageCount,
        page,
        error
    } = useSelector((state: AppRootStoreType) => state.cards)

    const { token } = useParams();

    useEffect(() => {
        dispatch(setCurrentPageAC(1))
        if (token) {
            dispatch(getCardsTC(token))
        }
    }, [dispatch, token])

    const deleteCard = (id: string) => {
        if (token)
            dispatch(deleteCardTC(token, id))
    }

    const createCard = () => {
        if (token)
            dispatch(createCardTC(token))
    }

    const updateCard = (id: string, question: string, answer: string) => {
        if (token)
            dispatch(updateCardTC(token, question, answer, id))
    }

    debugger;

    return ( <>
        <Button onClick={ createCard }>add Card</Button>
        <Search
            token={token}
            min={ min } max={ max }
                defaultMin={ minGradeCount }
                defaultMax={ maxGradeCount }/>
        <table className={ s.table }>
            <thead>
            <tr>
                <td>Question</td>
                <td>Answer</td>
                <td>Grade<Sorting token={token} sortName={ "grade" }/></td>
                <td>Created by<Sorting token={token} sortName={ "created" }/></td>
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
        <Paginator
            page={page}
            pageCount={pageCount}
            totalItemsCount={ cardsTotalCount }/>
        {error && <span className={s.error}>{ error }</span>}
    </> )
}