let accountListBody  = document.getElementById('accountList');
let addAccountButton = document.getElementById('add_account_button');
let accountList      = [];

chrome.storage.sync.get("aws_account_selector", function(result) {
    accountList = result["aws_account_selector"] || [];

    if (!Array.isArray(accountList)) {
        accountList = [];
    }

    constructOptions(accountList);
});

addAccountButton.addEventListener("click", function(){
    var accountNumber = document.getElementById('add_account_account');
    var accountName   = document.getElementById('add_account_nickname');
    var accountList   = removeItemFromArray(accountName.value);

    accountList.push({"name": accountName.value, "number": accountNumber.value});

    chrome.storage.sync.set({"aws_account_selector": accountList});
});

chrome.storage.onChanged.addListener(function(changes) {
    for (var k in changes) {
        if (k == "aws_account_selector") {
            var storageChange = changes[k];
            accountList = storageChange.newValue;
        }
    }
    constructOptions(accountList);
});

function removeItemFromArray(name) {
    let newArray = [];

    for (let item of accountList) {
        if (item != undefined) {
            if (item.name != name) {
                newArray.push(item);
            }
        }
    }

    return newArray;
}

function removeItem(name) {
    let newArray = removeItemFromArray(name);

    chrome.storage.sync.set({"aws_account_selector": newArray});
}


function constructOptions(accountList) {
    accountListBody.innerHTML = "";
    var i = -1;
    for (let item of accountList) {
        if (item != undefined) {
            let tr     = document.createElement('tr');
            let th     = document.createElement('th');
            let td1    = document.createElement('td');
            let td2    = document.createElement('td');
            let button = document.createElement('button');

            th.innerHTML  = item.number;
            td1.innerHTML = item.name;

            button.innerHTML = 'Remove';
            button.addEventListener('click', function(){removeItem(item.name);});
            td2.appendChild(button);
            tr.appendChild(th);
            tr.appendChild(td1);
            tr.appendChild(td2);
            accountListBody.appendChild(tr);
        }
    }
}
constructOptions(accountList);