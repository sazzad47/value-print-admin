export const uploadToCloudinary = (fileList, onProgress) => {
    return new Promise((resolve, reject) => {
      const urls = [];
      console.log('responseCloud', process.env.REACT_APP_CLOUD_API)
      const uploaders = Array.from(fileList).map((file) => {
        return new Promise((resolve, reject) => {
          if (!process.env.REACT_APP_CLOUD_API || !process.env.REACT_APP_CLOUD_UPLOAD_PRESET || !process.env.REACT_APP_CLOUD_NAME) {
            reject(new Error("Cloudinary environment variables not defined."));
            return;
          }
  
          const xhr = new XMLHttpRequest();
          xhr.open("POST", process.env.REACT_APP_CLOUD_API);
          xhr.onload = () => {
            const response = JSON.parse(xhr.responseText);
            console.log('responseCloud', response)
            if (xhr.status === 200) {
              const response = JSON.parse(xhr.responseText);
              console.log('responseCloud', response)
              const url = response.secure_url;
              urls.push(url);
              resolve(url);
            } else {
              reject(xhr.statusText);
            }
          };
          xhr.onerror = () => {
            reject(xhr.statusText);
          };
          xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
              const percentComplete = (event.loaded / event.total) * 100;
              onProgress(percentComplete);
            }
          };
         
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", process.env.REACT_APP_CLOUD_UPLOAD_PRESET);
          formData.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);
          xhr.send(formData);
        });
      });
  
      Promise.all(uploaders)
        .then(() => {
          resolve(urls);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };