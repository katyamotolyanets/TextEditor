const DEBUG = false
let URL = "https://stark-brook-17339.herokuapp.com/uploads"

if (DEBUG) {
    URL = "http://localhost:8000/uploads"
}

export default URL
