

import { expensesAjax } from "../../ajax/expensesAjax.js";
// import { clientSocket } from "../../js/socketClient";
import User_drop_down_list from "./User_drop_down_listComponent.jsx"
import Debtor from "./DebtorComponent.jsx"
import { v4 as uuidv4 } from 'uuid';


export default class ExpensesForm extends React.Component {

    state = {
    }

    submitForm = (e) => {
        e.preventDefault();

        let formData = $('#expense-form').serializeArray();
        let creditor = {};
        let debtors = [];
        let info = {};
        let creditorName;
        let debtorNames = [];
        formData.forEach((elem, index, array) => {
            if (elem.name == "creditorId") creditor.id = elem.value;
            if (elem.name == "credit") creditor.credit = elem.value;
            if (elem.name == "debt") {
                debtors.push({ id: array[index + 1].value, debt: elem.value })
                debtorNames.push(array[index - 1].value)
            }
            if (elem.name == "creditor") creditorName = elem.value;

            if (elem.name == "date") info.date = elem.value;
            if (elem.name == "desc") info.desc = elem.value;
        })

        let postFormData = { creditor, debtors, info }
        let newExpense = [];
        debtors.forEach((elem, index) => {
            newExpense.push({ creditor: creditor.id, debtor: elem.id, when: info.date, description: info.desc, credit: creditor.credit, debt: elem.debt, creditorName, debtorName: debtorNames[index] })
        });

        expensesAjax.storeNewExpense(postFormData, newExpense, socket);

    }


    selectCreditor = (dropDownId) => {

        let creditorName, creditorId;
        let usersInGroup = this.state.usersInGroup;

        creditorName = usersInGroup.get(dropDownId).firstName;
        creditorId = dropDownId;


        this.setState({ creditor: { creditorName: creditorName, creditorId: creditorId } })
    }

    /**
     * @param {number}  dropDownId - it corresponds to userId
     * @param {number} debtorComponentId - it corresponds to debtor component id, which is a uuidv4
     */
    selectDebtor = (dropDownId, debtorComponentId) => {

        let debtors = this.state.debtors;
        let debtorDetails = debtors.get(debtorComponentId);
        debtorDetails.debtorSelected = dropDownId;
        debtors.set(debtorComponentId, debtorDetails);
        this.setState({ debtors });
    }

    updateCreditField = () => {
        if (this.state.evenly) this.updateDebtorFields();
    }

    updateDebtorFields = () => {
        if (!this.state.evenly) {
            this.setState({ debtors: this.state.debtors, evenly: this.state.evenly, credit: this.state.credit });
            return;
        }
        let credit = document.getElementById('credit').value;
        this.setState({ debtors: this.state.debtors, evenly: this.state.evenly, credit: parseFloat(credit) });

    }
    addDropdown = (e) => {
        let debtors = this.state.debtors;
        debtors.set(uuidv4(), {});
        this.setState({ debtors: debtors });
    }

    changeSplitMethod = (e) => {
        if (e.target.innerText == "Evenly") {
            this.state.evenly = true
        }
        else this.state.evenly = false;

        this.updateDebtorFields();
    }

    /**
     * @param {number} debtorComponentId - it corresponds to debtor component id, which is a uuidv4
     */
    removeDeptor = (debtorComponentId) => {
        let debtors = this.state.debtors;
        debtors.delete(debtorComponentId);
        this.setState(debtors);
    }

    constructor(props) {
        super(props);
        this.state.debtors = new Map();
        this.state.debtors.set(uuidv4(), {});
        this.state.usersInGroup = this.props.usersInGroup;
        this.state.evenly = true;
        this.state.credit = 0;

        document.addEventListener('clear-expense-form', e => {
            // let state = {};
            $("#expense-form")[0].reset();
            let debtors = new Map();
            debtors.set(uuidv4(), {});
            let usersInGroup = this.state.usersInGroup;
            let evenly = true;
            let credit = 0;
            this.setState({ debtors: debtors, credit: credit, evenly: evenly, usersInGroup: usersInGroup, creditor: undefined });
        });


    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
    }

