import axios from "axios";

export const getCurrentSemester = () => {
    return axios.get('http://oop.okusann.online:8088/get_current_semester_and_year')
        .then(response => {
            if (response.status === 200) {
                console.log("OK", response);
                return response.data.semester;
            }
            throw new Error("Failed to get current semester");
        })
        .catch(error => {
            console.error("Error fetching current semester:", error);
            throw error; // Rethrow to handle it on the caller side
        });
};

export const getCurrentYear = () => {
    return axios.get('http://oop.okusann.online:8088/get_current_semester_and_year')
        .then(response => {
            if (response.status === 200) {
                console.log("OK", response);
                return response.data.year;
            }
            throw new Error("Failed to get current year");
        })
        .catch(error => {
            console.error("Error fetching current year:", error);
            throw error; // Rethrow to handle it on the caller side
        });
};
