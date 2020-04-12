import App from "../components/AppComponent.jsx";
import { grouDetailsAjax } from "../ajax/groupDetailsAjax";
import { groupMessagesAjax } from "../ajax/groupMessagesAjax";
import { expensesAjax } from "../ajax/expensesAjax.js";
import {notificationsAjax} from "../ajax/notificationsAjax";
// import Notifications from "../components/navbar/NotificationsComponent.jsx";

console.log('DID WE GET THE LOGGED IN USER?', loggedInUser);
function renderApp () {

  Promise.all([grouDetailsAjax.getUsersInGroupDetails(), grouDetailsAjax.getGroupDetails(), groupMessagesAjax.getGroupMessages(), expensesAjax.getExpenseDataAjax(), expensesAjax.getExpenseTotalsDataAjax()]).then((res) => {
    let [usersInGroup, groupDetails, groupMessages, expenseData, expensesTotals] = res;
    let processedData = expensesAjax.processData(expenseData, usersInGroup);
    // console.log(processedData), "PROCESSEDD DATA___________________________";
    console.log('how many times am i called tho - app.js ?');
    notificationsAjax.getGroupNotifications(groupDetails).then(notifications => {
     console.log('I SHOULD BE CALLED FIRST____________');
      ReactDOM.render(
        <App notifications={notifications} usersInGroup={usersInGroup} groupDetails={groupDetails} currentUser={loggedInUser} groupMessages={groupMessages} view="eachExpense" expenses={processedData} totals={expensesTotals} > </App>, document.getElementById('app')
      );
    });

  }).catch((error) => console.log(error));

};

renderApp();


export {renderApp}