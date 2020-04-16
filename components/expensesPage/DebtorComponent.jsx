// React Component to create the debtors row in the create expense form
// depends on User_drop_down_list and User_drop_down_item
import User_drop_down_list from "./User_drop_down_listComponent.jsx";

export default class Debtor extends React.Component {
  removeDeptor = e => {
    this.props.removeDeptor(this.props.id);
  };

  onChange = e => {
    console.log("event fired", e);
    // this.props.debt = 4444;
  };

  selectDebtor = dropDownId => {
    this.props.selectDebtor(dropDownId, this.props.id);
  };

  render() {
    let isDebtorSelected;
    let debtorName;
    if (this.props.debtorSelected === undefined) {
      isDebtorSelected = false;
    } else {
      let usersInGroup = this.props.usersInGroup;

      debtorName = usersInGroup.get(this.props.debtorSelected).firstName;

      if (debtorName != undefined) {
        isDebtorSelected = true;
      }
    }

    return (
      <React.Fragment>
        <div className="md-form mb-4">
          <div className="input-group form-group">
            <div className="input-group-prepend">
              <div className="input-group-prepend">
                <button
                  className="btn btn-dark dropdown-toggle btn-block"
                  type="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Debtor
                </button>
                <div className="dropdown-menu">
                  <User_drop_down_list
                    users={this.props.usersInGroup}
                    selectDebtor={this.selectDebtor}
                    selectMethod={"Debtor"}
                  />
                </div>
              </div>
            </div>
            <input
              readOnly={true}
              name="debtor"
              type="text"
              className="form-control"
              placeholder="Bitch"
              value={
                this.props.isDebtorSelected === undefined ? debtorName : "Bitch"
              }
            />
            <input
              type="number"
              className="form-control"
              name="debt"
              onChange={this.onChange}
              readOnly={this.props.evenly}
              value={
                this.props.evenly == true
                  ? this.props.debt.toFixed(2)
                  : console.log("hey")
              }
              placeholder="Debt"
            />
            <input
              type="hidden"
              name="debtorId"
              value={
                this.props.debtorSelected === undefined
                  ? null
                  : this.props.debtorSelected
              }
            />
            <div>
              <a href="#">
                {" "}
                <i
                  className="fa fa-times ml-2 mt-2"
                  onClick={this.removeDeptor}
                  aria-hidden="true"
                  style={{ color: "black" }}
                />{" "}
              </a>
            </div>
          </div>
        </div>{" "}
      </React.Fragment>
    );
  }
}
