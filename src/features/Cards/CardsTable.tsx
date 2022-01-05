import s from "../Packs/Table.module.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStoreType } from "bll/Store";
import { Card } from "./Card/Card";
import { useParams } from "react-router-dom";
import { createCardTC, deleteCardTC, getCardsTC, updateCardTC } from "./bll/cardsThunks";
import Button from "components/common/Button/Button";
import { Paginator } from "components/common/Paginator/Paginator";
import { setPacksCurrentPageAC } from "features/Packs/bll/CardPacksActions";
import { Search } from "components/common/Search/Search";
import { Sorting } from "components/common/Sorting/Sorting";
import { Preloader } from "components/Preloader/Preloader";
import { CardsType } from "features/Cards/bll/cardsTypes";

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
    } = useSelector((state: AppRootStoreType) => state.cardsReducer)

    const isFetching = useSelector<AppRootStoreType, boolean>(state => state.registrationReducer.isFetching)

    const { token } = useParams();

    useEffect(() => {
        if (token) {
            dispatch(getCardsTC(token))
        }
        return () => {
            dispatch(setPacksCurrentPageAC(1))
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
            {
                isFetching ? <Preloader/> :
                <tbody>
                { cards.map((card: CardsType) => {
                    return <Card card={ card }
                                 deleteCard={ deleteCard }
                                 getUpdateCard={ updateCard }
                    />
                }) }
                </tbody>
            }
        </table>
        {!isFetching && <Paginator
            page={page}
            pageCount={pageCount}
            totalItemsCount={ cardsTotalCount }/>}

        {error && <span className={s.error}>{ error }</span>}
    </> )
}