// import React, { useEffect, useState } from "react";
// import ClearIcon from '@mui/icons-material/Clear';
// import './UploadImage.css'
// import FileUploadIcon from '@mui/icons-material/FileUpload';
// const UploadImage = () => {
//   const [selectedImage, setSelectedImage] = useState();

//   const link = sessionStorage.getItem('linkAvatar');

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//       <img
//         alt="not found"
//         width={"250px"}
//         height={"250px"}
//         style={{ borderRadius: '125px' }}
//         src={selectedImage ? URL.createObjectURL(selectedImage) : link}

//       />
//       <div style={{display: 'flex', justifyContent: 'space-around'}}>
//         <div className="buttonUpload buttonImage">
//           <FileUploadIcon />
//           <input
//             type="file"
//             // name="myImage"
//             className="inputfile"
//             onChange={(event) => {
//               setSelectedImage(event.target.files[0]);
//             }}
//           />
//         </div>
//         <div
//           className="buttonRemove buttonImage"
//           onClick={() => setSelectedImage(null)}
//         >
//           <ClearIcon />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UploadImage;

import { ChangeEvent, useState } from 'react';

function FileUploadSingle() {
  const [file, setFile] = useState();

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    if (!file) {
      return;
    }

    // 👇 Uploading the file using the fetch API to the server
    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: file,
      // 👇 Set headers manually for single file upload
      headers: {
        'content-type': file.type,
        'content-length': `${file.size}`, // 👈 Headers need to be a string
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />

      <div>{file && `${file.name} - ${file.type}`}</div>

      <button onClick={handleUploadClick}>Upload</button>
    </div>
  );
}

export default FileUploadSingle;