export const imageUpload = async (images) => {

  let imgArr = [];
  for (const item of images) {
    const formData = new FormData();
    formData.append("file", item);
    formData.append("upload_preset", process.env.REACT_APP_CLOUD_UPLOAD_PRESET);
    formData.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);

    const res = await fetch(process.env.REACT_APP_CLOUD_API, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log('imgdata', data)
    imgArr.push(data.secure_url);
  }
  return imgArr;
};
