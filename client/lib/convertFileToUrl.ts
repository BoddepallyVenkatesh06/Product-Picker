


export const convertFileToUrl = (file: File): string => {
    return URL.createObjectURL(file);
};
