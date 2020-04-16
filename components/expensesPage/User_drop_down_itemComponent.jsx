export default class User_drop_down_item extends React.Component {
  render() {
    let onClickFunc;
    if (this.props.selectDebtor) {
      onClickFunc = this.selectDebtor;
    } else if (this.props.selectCreditor) {
      onClickFunc = this.selectCreditor;
    }
    // map={this.props.mapping}
    return (
      <a className="dropdown-item" onClick={onClickFunc} href="#">
        {this.props.userFirstName}
      </a>
    );
  }

  selectDebtor = () => {
    this.props.selectDebtor(this.props.itemId);
  };

  selectCreditor = () => {
    this.props.selectCreditor(this.props.itemId);
  };
}
