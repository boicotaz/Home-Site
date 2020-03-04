
var getTotalsPage = function () {
    console.log("in get Totals Page");
    $("#expense-table-id").remove();
    $("#expenses-content").append("<div id = 'expense-table-totals-id'></div>");
    getExpenseTotalsDataAjax().then(res => console.log("this should the totals table state", res));
}


// Ajax request to retrieve the TOTALS data needed to create the expense TOTALS table
var getExpenseTotalsDataAjax = function () {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/home/expenses/get-expense-totals-table',
            method: 'GET',
            dataType: "json",
            success: function (data) {
                resolve(data);
                // console.log('this should the totals table state');
            },
            error: function (error) {
                reject(error);
            }

        })
    });

}