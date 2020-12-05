$( document ).ready(function() {
    $("#submitBtn").click(() => {
        var database = firebase.database();
        var uid = Date.now();
        var title = $("#title").val();
        var input = document.getElementById('fileButton');
        var file = input.files[0];
        var uid = Date.now();
        var storageRef = firebase.storage().ref('pictures/' + uid +file.name);
        var task = storageRef.put(file);
        task.on('state_changed',
            function progress(snapshot) {
                var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },
            function error(err) {
                console.log(err);
            },
            function complete() {
                storageRef.getDownloadURL().then((url) => {
                    const uploadData = {
                        url,
                        title
                    }
                    database.ref(`picture/`).push(uploadData, (error) => {
                        if (error) {
                            console.log(error);
                        } else {
                            alert("Done");
                        }
                    });
                })
            }
        );
    })
});