export function TextInput({ placeholder, value, func }){
    return (
        <input 
            type="text" 
            value={value}
            onChange={func}
            placeholder={placeholder}
            required
            className="w-full p-2 bg-secondary rounded placeholder:text-text-muted/50 focus:outline-none text-slate-200"
            />
    )
}