import style from "./Paginator.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { AppRootStoreType } from "../../bll/Store";

export const Paginator = () => {
    const totalItemsCount = useSelector<AppRootStoreType, number>(state => state.pageReducer.totalItemsCount)

    const [portionNumber, setPortionNumber] = useState<number>(1)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(10)

    const pagesCount = Math.ceil(totalItemsCount / pageSize)
    const pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)

    }
    const portionSize = 10
    const portionCount = Math.ceil(pagesCount / portionSize)
    const leftPortionPageNumber = ( portionNumber - 1 ) * portionSize + 1
    const rightPortionPageNumber = portionNumber * portionSize

    const onPageChanged = (page: number, pageSize?: number | undefined) => {
        setPageSize(pageSize as number)
        setCurrentPage(page)
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
                        onClick={()=> {onPageChanged(m)} }>
                { m }
            </span>)
            }

            { portionCount > portionNumber &&
            <button
                onClick={ () => {setPortionNumber(portionNumber + 1)} }>Right</button> }
        </div>
    )
}