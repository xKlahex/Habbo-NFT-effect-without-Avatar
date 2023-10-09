# Habbo-NFT-effect-without-Avatar

### Step 1: Create a Folder on your Desktop and name it "HabboEffect"

### Step 2: Create a textfile in the Folder and insert this content:

```
{
   "manifest_version": 3,
   "name": "Habbo NFT Effect without NFT Avatar",
   "version": "1.0",
   "description": "Wear NFT Effect without wearing the NFT Avatar",
"permissions": ["storage"],
   "content_scripts": [
      {
         "matches": [
            "https://www.habbo.com/*",
            "https://www.habbo.com.br/*",
            "https://www.habbo.com.tr/*",
            "https://www.habbo.fi/*",
            "https://www.habbo.nl/*",
            "https://www.habbo.es/*",
            "https://www.habbo.de/*",
            "https://www.habbo.it/*",
            "https://www.habbo.fr/*"
         ],
         "js": ["contentScript.js"],
         "run_at": "document_end"
      }
   ],
   "content_security_policy": {
      "extension_pages": "script-src 'self'; object-src 'self';"
   }
}
```

### Step 3: Save the Textfile and rename this file into "manifest.json" make sure it isnt a Textfile anymore it should be an .json file.

### Step 4: Create another text file and insert this Content:

```
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
```

### Step 5: Save this file and rename it then to "contentScript.js" make sure it is an .js file not an text file anymore.

### Step 6: Go to your Chrome Extensions Tab
![alt text](https://i.imgur.com/lndyRej.png)

### Step 7: Enable the Developer Options
![alt text](https://i.imgur.com/wQR4ELN.png)

### Step 8: Drag and Drop the "HabboEffect" you Have created into the Chrome Extensions Tab
![alt text](https://i.imgur.com/EkXBH7t.png)

### Step 9: Now youre Ready, go to Habbo and you will see now on Left side the Change look Tool
![alt text](https://i.imgur.com/XzoyVoT.png)

### Step 10: Insert your Habbo user Name and click on "Fetch User", after that Enable the Habbo NFT Effect in the Game and after that click on "Change Look"

### Step 11: Now Reolad the Habbo Room, done

