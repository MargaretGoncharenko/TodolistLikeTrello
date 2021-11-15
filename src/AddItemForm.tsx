import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormProps = {
    addItem: (title: string) => void
}
export const AddItemForm = (props: AddItemFormProps) => {
    const [text, setText] = useState("")
    const [error, setError] = useState<string | null>(null)
    const addItem = () => {
        if (text.trim() !== "") {
            props.addItem(text);
            setText("");
        } else {
            setError("Title is required");
        }
    }
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addItem();
        }
    }
    return (
        <div>
            <input value={text}
                   onChange={onChangeInputHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={addItem}>+</button>
            {error && <div className="errorMessage">{error}</div>}
        </div>
    )
}