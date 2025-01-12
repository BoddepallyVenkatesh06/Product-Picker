import { useEffect, useRef, useState, Dispatch, SetStateAction } from "react";
import { useDropzone } from "react-dropzone";
import { FormikHelpers } from "formik";

type FileUploaderProps = {
    setFieldValue: FormikHelpers<any>['setFieldValue'];
    imageUrl: string;
    setFiles: Dispatch<SetStateAction<File | null>>;
};

export default function FileUploader({ imageUrl, setFiles, setFieldValue }: FileUploaderProps) {

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewSource, setPreviewSource] = useState<string>("");
    const inputRef = useRef<HTMLInputElement | null>(null);
    // console.log("imageUrl = ", imageUrl)
    
    const onDrop = (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            previewFile(file);
            setSelectedFile(file);
            setFiles(file);
            setFieldValue("files", file); // Set the file in Formik
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: { "image/*": [".jpeg", ".jpg", ".png"] },
        onDrop,
    });

    const previewFile = (file: File) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            if (reader.result) {
                setPreviewSource(reader.result as string);
            }
        };
    };

    useEffect(() => {
        setFieldValue("image", selectedFile); // Ensure the file is set in Formik
        if(imageUrl){
            setPreviewSource(imageUrl)
        }
    }, [selectedFile, setFieldValue, imageUrl ]);

    return (
        <div className="flex flex-col space-y-2 w-[26rem] ">
            <label className="text-sm text-richblack-5" htmlFor="image">
                Product Image
            </label>

            <div
                className={`${isDragActive ? "bg-richblack-600" : "bg-richblack-700"} flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}
                {...getRootProps()}
            >
                {previewSource ? (
                    <div className="flex w-full flex-col p-6">
                        <img
                            src={previewSource}
                            alt="Preview"
                            className="h-full w-full rounded-md object-cover"
                        />
                        <button
                            type="button"
                            onClick={() => {
                                setPreviewSource("")
                                setSelectedFile(null)
                                setFiles(null)
                                setFieldValue("files", null)
                            }}
                            className="mt-3 text-richblack-400 underline"
                        >
                            Cancel
                        </button>
                    </div>
                ) : (
                    <div className="flex w-full flex-col items-center p-6">
                        <input {...getInputProps()} ref={inputRef} />
                        <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800"></div>
                        <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
                            Drag and drop an image or click to{" "}
                            <span className="font-semibold text-yellow-50">Browse</span> a file
                        </p>
                        <ul className="mt-10 flex list-disc justify-between space-x-12 text-center text-xs text-richblack-200">
                            <li>Aspect ratio 16:9</li>
                            <li>Recommended size 1024x576</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
