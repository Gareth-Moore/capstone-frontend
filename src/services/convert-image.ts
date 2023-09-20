function convertToBase64(file: File | null) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    if (file) {
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    }
  });
}

export default convertToBase64;
