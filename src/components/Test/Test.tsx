import Input from "../Input/Input";
import Button from "../Button/Button";
import Checkbox from "../Checkbox/Checkbox";
import style from "./Test.module.css";
import { useState } from "react";

export const Test = () => {
    const [text, setText] = useState<string>("")
    const error = text ? '' : "error"

    return (
        <div className={ style.testContainer }>
            <div className={ style.inputContainer }>
                <span>Input Example</span>
                <Input onChangeText={ setText }
                       value={ text }
                       error={ error }/>
            </div>
            <div className={ style.buttonContainer }>
                <span>Button Example</span>
                <Button>Test</Button>
            </div>
            <div className={ style.checkboxContainer }>
                <span>Checkbox Example</span>
                <Checkbox/>
            </div>

        </div>
    )
}