    render() {
        let debtorFields = [];

        for (let key of this.state.debtors.keys()) {
            debtorFields.push(<Debtor selectDebtor={this.selectDebtor} evenly={this.state.evenly} usersInGroup={this.state.usersInGroup} debtorSelected={this.state.debtors.get(key).debtorSelected} id={key} key={key} debt={(this.state.credit / this.state.debtors.size)} removeDeptor={this.removeDeptor}> </Debtor>)
        }
        return (
            // <!-- Modal -->
            <div className="modal fade" id="darkModalForm" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
                aria-hidden="true">
                <div className="modal-dialog form-dark" role="document">
                    {/* <!--Content--> */}
                    <div className="modal-content card card-image" style={{ backgroundColor: 'burlywood' }}>
                        <div className="text-white rgba-stylish-strong py-5 px-5 z-depth-4">
                            {/* <!--Header--> */}
                            <div className="modal-header text-center pb-4">
                                <h3 className="modal-title w-100 white-text font-weight-bold" id="myModalLabel">
                                    <strong>Create Expense</strong></h3>
                                <button type="button" className="close white-text" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            {/* <!--Body--> */}
                            <div className="modal-body">
                                {/* <!--Body--> */}
                                <form id="expense-form" method="POST" onSubmit={this.submitForm}  >
                                    <div className="md-form mb-4">
                                        <div className="input-group form-group">
                                            <div className="input-group-prepend">
                                                <button className="btn btn-dark dropdown-toggle btn-block" type="button"
                                                    data-toggle="dropdown" aria-haspopup="true"
                                                    aria-expanded="false">Creditor</button>
                                                <div className="dropdown-menu">
                                                    <User_drop_down_list users={this.props.usersInGroup} selectCreditor={this.selectCreditor} selectMethod={"Creditor"} />
                                                </div>
                                            </div>
                                            <input readOnly={true} name="creditor" id="creditor-field" type="text"
                                                className="form-control" aria-label="Text input with dropdown button"
                                                value={this.state.creditor !== undefined ? this.state.creditor.creditorName : ''} placeholder="Creditor" />
                                            <input type="hidden" id="creditor-id" name="creditorId" value={this.state.creditor === undefined ? "Creditor" : this.state.creditor.creditorId} />
                                        </div>
                                    </div>

                                    <div className="md-form mb-4">
                                        <div className="input-group form-group">
                                            <div className="input-group-prepend">
                                                <button className="btn btn-dark btn-block" type="button">Credit</button>
                                            </div>
                                            <input id="credit" autoComplete="off" name="credit" onChange={this.updateCreditField} value={this.state.credit == 0 ? '' : this.state.credit} type="number" step="0.01"
                                                className="form-control" placeholder="$$$" />
                                        </div>
                                    </div>

                                    <div className="md-form mb-4">

                                        <div className="input-group form-group">
                                            <div className="input-group-prepend">
                                                <button className="btn btn-dark dropdown-toggle btn-block" type="button"
                                                    data-toggle="dropdown" aria-haspopup="true"
                                                    aria-expanded="false">Method</button>
                                                <div id='method-payment-dropdown' className="dropdown-menu">
                                                    <a id="split-evenly" onClick={this.changeSplitMethod} className="dropdown-item">Evenly</a>
                                                    <a id="split-manual" onClick={this.changeSplitMethod} className="dropdown-item">Manual</a>
                                                </div>
                                            </div>
                                            <input readOnly={true} value={this.state.evenly == true ? "Evenly" : "Manual"} id="method-payment-field" type="text"
                                                className="form-control" aria-label="Text input with dropdown button" />
                                            <div id="link-div">
                                                <a id="add-debtor-link" href="#"> <i className="fa fa-user-plus ml-2 mt-2 " onClick={this.addDropdown}

                                                    style={{ color: 'black' }}></i> </a>
                                            </div>
                                        </div>

                                    </div>

                                    <div id="debtors-group">
                                        {debtorFields}

                                    </div>

                                    <div className="mb-4">
                                        <div className="input-group form-group">
                                            <div className="input-group-prepend">
                                                <button className="btn btn-dark btn-block" type="button">Date</button>
                                            </div>
                                            <input name="date" type="date" className="form-control" onFocus="(this.type='date')"
                                                placeholder="When" />
                                        </div>
                                    </div>

                                    <div className="mb-5">
                                        <div className="input-group form-group">
                                            <div className="input-group-prepend">
                                                <button className="btn btn-dark btn-block" type="button">Info</button>
                                            </div>
                                            <input name="desc" type="text" className="form-control" autoComplete="off"
                                                placeholder="Description" />
                                        </div>
                                    </div>

                                    {/* <!--Grid row--> */}
                                    <div className="row d-flex align-items-center mb-4">

                                        {/* <!--Grid column--> */}
                                        <div className="text-center mb-3 col-md-12">
                                            <button type="submit"
                                                className="btn btn-success btn-block btn-rounded z-depth-1">Confirm</button>
                                        </div>
                                        {/* <!--Grid column--> */}

                                    </div>
                                    {/* <!--Grid row--> */}
                                </form>
                            </div>
                        </div>
                        <div id="alert-warning" style={{ display: 'none' }} className="modal-footer">
                            <div className="alert alert-warning col-12" role="alert" style={{ paddingBottom: 0 }}>
                                <p className='text-center '>
                                    <strong>Warning!</strong> you dont need any more debtors, trust me! ;)
                            </p>
                            </div>
                        </div>

                        <div id="created-expense-success" style={{ display: 'none' }} className="modal-footer">
                            <div className="alert alert-success col-12" role="alert" style={{ paddingBottom: 0 }}>
                                <p className='text-center '>
                                    <strong>Success</strong> Expense created! Hooray!
                            </p>
                            </div>
                        </div>

                    </div>
                    {/* <!--/.Content--> */}
                </div>
            </div>)
        // {/* <!-- Modal -->) */}
    }

}



