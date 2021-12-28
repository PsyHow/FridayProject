import { useDispatch } from "react-redux";
import { setCardsCurrentPageAC } from "features/Cards/bll/cardsActions";
import { useParams } from "react-router-dom";
import { getCardsTC } from "features/Cards/bll/cardsThunks";
import Button from "components/common/Button/Button";

export const LearnPagination = ({ page }: PropsType) => {
    const dispatch = useDispatch();
    const { token } = useParams();

    const setNextQuestion = () => {
        dispatch(setCardsCurrentPageAC(page + 1))
        if (token) {
            dispatch(getCardsTC(token))
        }
    }

    return <Button onClick={ setNextQuestion }>Next</Button>
}

type PropsType = {
    page: number
    pageCount: number
    totalItemsCount: number
}