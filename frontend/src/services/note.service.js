import axios from "axios";

const updateNotes = (notes, tags) => {
    const headers = {
        "Content-Type": "application/json"
    };
    return axios
        .post("http://localhost:8000/uploads",
            {
                notes,
                tags
            }, {headers})
}

export default updateNotes;