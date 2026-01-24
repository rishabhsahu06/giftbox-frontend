import { useBox } from "../CustomizeContext";
import { getAllBoxes } from "../../../api/hamper.api";
import { useCachedFetch } from "../../hooks/useCustomizeCachedFetch";
import PageLoader from "../../../Pageloader/Pageloader";

export default function Step1SelectBox() {
  const { boxes, setBoxes, selectedBox, setSelectedBox } = useBox();

  // Use correct API function
  const loading = useCachedFetch(boxes, setBoxes, getAllBoxes);

  if (loading) return <p className="text-center py-4"> <PageLoader/>Loading boxes...</p>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-4">
      {boxes?.map((box) => (
        <div
          key={box._id}
          onClick={() => setSelectedBox(box)}
          className={`p-4 border rounded-lg cursor-pointer transition flex flex-col ${
            selectedBox?._id === box._id
              ? "border-red-500 shadow-xl bg-red-50"
              : "hover:shadow-md border-gray-200"
          }`}
        >
          <img 
             src={box?.image} 
             alt={box?.name} 
             className="w-full h-30 md:h-48 object-cover rounded mb-3" 
          />
          <h4 className=" text-sm md:text-lg font-semibold">{box?.name}</h4>
          <p className="text-sm text-gray-600 mt-1">₹{box?.price}</p>
        </div>
      ))}
    </div>
  );
}