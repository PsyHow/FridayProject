import style from "./Paginator.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStoreType } from "../../bll/Store";
import { setCurrentPageAC, setPageCount } from "../Table/CardPacks/CardPacksReducer";
import { SuperSelect } from "../Select/SuperSelect";
import Button from "../Button/Button";

export const Paginator = () => {
    const dispatch = useDispatch();

    const totalItemsCount = useSelector<AppRootStoreType, number>(state => state.cards.cardPacksTotalCount)
    const currentPage = useSelector<AppRootStoreType, number>(state => state.cards.page)
    const pageSize = useSelector<AppRootStoreType, number>(state => state.cards.pageCount)
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