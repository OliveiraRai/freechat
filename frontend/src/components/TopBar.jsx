export function TopBar({ connected, userName, onDelete}){
    return (
        <div className="flex justify-between py-2 px-4 bg-topbar shadow-xl">
            <div className="flex">
                <div className="flex items-center mr-2">
                    <div className={`status-dot ${connected ? 'connected' : ''}`}></div>
                </div>
                {connected ? (
                    <span 
                        className="text-slate-200/80"
                        >
                        {userName}
                    </span>   
                ):(
                    <span 
                        className="loading text-slate-200/80"
                        >
                        Waiting for someone.
                    </span>  
                )}
            </div>
            <button 
                className="text-red-400/60 cursor-pointer hover:text-slate-200"
                onClick={onDelete}
                >
                delete
            </button>
        </div>
    )
}