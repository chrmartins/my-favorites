import { useForm, SubmitHandler } from "react-hook-form";

interface FileUploadProps {
  onFileUpload: (htmlContent: string) => void;
}

interface FormValues {
  file: FileList;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const file = data.file[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          onFileUpload(event.target.result as string);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-center">
      <input
        type="file"
        accept=".html"
        {...register("file")}
        className="mr-2 p-2 bg-dracula-current text-white rounded"
      />
      <button
        type="submit"
        className="bg-dracula-green text-white p-2 rounded hover:bg-dracula-purple"
      >
        Upload
      </button>
    </form>
  );
};

export default FileUpload;
