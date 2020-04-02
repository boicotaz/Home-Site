import { expensesAjax } from "../../ajax/expensesAjax"
import ExpensesForm from "./ExpensesFormComponent.jsx"
import ExpensesTable from "./ExpensesTableComponent.jsx"

export default class ExpensesPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expenses: [],
            totals: {},
            view: ""
        }
        this.state.view = this.props.view;
        this.state.expenses = this.props.expenses;
        this.state.totals = this.props.totals;
        this.state.usersInGroupDetails = this.props.usersInGroupDetails;
        this.state.currentUser = this.props.currentUser;
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
    }

    componentDidMount() {
        $("#content-container").fadeIn('slow');
        let expensesTable = document.getElementById("expenses-content");
        expensesTable.scrollTop = expensesTable.scrollHeight;
    }

    componentWillMount() {
        $("#content-container").css("display", "none");
    }

    toggleView = () => {
        let view;
        if (this.state.view == "eachExpense") {
            view = "allExpenses";
        }
        else if (this.state.view == "allExpenses") {
            view = "eachExpense";
        }
        this.setState({ view: view });

        // ReactDOM.render(<ExpensesTable view={view} origin="toggle" />, document.getElementById('expenses-table'))
    }

    render() {
        let buttonText;

        if (this.state.view == "eachExpense") {
            buttonText = "View Totals";
        }
        else if (this.state.view == "allExpenses") {
            buttonText = "View All Expenses";
        }
        let expensesForm = <ExpensesForm usersInGroup={this.state.usersInGroupDetails} currentUser={this.state.currentUser} />;
        let expensePage =
            <div id='expenses-content' className="container" style={{ marginTop: '250px' }} >
                <div className="row" id="buttons-row">
                    <div className='col-12'>
                        <div className="btn-group btn-group-md" role="group" aria-label="Basic example">
                            <button type="button" className="btn btn-secondary" data-toggle="modal"
                                data-target="#darkModalForm">Create Expense</button>
                            <button type="button" onClick={this.toggleView} className="btn btn-secondary">{buttonText}</button>
                        </div>
                    </div>
                </div>
                {/* style={{ color: 'black' }} */}
                <div id="expense-table-id" className="row scrollbar scrollbar-primary" style={{ height: '600px', overflowY: 'scroll' }}>
                    <div className='col-12 pr-0'>
                        <table id='expenses-table' className="table table-hover table-dark" >
                            <ExpensesTable expenses={this.state.expenses} totals={this.state.totals} userNamesInGroup={this.state.userNamesInGroup} usersInGroupDetails={this.state.usersInGroupDetails} view={this.state.view}></ExpensesTable>
                        </table>
                    </div>
                </div>
                <div id="modals-container"></div>
            </div>;

        return (<React.Fragment>  {expensePage} {expensesForm} </React.Fragment>)
    }


}
