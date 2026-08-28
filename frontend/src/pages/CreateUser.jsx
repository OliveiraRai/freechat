import { Button } from "../components/Button"
import { TextInput } from "../components/Input"

export function CreateUser(){
    return (
        <>
            <TextInput placeholder={"Choose a nickname"}/>
            <Button text={"Avançar"}/>
        </>
    )
}