import style from "./Paginator.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { AppRootStoreType } from "../../bll/Store";
import { setCurrentPageAC } from "../../bll/paginator_reducer/paginator_reducer";

export const Paginator = () => {
    const totalItemsCount = useSelector<AppRootStoreType, number>(state => state.pageReducer.totalItemsCount)
    const currentPage = useSelector<AppRootStoreType, number>(state => state.pageReducer.currentPage)
    const pageSize = useSelector<AppRootStoreType, number>(state => state.pageReducer.pageSize)

    const [portionNumber, setPortionNumber] = useState<number>(1)

    const pagesCount = Math.ceil(totalItemsCount / pageSize)
    const pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)

    }
    const portionSize = 10
    const portionCount = Math.ceil(pagesCount / portionSize)
    const leftPortionPageNumber = ( portionNumber - 1 ) * portionSize + 1
    const rightPortionPageNumber = portionNumber * portionSize

    const onPageChanged = (page: number) => {
        setCurrentPageAC(page)
    }

    return (
        <div className={ style.paginator }>
            { portionNumber > 1 &&
            <button
                onClick={ () => {setPortionNumber(portionNumber - 1)} }>Left</button> }
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
            <button
                onClick={ () => {setPortionNumber(portionNumber + 1)} }>Right</button> }
        </div>
    )
}