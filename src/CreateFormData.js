import axios from "axios";

const API_URL = "/api/gallery";
const CreateFormData = async (formData) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const location = await axios.post(API_URL, formData, config);
  console.log("location from createFormData", location);
  return location;
};

export default CreateFormData;
