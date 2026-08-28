export function TextInput({ placeholder }){
    return (
        <input 
            type="text" 
            placeholder={placeholder}
            className="w-full p-2 bg-secondary rounded placeholder:text-text-muted/50 focus:outline-none text-slate-200"
            />
    )
}