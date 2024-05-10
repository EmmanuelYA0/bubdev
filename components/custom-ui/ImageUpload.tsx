import { CldUploadWidget } from "next-cloudinary";
import { Plus, Trash2} from "lucide-react";

import { Button } from "../ui/button";
import Image from "next/image";

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  onRemove: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  onRemove,
  value,
}) => {
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  return (
    <div className="mb-4 flex flex-wrap items-center gap-4">
      {value && (
        <div className="relative w-[200px] h-[200px]">
          <div className="absolute top-0 right-0 z-10">
            <Button
              type="button"
              onClick={onRemove}
              size="sm"
              className="bg-red-500 text-white"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <Image
            src={value}
            alt="bottle"
            className="object-cover rounded-lg"
            fill
          />
        </div>
      )}

      <CldUploadWidget uploadPreset="wdo6qz5e" onSuccess={onUpload}>
        {({ open }) => {
          return (
            <Button type="button" onClick={() => open()} className="bg-pourpre hover:bg-redhot text-white">
              <Plus className="h-4 w-4 mr-2" />
              {value ? "Changer l'image" : "Télécharger une image"}
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
