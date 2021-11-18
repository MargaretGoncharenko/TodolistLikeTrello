import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import "./App.css";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";


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
            <TextField variant="outlined"
                       error={!!error}
                       value={text}
                       onChange={onChangeInputHandler}
                       onKeyPress={onKeyPressHandler}
                       label="Title"
                       helperText={error}
            />
            <IconButton color="primary"
                        onClick={addItem}>
                <AddBox/>
            </IconButton>
        </div>
    )
}