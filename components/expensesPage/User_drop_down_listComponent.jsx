import User_drop_down_item from "./User_drop_down_itemComponent.jsx";

export default class User_drop_down_list extends React.Component {
  selectDebtor = dropDownId => {
    this.props.selectDebtor(dropDownId);
  };

  selectCreditor = dropDownId => {
    this.props.selectCreditor(dropDownId);
  };

  render() {
    let onClickFunc;
    let select;
    if (this.props.selectMethod == "Creditor") {
      onClickFunc = this.selectCreditor;
      select = "selectDebtor";
    } else if (this.props.selectMethod == "Debtor") {
      onClickFunc = this.selectDebtor;
      select = "selectCreditor";
    }

    let usersInGroup = this.props.users;
    let dropDownList = [];
    // for (let key of Object.keys(userNamesInGroup)) {
    //     // mapping={index}
    //     let dropDownItem = <User_drop_down_item selectDebtor={select == "selectDebtor" ? onClickFunc : null} selectCreditor={select == "selectCreditor" ? onClickFunc : null} userFirstName={userNamesInGroup[key].firstName} key={key} itemId={key} inputFieldId={this.props.inputFieldId} hiddenId={this.props.hiddenId} />
    //     dropDownList.push(dropDownItem);
    // }

    for (let key of usersInGroup.keys()) {
      dropDownList.push(
        <User_drop_down_item
          selectDebtor={select == "selectDebtor" ? onClickFunc : null}
          selectCreditor={select == "selectCreditor" ? onClickFunc : null}
          userFirstName={usersInGroup.get(key).firstName}
          key={key}
          itemId={key}
        />
      );
    }
    // inputFieldId={this.props.inputFieldId} hiddenId={this.props.hiddenId}

    return <React.Fragment> {dropDownList} </React.Fragment>;
  }
}
