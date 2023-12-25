var audioButton = document.getElementById('audioButton');
var audioPlayer = document.getElementById('audioPlayer');
var respectCounterSpan = document.getElementById("RespectCounter");
document.getElementById("audioButton").disabled = true;
var respects = 0; //Initialized as -2 to check that firebase is working when it was 0

audioButton.addEventListener('click', function() {
    audioPlayer.play();
    updateRespectCounter();
});

function updateDaysGone()
{
    var startingDate = new Date("2023-12-19T08:00:00Z");
    var currentDate = new Date();
    startingDate.setUTCHours(0, 0, 0, 0);
    currentDate.setUTCHours(0, 0, 0, 0);
    
    var timeDiff = Math.abs(currentDate.getTime() - startingDate.getTime());
    var daysGone = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    var daysGoneSpan = document.getElementById("DaysCounter");
    daysGoneSpan.textContent += "She's back, guys!";
}

function updateRespectCounter()
{
    respects += 1;
    
    var respectCounterDocRef = db.collection("RespectCounter").doc("4nqEVznmZIPXXOzJY7ES");

    return respectCounterDocRef.update({
        Count: respects
    })
    .then(function() {
        alert("Thank you, and stay strong, tenshimp.");
        retrieveRespectCounter();
    })
    .catch(function(error) {
        console.error("Error updating document: ", error);
    });
}

document.addEventListener('DOMContentLoaded', function()
{
    updateDaysGone();
    setInterval(() => updateDaysGone(), 24 * 60 * 60 * 1000);
});

//Firebase bullshitery
var firebaseConfig = {
    apiKey: "AIzaSyAoLdC-dIhsQtUyj3-_MRiPiRrPQgq9KVI",
    authDomain: "agentx-cd9a1.firebaseapp.com",
    databaseURL: "https://agentx-cd9a1.firebaseio.com",
    projectId: "agentx-cd9a1",
    storageBucket: "agentx-cd9a1.appspot.com",
    messagingSenderId: "112855120766",
    appId: "1:112855120766:web:b89b79ea12a1243a97912f"
};
  
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

// Retrieve current count
async function retrieveRespectCounter()
{
    try{
        var respectCounterCollection = db.collection("RespectCounter");
        var querySnapshot = await respectCounterCollection.get();
        querySnapshot.forEach(function(doc) {
            respects = doc.data().Count;
        });
        respectCounterSpan.textContent = "Respect paid: " + respects;
        document.getElementById("audioButton").disabled = false;
    }
    catch(error) {
        console.error("Error getting documents: ", error);
    }
}

// Wait for retrieve before loading
async function initializePage()
{
    respectCounterSpan.textContent = "Counting paid respects..."
    await retrieveRespectCounter();
}
window.addEventListener("load", initializePage);