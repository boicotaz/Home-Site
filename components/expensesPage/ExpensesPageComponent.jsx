import { expensesAjax } from "../../ajax/expensesAjax"
import ExpensesForm from "./ExpensesFormComponent.jsx"

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
        let expensesForm = <ExpensesForm usersInGroup={this.state.usersInGroupDetails} />;
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


//React componenent that dynamically creates the expense table
class ExpensesTable extends React.Component {
    state = {
        expenses: [],
        totals: {},
    }

    constructor(props) {
        super(props);
        this.state.expenses = this.props.expenses;
        this.state.totals = this.props.totals;
        this.state.view = this.props.view;
        this.state.userNamesInGroup = this.props.userNamesInGroup;
        this.state.usersInGroupDetails = this.props.usersInGroupDetails;
        document.addEventListener('new-expense', e => {
            expensesAjax.getExpenseTotalsDataAjax().then(totalDebtsForEachUser => {
                let newExpense = expensesAjax.processData(e.detail, this.state.usersInGroupDetails);
                this.setState({ expenses: [...this.state.expenses, newExpense], totals: totalDebtsForEachUser });
            })

        })

    }

    componentDidMount() {
        $('[data-toggle="tooltip"]').tooltip();
    }

    componentDidUpdate() {
        $('[data-toggle="tooltip"]').tooltip();
    }

    /**
     * @todo create typedef for expenses object
     * @param {*} expenses 
     */
    renderEachExpense(expenses) {
        let data = expenses.map(expense => {

            let tranactionsData = expense.reduce((sum, entry) => {
                let text = "";

                entry.debt <= 0 ? text = " <b>gets</b> " : text = " <b>owes</b> ";
                sum += entry.debtorFullName + text + Math.abs(entry.debt) + "$" + "<br>";
                return sum;
            }, "");

            return <tr>
                <td>{expense[0].creditorFullName}</td>
                <td>{expense[0].when}</td>
                <td>{expense[0].description}</td>
                <td>{expense[0].credit} $</td>
                <td><a href="#" data-toggle="tooltip" data-placement="right" sanitize="false" data-html="true" title={tranactionsData}><img src="/public/info.png" alt="Info IMG" height="42" width="42" ></img></a></td>
            </tr>
        })

        return <React.Fragment> <thead>
            <tr>
                {/* <th scope="col">#</th> */}
                <th scope="col">Creditor</th>
                <th scope="col">When</th>
                <th scope="col">Description</th>
                <th scope="col">Credit</th>
                <th scope="col">Info</th>
            </tr>
            {[...data]}
        </thead>
            <tbody>
            </tbody> </React.Fragment>
    }

    /**
     * @typedef TotalDebts
     * @type {object}
     * @property {object} userId 
     * @property {string} userId.fullname
     * @property {number} userId.debtSum
     * @property {Object} userId.debts
     * @property {number} userId.debts.userId
     */

    //E.g.  '1': { fullname: apostolis gerodimos, debtSum: 0, debts : {'8' : 15 } } 

    /**
     * Creates for each user the debts that he owes or how much he gets back
     * @param {TotalDebts} totals 
     * @returns {ReactFragment}
     */
    renderTotals(totals) {
        let data = [];
        Object.keys(totals).forEach(key => {
            let debtsInfo = '';
            let color = "";
            let debtsSumInfo = "";
            debtsInfo = '<u><b>' + totals[key].fullname + "</b></u><br>";

            Object.keys(totals[key].debts).forEach(innerKey => {
                let text;
                totals[key].debts[innerKey] <= 0 ? text = " <b>gets</b> " : text = " <b>owes</b> ";
                debtsInfo += "<br>" + totals[innerKey].fullname + text + Math.abs(totals[key].debts[innerKey]) + "$ ";
            })

            if (totals[key].debtSum <= 0) {
                color = "green";
                debtsSumInfo = "Gets " + Math.abs(totals[key].debtSum) + "$";
            }
            else {
                color = "red";
                debtsSumInfo = "Owes " + Math.abs(totals[key].debtSum) + "$";
            }
            let row = <React.Fragment> <tr>
                <td >{totals[key].fullname}</td>
                <td style={{ color: color }} >{debtsSumInfo}</td>
                <td><a href="#" data-toggle="tooltip" data-placement="right" sanitize="false" data-html="true" title={debtsInfo}><img src="/public/info.png" alt="Info IMG" height="42" width="42" ></img></a></td>
            </tr>
            </React.Fragment>
            data.push(row);
        })
        return <React.Fragment> <thead>
            <tr>
                <th scope="col">Member</th>
                <th scope="col">Sum</th>
                <th scope="col">Info</th>
            </tr>
        </thead>
            <tbody>
                {[...data]}
            </tbody>  </React.Fragment>
    }

    render() {
        if (this.props.view == "eachExpense") {
            return this.renderEachExpense(this.state.expenses);
        }
        else if (this.props.view == "allExpenses") {
            // renderInfoTotalsModal(this.state.totals);
            return this.renderTotals(this.state.totals);
        }

    }
}






