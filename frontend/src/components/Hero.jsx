export function Hero(){
    return (
        <div className="flex justify-center mt-10">
            <div className="w-99 flex flex-col items-center">
                <img src="/freechat.png" alt="A turtle image" />
                <h1 
                    className="font-manrope font-semibold text-text-primary"
                    >
                    A safe space to talk.
                </h1>
                <h2 
                    className="font-manrope font-semibold my-5 text-center text-text-muted"
                    >
                    Temporary rooms. Temporary data.<br></br>When everyone leaves, nothing remains.
                </h2>
            </div>
        </div>
    )
}