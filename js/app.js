import App from "../components/AppComponent.jsx";
import { groupDetailsAjax } from "../ajax/groupDetailsAjax";
import { groupMessagesAjax } from "../ajax/groupMessagesAjax";
import { expensesAjax } from "../ajax/expensesAjax.js"
import ReactDOM from 'react-dom'

console.log('DID WE GET THE LOGGED IN USER?', loggedInUser);
function renderApp () {

  Promise.all([groupDetailsAjax.getUsersInGroupDetails(), groupDetailsAjax.getGroupDetails(), groupMessagesAjax.getGroupMessages(), expensesAjax.getExpenseDataAjax(), expensesAjax.getExpenseTotalsDataAjax()]).then((res) => {
    let [usersInGroup, groupDetails, groupMessages, expenseData, expensesTotals] = res;
    let processedData = expensesAjax.processData(expenseData, usersInGroup);
    ReactDOM.render(
      <App usersInGroup={usersInGroup} groupDetails={groupDetails} currentUser={loggedInUser} groupMessages={groupMessages} view="eachExpense" expenses={processedData} totals={expensesTotals} > </App>, document.getElementById('app')
    );
  }).catch((error) => console.log(error));

};

renderApp();


export {renderApp}