import { useDispatch, useSelector } from "react-redux";
import { AppRootStoreType } from "bll/Store";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCardsTC } from "features/Cards/bll/cardsThunks";
import { LearnPagination } from "features/Learn/LearnPagination/LearnPagination";
import { setCardsPageCount } from "features/Cards/bll/cardsActions";

export const Learn = () => {

    const dispatch = useDispatch();

    const {
        cards,
        cardsTotalCount,
        pageCount,
        page,
    } = useSelector((state: AppRootStoreType) => state.cards)

    const { token } = useParams();

    const [toggle, setToggle] = useState<boolean>(false)

    useEffect(() => {
        if (token) {
            dispatch(getCardsTC(token))
            dispatch(setCardsPageCount(1))
        }
    }, [dispatch, token])

    return <div>
        { cards.map(card => <div>
            <div onClick={()=>setToggle(!toggle)} style={ { paddingBottom: "30px" } }>{ card.question }</div>
            {toggle && <div style={ { paddingBottom: "30px" } }>{ card.answer }</div>}
            {/*<div style={ { paddingBottom: "30px" } }>{ card.answer }</div>*/}
        </div>) }
        <LearnPagination
            page={ page }
            pageCount={ pageCount }
            totalItemsCount={ cardsTotalCount }
        />
    </div>
}