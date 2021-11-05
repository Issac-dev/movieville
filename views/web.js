function search() {
    var movie = document.getElementById("name").value
    fetch(`http://localhost:4000/movies?movie=${movie}`)
        .then(response => {
            console.log(response.json())
        })
}