let accountListBody = document.getElementById('accountListBody');
let key             = "aws_account_selector";
let accountList     = [];

chrome.storage.sync.get("aws_account_selector", function(data) {
    accountList = data["aws_account_selector"] || [];

    if (!Array.isArray(accountList)) {
        accountList = [];
    }
    
    constructOptions(accountList);
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


function constructOptions(accountList) {
    accountListBody.innerHTML = "";
    var i = -1;

    if (accountList.length < 1) {
        let paragraph = document.createElement('li');
        let button    = document.createElement('a');
        let icon      = document.createElement('i');

        icon.classList.add("icon-ok");

        button.appendChild(icon);

        button.innerHTML = "Please, configure your accounts";
        button.target = "_blank";
        button.href = "options.html";
        paragraph.appendChild(button);
        console.log(paragraph.innerHTML);
        accountListBody.appendChild(paragraph);
    } 

    for (let item of accountList) {
        if (item != undefined) {
            let paragraph = document.createElement('li');
            let button    = document.createElement('a');
            let icon      = document.createElement('i');

            icon.classList.add("icon-ok");

            button.appendChild(icon);

            button.innerHTML = button.innerHTML + "[" + item.name + "] " + item.number;
            button.target = "_blank";
            button.href = "https://" + item.number + ".signin.aws.amazon.com/console";
            paragraph.appendChild(button);
            console.log(paragraph.innerHTML);
            accountListBody.appendChild(paragraph);
        }
    }
}