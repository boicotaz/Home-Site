import {groupUserAutocomplete,substringMatcher} from "../../js/autocomplete"
import { userAjax } from "../../ajax/userAjax";
import { grouDetailsAjax } from "../../ajax/groupDetailsAjax";

export default class AddUserInGroupModal extends React.Component{

    constructor(props) {
        super(props);
        this.state = {};
        this.state.groupDetails = this.props.groupDetails;
        this.state.usersInGroup = this.props.usersInGroup;
    }
    componentDidMount() {
        groupUserAutocomplete(userAjax, grouDetailsAjax, substringMatcher);
    }

    AddUserInGroupFormSubmitHandler = (e) => {
        e.preventDefault();
        let formData = $('#add-user-in-group-form').serializeArray();
        let submitData = {};
        formData.forEach( input => {
            // submitData.set(input.name, input.value);
            submitData[input.name] = input.value;
        });
        grouDetailsAjax.addUserInGroup(submitData,this.state.groupDetails,this.state.usersInGroup);

    }
    render() {
        let modal = <React.Fragment> <div className="modal fade" id="addUserForm" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
        aria-hidden="true">
        <div className="modal-dialog form-dark" role="document">
            <div className="modal-content card card-image" style={{backgroundColor: "burlywood"}}>
                <div className="text-white rgba-stylish-strong py-5 px-5 z-depth-4">
                    <div className="modal-header text-center pb-4">
                        <h3 className="modal-title w-100 white-text font-weight-bold" id="myModalLabel">
                            <strong>Add User</strong></h3>
                        <button id='close-modal' type="button" className="close white-text" data-dismiss="modal"
                            aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form id='add-user-in-group-form' onSubmit={this.AddUserInGroupFormSubmitHandler} autoComplete="off" method="post">
                            <div className="md-form mb-4">
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fa fa-user"></i></span>
                                    </div>
                                    <input  autoComplete="off" id="add-user-in-group-field" type="text" 
                                        className="form-control" name="fullName" placeholder="Firstname Lastname"/>
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
                    <div id="user-added-success" className="modal-footer" style={{display: "none"}}>
                        <div id="alert-success" className="alert alert-success col-12 mt-0" role="alert"
                            style={{paddingBottom: "0"}}>
                            <p className='text-center '>
                                <strong>Success!</strong> User: <strong id='strong-added-success'>  added to
                                group successfully.</strong>
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