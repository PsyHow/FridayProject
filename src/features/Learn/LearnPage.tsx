import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { CardsType } from "features/Cards/bll/cardsTypes";
import { AppRootStoreType } from "bll/Store";
import { getCardsTC, updateCardGradeTC } from "features/Cards/bll/cardsThunks";
import { useParams } from "react-router-dom";
import Button from "components/common/Button/Button";

// есть баги
const grades = ["Did not know", "Forgot", "A lot of thought", "Confused", "Knew the answer"]

const getCard = (cards: CardsType[]) => {
    const sum = cards.reduce((acc, card) => acc + ( 6 - card.grade ) * ( 6 - card.grade ), 0)
    const rand = Math.random() * sum
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + ( 6 - card.grade ) * ( 6 - card.grade )
            return { sum: newSum, id: newSum < rand ? i : acc.id }
        }
        , { sum: 0, id: -1 })
    return cards[res.id + 1]
}

export const LearnPage = () => {
    const dispatch = useDispatch()
    const { token } = useParams();
    const packId = useSelector<AppRootStoreType, string>(state => state.cardsReducer.id)
    const [first, setFirst] = useState(true)
    const [isShowAnswer, setIsShowAnswer] = useState(false)
    const [gradeValue, setGradeValue] = useState<number>(0)
    const showAnswer = () => setIsShowAnswer(true)
    const cards = useSelector<AppRootStoreType, CardsType[]>(state => state.cardsReducer.cards)
    const [learningCard, setLearningCard] = useState<CardsType>({
        cardsPack_id: "",
        grade: 0,
        question: "",
        shots: 1,
        user_id: "",
        updated: "",
        __v: 1,
        _id: "",
        type: "",
        answer: "",
        created: "",
        rating: 1,
    })

    useEffect(() => {
        if (first) {
            dispatch(getCardsTC(token || ""))
            setFirst(false)
        }
        if (cards.length > 0) {
            setLearningCard(getCard(cards))
        }
    }, [token, cards, first, dispatch, packId])

    const onNext = () => {
        dispatch(updateCardGradeTC(learningCard._id, gradeValue))
        setLearningCard(getCard(cards))
        setIsShowAnswer(false)
    }

    const setGradeToCard = (grade: number, event?: any) => {
        setGradeValue(grade)
    }

    return (
        <div>
            <div>
                <span>Question: </span>
                <span>{ learningCard.question }</span>
            </div>

            { !isShowAnswer ?
                <Button onClick={ showAnswer }>Show answer</Button>
                :
                <>
                    <div>
                        Answer: { learningCard.answer }
                    </div>
                    <div>
                        <span>Rate yourself:</span>
                    </div>
                    { grades.map((grade, i) => (
                        <Button style={{marginRight: "30px"}} data-tag={ i + 1 }
                                key={ "grade-" + i }
                                onClick={ (event: any) => {
                                    setGradeToCard(i + 1, event)
                                }
                                }>{ grade }</Button> ))
                    }
                    <Button onClick={ onNext }>Next</Button>
                </>
            }
        </div>
    )
}