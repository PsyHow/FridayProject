import style from "./Paginator.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { SuperSelect } from "../Select/SuperSelect";
import Button from "../Button/Button";
import {
    setCurrentPageAC,
    setPageCount,
} from "features/Packs/bll/CardPacksActions";
import { setCardsError } from "../../../features/Cards/bll/cardsActions";

export const Paginator = ({totalItemsCount, currentPage, pageSize}:PropsType) => {
    const dispatch = useDispatch();

    const pageItems = [3, 5, 10];

    const [portionNumber, setPortionNumber] = useState<number>(1)
    const [value, setValue] = useState(pageItems[1])

    const pagesCount = Math.ceil(totalItemsCount / pageSize)
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
    }

    const onChangeSelect = (items: 3 | 5 | 10) => {
        dispatch(setPageCount(items))
        setValue(items)
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
                        className={ currentPage === m ? style.selectedPage : style.pageNumber }
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
    totalItemsCount:number
    currentPage:number
    pageSize:number
}