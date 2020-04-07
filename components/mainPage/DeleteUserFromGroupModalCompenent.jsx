import { groupUserAutocomplete, substringMatcher } from "../../js/autocomplete"
import { userAjax } from "../../ajax/userAjax";
import { groupDetailsAjax } from "../../ajax/groupDetailsAjax";
import '../../public/css/autocomplete.css'

export default class DeleteUserFromGroupModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.state.groupDetails = this.props.groupDetails;
        this.state.usersInGroup = this.props.usersInGroup;
        this.state.currentUser = this.props.currentUser;
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
    }

    componentDidUpdate() {
        console.log('i was called at least');
        groupUserAutocomplete(userAjax, groupDetailsAjax, substringMatcher);
    }

    componentDidMount() {
        // console.log('i was called at least');
        // groupUserAutocomplete(userAjax, groupDetailsAjax, substringMatcher);
    }

    DeleteUserFromGroupFormSubmitHandler = (e) => {
        e.preventDefault();
        let formData = $('#delete-user-from-group-form').serializeArray();
        let submitData = {};
        formData.forEach(input => {
            // submitData.set(input.name, input.value);
            submitData[input.name] = input.value;
        });
        groupDetailsAjax.deleteUserFromGroup(submitData, this.state.groupDetails, this.state.usersInGroup, this.state.currentUser);
    }

    render() {
        let modal = <React.Fragment> <div className="modal fade" id="deleteUserForm" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
            aria-hidden="true">
            <div className="modal-dialog form-dark" role="document">
                <div className="modal-content card card-image" style={{ backgroundColor: "burlywood" }}>
                    <div className="text-white rgba-stylish-strong py-5 px-5 z-depth-4">
                        <div className="modal-header text-center pb-4">
                            <h3 className="modal-title w-100 white-text font-weight-bold" id="myModalLabel">
                                <strong>Delete User</strong></h3>
                            <button id='close-modal' type="button" className="close white-text" data-dismiss="modal"
                                aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form id='delete-user-from-group-form' onSubmit={this.DeleteUserFromGroupFormSubmitHandler} autoComplete="off" method="post">
                                <div className="md-form mb-4">
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fa fa-user"></i></span>
                                        </div>
                                        <input autoComplete="off" id="delete-user-from-group-field" type="text"
                                            className="form-control" name="fullName" placeholder="Firstname Lastname" />
                                    </div>
                                </div>
                                <div className="row d-flex align-items-center mb-4">

                                    <div className="text-center mb-3 col-md-12">
                                        <button type="submit"
                                            className="btn btn-primary btn-block btn-rounded z-depth-1">Confirm</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div id="user-deleted-success" className="modal-footer" style={{ display: "none" }}>
                            <div id="alert-success" className="alert alert-success col-12 mt-0" role="alert"
                                style={{ paddingBottom: "0" }}>
                                <p className='text-center '>
                                    <strong>Success! User deleted from your group successfully</strong>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </React.Fragment>
        return modal
    }
}