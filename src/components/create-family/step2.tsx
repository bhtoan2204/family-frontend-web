import React, { useEffect, useRef } from 'react'
import Button from '@/lib/atoms/create-family/Button';
import Image from 'next/image';
interface Step2Props {

    photo: String;
    photoFile: File | null;

    setPhoto: React.Dispatch<React.SetStateAction<String>>;
    setPhotoFile: React.Dispatch<React.SetStateAction<File | null>>;
    handleChangeStep: React.Dispatch<React.SetStateAction<number>>;
}

const ComponentStep2: React.FC<Step2Props> = ({ photo, photoFile, setPhoto, setPhotoFile, handleChangeStep }: Step2Props) => {
    // useEffect(() => {
    //     updateCreateFamilySessionStorage({
    //         ui_step: 2,
    //         data: {
    //             name: name,
    //             photo: photo,
    //             photoFile: photoFile
    //         }

    //     })
    // }, [name, photo, photoFile])
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleNext = () => {
        // handleNextStep();
        handleChangeStep(3);
    }
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            setPhotoFile(selectedFile);
            console.log(selectedFile)
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.result) {
                    setPhoto(reader.result.toString());
                }
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleUploadButtonClick = () => {
        fileInputRef.current?.click();
    };
    return (
        <React.Fragment>
            <div className='text-4xl font-bold font-inter leading-[1.25] mb-4'>Upload your family photo?</div>
            <div className='mb-4'> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus, distinctio.</div>
            <div>

                <div>
                    <p className='mb-8'>Help your family knows who they&#39;re talking to</p>
                </div>
                {photo ? (
                    <Image src={photo.toString()} alt='' about='' width={36} height={36} onClick={handleUploadButtonClick} />
                    // <img src={photo.toString()} alt="Family Photo" className='border-2 border-solid w-36 h-36 mb-8 rounded-lg' onClick={handleUploadButtonClick}/>
                ) : (
                    <div className='border-2 border-solid w-36 h-36 mb-8 rounded-lg bg-center bg-cover bg-no-repeat bg-[url(https://www.w3schools.com/howto/img_avatar.png)] ' onClick={handleUploadButtonClick}  ></div>
                )}
                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} />
                {/* <button className='w-36 py-3 border border-[#dddddd] rounded-lg text-black mb-4 text-sm font-medium' onClick={handleUploadButtonClick}>Upload Photo</button> */}
                <Button onClick={handleUploadButtonClick} className='text-black' >Upload Photo</Button>
            </div>

            <div className='mt-8'>
                <Button disabled={photo == null} onClick={handleNext} className={`${photo ? 'text-white bg-[#187A5A]' : 'text-[#666566] bg-[#DDDDDD]'}`}>Next</Button>
                <Button onClick={handleNext} >Skip this step</Button>
            </div>

            {/* <button className='bg-[#DDDDDD] px-10 py-2 mt-10 mb-10 rounded-lg text-[#666566]' onClick={handleNext}>Next</button> */}
        </React.Fragment>
    )
}

export default ComponentStep2