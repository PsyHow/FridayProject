import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react"
import style from "./Button.module.css"

// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type SuperButtonPropsType = DefaultButtonPropsType

const SuperButton: React.FC<SuperButtonPropsType> = ({ className, ...restProps }) => {

    return (
        <button
            className={ style.button }
            { ...restProps } // отдаём кнопке остальные пропсы если они есть (children там внутри)
        />
    )
}

export default SuperButton
