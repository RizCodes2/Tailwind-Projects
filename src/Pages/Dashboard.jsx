import Navbar from "../components/Navbar"
import SummaryCard from "../components/SummaryCard"

function Dashboard() {

    return (
        <div>
            <Navbar />
            <div className="flex items-center gap-5 mt-5 ">
                <SummaryCard title="Balance" amount="$5000" />
                <SummaryCard title="Income" amount="$10" />
                <SummaryCard title="Expense" amount="$50" />
            </div>
        </div>
    )
}

export default Dashboard