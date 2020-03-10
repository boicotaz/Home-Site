var evt = new CustomEvent('buttons-created', { state: "done" })
var user;

var usernames;
var usernamesInGroup;


var getMainPage = function (user) {

    if ($("#group-dashboard").length) return;

    $("#content").remove();
    $("#content-container").append("<div id = 'content'></div>")

     
    Promise.all([getUsersInGroup(), getGroupDetails(), getGroupMessages()]).then((res) => {
        console.log('Results are from Promise.all: ', res);
        let [usersInGroup, groupDetails, groupMessages] = res;
        ReactDOM.render(
            <MainPage usersInGroup={usersInGroup} groupDetails={groupDetails} currentUser={user} > </MainPage>, document.getElementById('content')
        );
    }).catch((error) => console.log(error));
}

getMainPage(myUser);

let createAutoSuggest = () => {

}


function getAllUsers() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/api/get-users',
            type: "GET",
            success: function (returnedData) {
                resolve(returnedData);
            },
            error: function (error) {
                reject(error);
            }
        })
    })
}

function getCurrentUser() {
    return new Promise((resolve,reject) => {
        $.ajax({
            url: '/api/get-current-user',
            type: 'GET',
            success: function (currentUser){
                resolve(currentUser);
            },
            error: function (error) {
                reject(error);
            }
        })
    })
}


function getUsersInGroup() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/api/get-users-in-group',
            type: 'POST',
            success: function (usersInGroup) {
                usernamesInGroup = usersInGroup;
                window.dispatchEvent(evt);
                resolve(usersInGroup);
            },
            error: function (error) {
                reject(error);
            }
        })
    })
}

function getGroupDetails() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/api/get-group-details',
            type: 'GET',
            success: function (groupDetails){
                resolve(groupDetails);
            },
            error: function (error) {
                reject(error);
            }
        })
    })
}


 function  getGroupMessages () {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/home/get-group-messages',
            method: 'GET',
            dataType: "json",
            success: function (groupMessages) {
                console.log('get group message data:', groupMessages);
                resolve(groupMessages);
            },
            error: function (error) {
                reject(error);
            }

        })
    });

}


$(document).ready(function () {
    // getMainPage();
    var getCurrentUser = $.ajax({
        url: '/api/get-current-user',
        type: 'GET',
        success: function (User) {
            user = User;
        }
    })

    // create search bar
    getAllUsers().then(function (values) {
        let allUsers = values;
        var users_suggestions = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.whitespace, // see its meaning above
            queryTokenizer: Bloodhound.tokenizers.whitespace, // see its meaning above
            local: allUsers
        });
        $('#search-bar').typeahead({
            hint: true,
            highlight: true,
            minLength: 1
        },
            {
                name: 'user_suggestions',
                source: substringMatcher(users_suggestions)  // Bloodhound instance is passed as the source
            });
    })
    
    // create add user in group search bar
    Promise.all([getAllUsers(), getUsersInGroup()]).then(function (values) {
        let allUsers = values[0];
        let groupUsers = values[1];

        let idsInGroup = groupUsers.map(elem => elem[1]);

        // suggest users that are not already in the group
        let correctUsers = allUsers.filter((elem) => {
            if (!idsInGroup.includes(elem[1])) return elem;
        });

        var add_in_group_suggestions = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.whitespace, // see its meaning above
            queryTokenizer: Bloodhound.tokenizers.whitespace, // see its meaning above
            local: correctUsers
        });

        $('#add-user-in-group-field').typeahead({
            hint: true,
            highlight: true,
            minLength: 1
        },
            {
                name: 'add_in_group_suggestions',
                source: substringMatcher(add_in_group_suggestions)  // Bloodhound instance is passed as the source
            });
    });

});

// function renderGroup(users) {

//     ReactDOM.render(
//         <Group users={users} />, document.getElementById("usersInGroup"))
// }

$('#add-user-form').submit(function (event) {
    event.preventDefault();

    let data = $(this).serializeArray();
    data[0].user = user;

    var request = $.ajax({
        url: '/add-user-in-group',
        type: "POST",
        data: data[0],
        dataType: "json",
        success: function (returnedData) {
            $("#strong-added-success").text(data[0].value);
            $("#user-added-success").show(function () {
                var myVar = setInterval(myTimer, 3000);

                function myTimer() {
                    $('#addUserForm').modal('hide');
                    window.clearInterval(myVar);
                }

            });
            renderGroup(returnedData.group);

        }
    });
});


var substringMatcher = function (strs) {

    return function findMatches(q, cb) {
        var matches, substringRegex;
        let stringsToMatch = strs.local.map(entry => entry[0])

        // an array that will be populated with substring matches
        matches = [];

        // regex used to determine if a string contains the substring `q`
        let substrRegex = new RegExp(q, 'i');

        // iterate through the pool of strings and for any string that
        // contains the substring `q`, add it to the `matches` array
        $.each(stringsToMatch, function (i, str) {
            if (substrRegex.test(str)) {
                matches.push(str);
            }
        });

        cb(matches);
    };
};

