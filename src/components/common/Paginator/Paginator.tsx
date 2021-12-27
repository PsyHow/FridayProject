import style from "./Paginator.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SuperSelect } from "../Select/SuperSelect";
import Button from "../Button/Button";
import { setCardsError } from "features/Cards/bll/cardsActions";
import { getCardPacksTC } from "features/Packs/bll/CardPacksThunk";
import { AppRootStoreType } from "bll/Store";
import { useParams } from "react-router-dom";
import { getCardsTC } from "features/Cards/bll/cardsThunks";
import { setCurrentPageAC, setPageCount } from "bll/paginatorReducer/paginatorActions";

export const Paginator = ({ totalItemsCount }: PropsType) => {
    const dispatch = useDispatch();

    const { page, pageCount } = useSelector((state: AppRootStoreType) => state.cardPacks)

    const pageItems = [3, 5, 10];

    const { token } = useParams();

    const [portionNumber, setPortionNumber] = useState<number>(1)

    const [value, setValue] = useState(pageItems[1])

    const pagesCount = Math.ceil(totalItemsCount / pageCount)

    const pages = []

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)

    }
    const portionSize = 5
    const portionCount = Math.ceil(pagesCount / portionSize)
    const leftPortionPageNumber = ( portionNumber - 1 ) * portionSize + 1
    const rightPortionPageNumber = portionNumber * portionSize

    const onPageChanged = (page: number) => {
        dispatch(setCardsError(''))
        dispatch(setCurrentPageAC(page))
        if(token) {
            dispatch(getCardsTC(token))
        } else
            dispatch(getCardPacksTC())
    }

    const onChangeSelect = (items: 3 | 5 | 10) => {
        dispatch(setPageCount(items))
        setValue(items)
        if(token) {
            dispatch(getCardsTC(token))
        } else
            dispatch(getCardPacksTC())
    }

    return (
        <div className={ style.paginator }>
            { portionNumber > 1 &&
            <Button
                onClick={ () => {setPortionNumber(portionNumber - 1)} }>Left</Button> }
            <SuperSelect options={ pageItems }
                         value={ value }
                         onChangeOption={ onChangeSelect }
            />
            { pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(m =>
                    <span
                        className={ page === m ? style.selectedPage : style.pageNumber }
                        onClick={ () => {onPageChanged(m)} }>
                { m }
            </span>)
            }
            { portionCount > portionNumber &&
            <Button
                onClick={ () => {setPortionNumber(portionNumber + 1)} }>Right</Button> }
        </div>
    )
}

type PropsType = {
    totalItemsCount: number
}