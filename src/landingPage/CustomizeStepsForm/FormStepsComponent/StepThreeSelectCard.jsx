import { useBox } from "../CustomizeContext";
import { getAllCards } from "../../../api/hamper.api";
import { useCachedFetch } from "../../hooks/useCustomizeCachedFetch";
import PageLoader from "../../../Pageloader/Pageloader";

export default function Step3AddCard() {
  const { cards, setCards, selectedCard, setSelectedCard } = useBox();

  // Use correct API function
  const loading = useCachedFetch(cards, setCards, getAllCards);

  if (loading) return <p className="text-center py-4"><PageLoader/>Loading cards...</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6">
      {cards?.map((card) => (
        <div
          key={card._id}
          onClick={() => setSelectedCard(card)}
          className={`p-1 border rounded-lg cursor-pointer transition flex flex-col ${
            selectedCard?._id === card?._id
              ? "border-red-500 shadow-xl bg-red-50"
              : "hover:shadow-md border-gray-200"
          }`}
        >
          <img 
            src={card.image} 
            alt={card.name}
            className="h-40 w-full object-cover rounded mb-3" 
          />
          <h4 className="font-semibold text-center">{card.name}</h4>
        </div>
      ))}
    </div>
  );
}