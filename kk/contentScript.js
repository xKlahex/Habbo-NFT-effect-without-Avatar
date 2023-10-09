let box = document.createElement('div');
box.style.cssText = 'display: flex; flex-direction: column; position:fixed; top:0; left:0; background:rgba(255,255,255,0.9); padding:15px; border:2px solid #000; z-index:9999; border-radius:8px; box-shadow:0px 4px 6px rgba(0,0,0,0.1);';

let usernameInput = document.createElement('input');
usernameInput.id = 'usernameInput';
usernameInput.placeholder = 'Enter Habbo username...';
usernameInput.style.cssText = 'margin-right:10px;padding:5px;border-radius:4px;border:1px solid #ccc';

let genderSelect = document.createElement('select');
genderSelect.id = 'genderSelect';
let maleOption = document.createElement('option');
maleOption.value = 'M';
maleOption.text = 'Male';
genderSelect.appendChild(maleOption);
let femaleOption = document.createElement('option');
femaleOption.value = 'F';
femaleOption.text = 'Female';
genderSelect.appendChild(femaleOption);
genderSelect.style.cssText = 'margin-right:10px;padding:5px;border-radius:4px;border:1px solid #ccc';

let fetchButton = document.createElement('button');
fetchButton.innerText = 'Fetch User';
fetchButton.style.cssText = 'margin-right:10px;padding:5px 10px;border-radius:4px;background:#007BFF;color:#fff;border:none;cursor:pointer';

let changeButton = document.createElement('button');
changeButton.innerText = 'Change Look';
changeButton.style.cssText = 'padding:5px 10px;border-radius:4px;background:#007BFF;color:#fff;border:none;cursor:pointer';

fetchButton.onclick = function() {
    const username = usernameInput.value;
    fetch(`https://${location.hostname}/api/public/users?name=${username}`)
        .then(response => response.json())
        .then(data => {
            if (data && data.figureString) {
                chrome.storage.local.set({ figureString: data.figureString });
                alert('User Outfit fetched, now enable the NFT Effect Ingame and then Click on Change Look. After that reload the Room');
            } else {
                alert('Failed to fetch User.');
            }
        })
        .catch(() => {
            alert('Error fetching User.');
        });
};

changeButton.onclick = function() {
    chrome.storage.local.get(['figureString'], function(data) {
        const figureValue = data.figureString;
        const selectedGender = genderSelect.value;
        if (figureValue) {
            fetch(`https://${location.hostname}/api/user/look/save`, {
                method: "POST",
                mode: "cors",
                credentials: "include",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "sec-fetch-site": "same-origin"
                },
                body: "figure=" + figureValue + "&gender=" + selectedGender,
                referrer: `https://${location.hostname}`,
                referrerPolicy: "strict-origin-when-cross-origin"
            })
            .then(response => response.json())
            .then(data => {
                if (data.error && data.error.text === "Too many requests in this time frame.") {
                    let nextRequestTime = new Date(data.error.nextValidRequestDate).toLocaleString();
                    alert(`Too many requests! Please try again at ${nextRequestTime}.`);
                } else {
                    alert('Change look worked!');
                }
            })
            .catch(console.error);
        } else {
            alert('No User look stored. Please fetch User first.');
        }
    });
};


let inputContainer = document.createElement('div');
inputContainer.style.cssText = 'display: flex; align-items: center; margin-bottom: 10px;';

let buttonContainer = document.createElement('div');
buttonContainer.style.cssText = 'display: flex; align-items: center;';
inputContainer.appendChild(usernameInput);
inputContainer.appendChild(genderSelect);
buttonContainer.appendChild(fetchButton);
buttonContainer.appendChild(changeButton);
box.appendChild(inputContainer);
box.appendChild(buttonContainer);

let creditSpan = document.createElement('span');
creditSpan.innerText = 'by @Khale';
creditSpan.style.cssText = 'position: absolute; bottom: 5px; right: 5px; font-size: 12px; color: #555;';
box.appendChild(creditSpan);

document.body.appendChild(box);