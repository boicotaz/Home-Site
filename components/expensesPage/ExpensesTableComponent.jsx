//React componenent that dynamically creates the expense table
// import '../../public/css/expensesTableComponent.css';
export default class ExpensesTable extends React.Component {
  state = {
    expenses: [],
    totals: {}
  };

  constructor(props) {
    super(props);
    this.state.expenses = this.props.expenses;
    this.state.totals = this.props.totals;
    this.state.view = this.props.view;
    this.state.userNamesInGroup = this.props.userNamesInGroup;
    this.state.usersInGroupDetails = this.props.usersInGroupDetails;
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
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

        entry.debt <= 0 ? (text = " <b>gets</b> ") : (text = " <b>owes</b> ");
        sum +=
          entry.debtorFullName + text + Math.abs(entry.debt) + "$" + "<br>";
        return sum;
      }, "");

      return (
        <tr>
          <td>{expense[0].creditorFullName}</td>
          <td>{expense[0].when}</td>
          <td>{expense[0].description}</td>
          <td>{expense[0].credit} $</td>
          <td>
            <a
              href="#"
              data-toggle="tooltip"
              data-placement="right"
              sanitize="false"
              data-html="true"
              title={tranactionsData}
            >
              <img
                src="/public/info.png"
                alt="Info IMG"
                height="42"
                width="42"
              />
            </a>
          </td>
        </tr>
      );
    });

    return (
      <React.Fragment>
        {" "}
        <thead>
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
        <tbody />{" "}
      </React.Fragment>
    );
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
      let debtsInfo = "";
      let color = "";
      let debtsSumInfo = "";
      debtsInfo = "<u><b>" + totals[key].fullname + "</b></u><br>";

      Object.keys(totals[key].debts).forEach(innerKey => {
        let text;
        totals[key].debts[innerKey] <= 0
          ? (text = " <b>gets</b> ")
          : (text = " <b>owes</b> ");
        debtsInfo +=
          "<br>" +
          totals[innerKey].fullname +
          text +
          Math.abs(totals[key].debts[innerKey]) +
          "$ ";
      });

      if (totals[key].debtSum <= 0) {
        color = "green";
        debtsSumInfo = "Gets " + Math.abs(totals[key].debtSum) + "$";
      } else {
        color = "red";
        debtsSumInfo = "Owes " + Math.abs(totals[key].debtSum) + "$";
      }
      let row = (
        <React.Fragment>
          {" "}
          <tr>
            <td>{totals[key].fullname}</td>
            <td style={{ color: color }}>{debtsSumInfo}</td>
            <td>
              <a
                href="#"
                data-toggle="tooltip"
                data-placement="right"
                sanitize="false"
                data-html="true"
                title={debtsInfo}
              >
                <img
                  src="/public/info.png"
                  alt="Info IMG"
                  height="42"
                  width="42"
                />
              </a>
            </td>
          </tr>
        </React.Fragment>
      );
      data.push(row);
    });
    return (
      <React.Fragment>
        {" "}
        <thead>
          <tr>
            <th scope="col">Member</th>
            <th scope="col">Sum</th>
            <th scope="col">Info</th>
          </tr>
        </thead>
        <tbody>{[...data]}</tbody>{" "}
      </React.Fragment>
    );
  }

  render() {
    if (this.props.view == "eachExpense") {
      return this.renderEachExpense(this.state.expenses);
    } else if (this.props.view == "allExpenses") {
      // renderInfoTotalsModal(this.state.totals);
      return this.renderTotals(this.state.totals);
    }
  }
}
