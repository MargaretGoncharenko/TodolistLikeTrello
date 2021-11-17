import React, {ChangeEvent, useState} from "react";

type EditableSpanProps = {
    text: string
    onchange: (newValue: string) => void

}
export const EditableSpan = (props: EditableSpanProps) => {
    const [editMode, setEditMode] = useState(false)
    const [text, setText] = useState("")
    const activateEditMode = () => {
        setEditMode(true)
        setText(props.text)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onchange(text);
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setText(e.currentTarget.value)
    return (
        editMode
            ? <input value={text}
                     onBlur={activateViewMode}
                     onChange={onChangeHandler}
                     autoFocus/>
            : <span onDoubleClick={activateEditMode}>{props.text}</span>
    )
}