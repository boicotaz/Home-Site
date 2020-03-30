import { userAjax } from "../ajax/userAjax";
import { grouDetailsAjax } from "../ajax/groupDetailsAjax";

// $(document).ready(function () {

//     groupUserAutocomplete(userAjax, grouDetailsAjax, substringMatcher);
//     userAutocomplete(userAjax, substringMatcher);

// });
// //asd


let substringMatcher = function (strs) {

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


let userAutocomplete = function (userAjax, matcherFunction) {
    // create search bar
    userAjax.getAllUsers().then((values) => {
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
                source: matcherFunction(users_suggestions)  // Bloodhound instance is passed as the source
            });
    })
}


let groupUserAutocomplete = function (userAjax, groupAjax, matcherFunction) {
    // create add user in group search bar
    Promise.all([userAjax.getAllUsers(), grouDetailsAjax.getUsersInGroupDetails()]).then(function (usersInfo) {

        let [allUsers, groupUsersDetails] = usersInfo;

        console.log(groupUsersDetails);
        let idsInGroup = [];
        for (let key of groupUsersDetails.keys()) {
            let userDetails = groupUsersDetails.get(key);
            idsInGroup.push(userDetails.userId);
        }
        // let idsInGroup = groupUsers.map(user => elem[1]);

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
                source: matcherFunction(add_in_group_suggestions)  // Bloodhound instance is passed as the source
            });
    });
}


// $('#add-user-form').submit(function (event) {
//     event.preventDefault();

//     let data = $(this).serializeArray();
//     data[0].user = user;

//     var request = $.ajax({
//         url: '/add-user-in-group',
//         type: "POST",
//         data: data[0],
//         dataType: "json",
//         success: function (returnedData) {
//             $("#strong-added-success").text(data[0].value);
//             $("#user-added-success").show(function () {
//                 var myVar = setInterval(myTimer, 3000);

//                 function myTimer() {
//                     $('#addUserForm').modal('hide');
//                     window.clearInterval(myVar);
//                 }

//             });
//             renderGroup(returnedData.group);
//         }
//     });
// });


export { groupUserAutocomplete, substringMatcher,userAutocomplete } 