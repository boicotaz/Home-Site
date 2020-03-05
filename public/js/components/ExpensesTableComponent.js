// import 
class ExpensesPage extends React.Component {
    state = {
        expenses: [],
        totals: {},
        view: ""
    }
    constructor(props) {
        super(props);
        this.state.view = props.view;
        this.state.expenses = props.expenses;
        this.state.totals = props.totals;
    }

    toggleView = () => {
        console.log(this.state.view, this.state.totals);
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

        let expensePage = <div id='expenses-content' className="container" style={{ marginTop: '250px' }} >
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
            <div id="expense-table-id" className="row">
                <div className='col-12 pr-0'>
                    <table id='expenses-table' className="table table-hover table-dark ">
                        <ExpensesTable expenses={this.state.expenses} totals={this.state.totals} view={this.state.view}></ExpensesTable>
                    </table>
                </div>
            </div>
            <div id="modals-container"></div>
        </div>

        return (<React.Fragment>  {expensePage} </React.Fragment>)
    }


}
function renderInfoTotalsModal(totals) {

    let modals = [];

    Object.keys(totals).forEach(key => {
        modals.push(<div className="modal fade" id={"info-totals-modal-id-" + key} tabIndex="-1" role="dialog"
            aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content card card-image" style={{ backgroundColor: 'dark' }} >
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">{totals[key].fullname}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {/* {Object.keys([key].debts).forEach(innerKey => {

                        })} */}
                    </div>
                </div>
            </div>
        </div>)

    });
    ReactDOM.render(
        <React.Fragment> <div id="modals-content"> {modals} </div></React.Fragment>, document.getElementById('modals-container')
    );
    // return modals;


}


//React componenent that dynamically creates the expense table
class ExpensesTable extends React.Component {
    state = {
        expenses: [],
        totals: {},
    }

    constructor(props) {
        super(props);
        this.state.expenses = props.expenses;
        this.state.totals = props.totals;
        this.state.view = props.view;
        // console.log("is the constructor called each time tho?");
        document.addEventListener('new-expense', e => {
            this.setState({ expenses: [...this.state.expenses, e.detail] })
        })

    }

    renderEachExpense(expenses) {
        let data = expenses.map(expense => {

            let tranactionsData = expense.map(transaction => {
                return transaction.debtorName + ' - ' + transaction.debt + '$'
            })
            // console.log(tranactionsData);
            return <tr>
                <td >{expense[0].creditorName}</td>
                <td>{tranactionsData.reduce((accumulator, currentValue) => accumulator + ' , ' + currentValue)}</td>
                <td>{expense[0].when}</td>
                <td>{expense[0].description}</td>
                <td>{expense[0].credit} $</td>
            </tr>
        })

        return <React.Fragment> <thead>
            <tr>
                {/* <th scope="col">#</th> */}
                <th scope="col">Creditor</th>
                <th scope="col">Debtors</th>
                <th scope="col">When</th>
                <th scope="col">Description</th>
                <th scope="col">Credit</th>
            </tr>
            {[...data]}
        </thead>
            <tbody>
            </tbody> </React.Fragment>
    }

    renderTotals(totals) {
        let data = [];
        console.log("totals in render Totals is: ", totals);
        Object.keys(totals).forEach(key => {
            let debtsInfo = "";
            Object.keys(totals[key].debts).forEach(innerKey => {
                debtsInfo += totals[innerKey].fullname + "-" + totals[key].debts[innerKey] + "$ "
            })
            let color = "";
            let debtsSumInfo = "";
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
                <td><a href="#" data-toggle="modal" data-target={"#info-totals-modal-id-" + key}><img src="/public/info.png" alt="Info IMG" height="42" width="42" ></img></a></td>
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
        console.log("Each time the button is clicked i am summoned", this.state.view)
        if (this.props.view == "eachExpense") {
            return this.renderEachExpense(this.state.expenses);
        }
        else if (this.props.view == "allExpenses") {
            renderInfoTotalsModal(this.state.totals);
            return this.renderTotals(this.state.totals);
        }

    }
}






