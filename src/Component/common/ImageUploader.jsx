import { Upload, X } from "lucide-react";

const ImageUploader = ({
  images = [],
  onChange,
  multiple = true,
  maxFiles = 5,
  label = "Upload Images",
}) => {
  const handleSelect = (e) => {
    const files = Array.from(e.target.files || []);

    if (images.length + files.length > maxFiles) {
      return alert(`Max ${maxFiles} images allowed`);
    }

    onChange([...(images || []), ...files]);
  };

  const removeImage = (index) => {
    onChange(images.filter((_, i) => i !== index));
  };

  // 🔥 SAFE IMAGE SRC
  const getImageSrc = (img) => {
    if (!img) return ""; // null / undefined safe

    // Old image (S3 / CDN)
    if (typeof img === "string") return img;

    // New uploaded image
    if (img instanceof File) return URL.createObjectURL(img);

    return "";
  };

  return (
    <div>
      <label className="block text-sm font-semibold mb-2">{label}</label>

      <div className="border-2 border-dashed rounded-lg p-6 text-center bg-gray-50 hover:border-purple-500">
        <input
          type="file"
          multiple={multiple}
          accept="image/*"
          onChange={handleSelect}
          className="hidden"
          id="image-upload"
        />
        <label htmlFor="image-upload" className="cursor-pointer">
          <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600">Click or drag images</p>
        </label>
      </div>

      {/* 🔥 SAFE PREVIEW */}
      {Array.isArray(images) && images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {images.map((img, i) => {
            const src = getImageSrc(img);
            if (!src) return null;

            return (
              <div key={i} className="relative group">
                <img
                  src={src}
                  alt="preview"
                  className="h-28 w-full object-cover rounded-lg border"
                />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100"
                >
                  <X size={16} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
