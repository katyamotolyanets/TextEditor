const DEBUG = false
let URL = "https://text-editor-app-heroku.herokuapp.com/uploads"


if (DEBUG) {
    URL = "http://localhost:8000/uploads"
}

export default URL
