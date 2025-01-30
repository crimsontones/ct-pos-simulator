const baseURL = "http://localhost:8080/proxy"; // Updated for local proxy

function showLoading(isLoading) {
    document.getElementById('loading').style.display = isLoading ? 'block' : 'none';
}

function showProfileCreateSection(identity) {
    document.getElementById('profileDetailsSection').classList.remove('hidden');
    if (identity.includes('@')) {
        document.getElementById('inputEmail').value = identity;
    } else {
        document.getElementById('inputPhone').value = identity;
    }
    document.getElementById('profileHeader').innerText = 'Create Profile'; // Set header to Create Profile
    document.getElementById('createProfileButton').innerText = 'Create Profile';
}

function showProfileDetails(data) {
    const { name, email, phone } = data;
    const [firstName, lastName] = name ? name.split(' ') : ['', ''];

    document.getElementById('inputFirstName').value = firstName;
    document.getElementById('inputLastName').value = lastName;
    document.getElementById('inputPhone').value = phone || '';
    document.getElementById('inputEmail').value = email || '';

    document.getElementById('profileHeader').innerText = 'Profile Details'; // Update header to Profile Details
    document.getElementById('createProfileButton').innerText = 'Update Profile'; // Change button text to Update Profile

    document.getElementById('profileDetailsSection').classList.remove('hidden');
}

async function checkProfile() {
    const identity = document.getElementById('inputIdentity').value;
    const url = `${baseURL}/profile?identity=${identity}`;
    console.log('Checking profile with API endpoint:', url);

    showLoading(true);

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('Profile check raw response:', response);
        console.log('Profile check response:', data);
        console.log('Profile check record:', data.record);
        console.log('Profile check email:', data.record?.email);

        if (data && data.record) {
            console.log('Profile check email:', data.record.email);
            const profile = data.record;
            showProfileDetails({
                name: profile.name || '',
                email: profile.email || '',
                phone: profile.identity || ''
            });
            document.getElementById('purchaseSection').classList.remove('hidden');
            document.getElementById('profileFound').classList.remove('hidden');
        } else {
            document.getElementById('profileNotFound').classList.remove('hidden');
            showProfileCreateSection(identity);
        }
    } catch (error) {
        console.error('Error during profile check:', error);
    } finally {
        showLoading(false);
    }
}

async function createProfile() {
    const identity = document.getElementById('inputIdentity').value;
    const firstName = document.getElementById('inputFirstName').value;
    const lastName = document.getElementById('inputLastName').value;
    const phone = document.getElementById('inputPhone').value;
    const email = document.getElementById('inputEmail').value;

    const payload = {
        "d": [
            {
                "identity": identity.includes('@') ? identity : phone,
                "type": "profile",
                "profileData": {
                    "Name": `${firstName} ${lastName}`,
                    "Email": email ? email : undefined,
                    "Phone": phone ? phone : undefined,
                    "MSG-sms": phone ? true : false,
                    "MSG-email": email ? true : false,
                    "Source": "Offline",
                    "Branch Code": "PH-1",
                    "Branch Name": "High Street, BGC"
                }
            }
        ]
    };

    const url = `${baseURL}/profile`;

    showLoading(true);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        console.log('Profile created response:', data);

        if (data && data.status === 'success') {
            document.getElementById('purchaseSection').classList.remove('hidden');
            document.getElementById('profileNotFound').classList.add('hidden');
            document.getElementById('profileCreated').classList.remove('hidden');
        } else {
            alert('Failed to create profile. Please try again.');
        }
    } catch (error) {
        console.error('Error creating profile:', error);
    } finally {
        showLoading(false);
    }
}

// Default items to append to the CleverTap profile (visible on page load)
const defaultItems = [
    { "Product ID": "001", "Product Name": "Product A", "Quantity": 1, "Unit Price": 100},
    { "Product ID": "002", "Product Name": "Product B", "Quantity": 2, "Unit Price": 200}
];

for(i=0;i<defaultItems.length;i++){
    defaultItems[i]['Subtotal'] = defaultItems[i]['Quantity'] * defaultItems[i]['Unit Price'];
}

let cartTotal = 0

for(i=0;i<defaultItems.length;i++){
    cartTotal += defaultItems[i]['Subtotal']
}

// Function to initialize the preview section with default items
function initializePreview() {
    updatePreviewSection(defaultItems);
}

async function appendPurchase() {
    const identity = document.getElementById('inputIdentity').value;
    const payload = {
        "d": [
            {
                "identity": identity,
                "type": "event",
                "evtName": "Charged",
                "evtData": {
                    "Items": defaultItems,
                    "Total Amount": cartTotal,
                    "Currency": "USD"
                }
            }
        ]
    };

    const url = `${baseURL}/purchase`;

    showLoading(true);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        console.log('Purchase appended response:', data);

        if (data && data.status === 'success') {
            document.getElementById('profileFound').classList.add('hidden');
            document.getElementById('profileCreated').classList.add('hidden');
            document.getElementById('purchaseAppended').classList.remove('hidden');
        } else {
            alert('Failed to record purchase. Please try again.');
        }
    } catch (error) {
        console.error('Error appending purchase:', error);
    } finally {
        showLoading(false);
    }
}

// Function to update the preview section
function updatePreviewSection(items) {
    const itemPreviewList = document.getElementById('itemPreviewList');
    itemPreviewList.innerHTML = ''; // Clear the list

    // Loop through the items and append them to the list
    items.forEach(item => {
        const listItem = document.createElement('p');
        listItem.textContent = `${item.Quantity}x ${item['Product Name']} | Unit Price: $${item['Unit Price']} | Subtotal: $${item['Subtotal']}`;
        itemPreviewList.appendChild(listItem);
    });

    const totalPrice = document.createElement('p');
    totalPrice.textContent = `Total Price: $${cartTotal}`;
    itemPreviewList.appendChild(totalPrice);
}

// Call initializePreview() when the page loads
document.addEventListener('DOMContentLoaded', initializePreview);


document.getElementById('checkProfileButton').addEventListener('click', checkProfile);
document.getElementById('createProfileButton').addEventListener('click', createProfile);
document.getElementById('appendPurchaseButton').addEventListener('click', appendPurchase);