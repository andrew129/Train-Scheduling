let config = {
    apiKey: "AIzaSyCJJ3m-u3u9beNihhrEeQBhWAWsnIDBfYU",
    authDomain: "train-schedule-a8a6b.firebaseapp.com",
    databaseURL: "https://train-schedule-a8a6b.firebaseio.com",
    projectId: "train-schedule-a8a6b",
    storageBucket: "train-schedule-a8a6b.appspot.com",
    messagingSenderId: "389113127385",
    appId: "1:389113127385:web:8dfc9e654f92db2a"
  };

firebase.initializeApp(config);

let database = firebase.database();

$("#submit").on("click", function(event) {
    event.preventDefault();

    let trainName = $("#train-name").val().trim();
    let destination = $("#destination").val().trim();
    let firstTrain = $("#first-train").val().trim();
    let frequency = $("#frequency").val().trim()

    let newTrain = {
        train: trainName,
        destination: destination,
        first: firstTrain,
        frequency: frequency
    };
    
    database.ref().push(newTrain)

    console.log(newTrain.train);
    console.log(newTrain.destination);
    console.log(newTrain.first);
    console.log(newTrain.frequency);

    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train").val("");
    $("#frequency").val("");
})

database.ref().on("child_added", function(snapshot) {
  console.log(snapshot.val())

  let trainName = snapshot.val().train
  let destination = snapshot.val().destination
  let firstTrain = snapshot.val().first
  let frequency = snapshot.val().frequency

  console.log(trainName);


    let firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    console.log(firstTrainConverted);

    let currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    let diffTime = moment().diff(moment(firstTrainConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    let tRemainder = diffTime % frequency;
    console.log(tRemainder);

    let tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    let nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(frequency),
    $("<td>").text(nextTrain),
    $("<td>").text(tMinutesTillTrain)
  );

    $("#train-table").append(newRow)

})



