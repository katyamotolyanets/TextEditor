import axios from "axios";

import URL from "../../config"

const updateNotes = (notes, tags) => {
    const headers = {
        "Content-Type": "application/json"
    };
    return axios
        .post(URL,
            {
                notes,
                tags
            }, {headers})
}

export default updateNotes;