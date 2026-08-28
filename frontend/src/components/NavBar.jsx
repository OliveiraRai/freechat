export function NavBar() {
    return (
        <nav className="flex justify-between mt-5">
            <img 
                src="/freechat-logo.png" 
                alt="App Logo" 
                className="w-24"
                />
            <a 
                href="https://github.com/OliveiraRai/freechat"
                className="text-slate-200 font-manrope font-medium text-base"
                >
                GitHub↗
            </a>
        </nav>
    )
}