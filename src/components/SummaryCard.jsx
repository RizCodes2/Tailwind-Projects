function SummaryCard({title, amount}){
    return(
        <div className="bg-amber-400/60 p-4 w-50">
            <p>{title}</p>
            <span>{amount}</span>
        </div>
    )
}

export default SummaryCard