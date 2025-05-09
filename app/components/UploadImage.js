'use client'
import Image from 'next/image';
import {useState} from 'react'

const UploadImage = ({setForm}) => {
    const [selectedFile,setSelectedFile]=useState('');
    const [previewUrl,setPreviewUrl]=useState('')

  const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
                setSelectedFile(file);
                // If you want to update the form with the file or URL
                
                setForm(prev => ({ ...prev, photoUrl:reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

  return (
    <div>
        <input type='file' onChange={handleFileChange} accept='image/*'/>
        <div>
        {selectedFile && <Image  className='object-cover rounded-md h-60' src={previewUrl} 
                    alt='Preview' 
                    width={400} 
                    height={70}/>
                    }
     </div>
    </div>
  )
}

export default UploadImage