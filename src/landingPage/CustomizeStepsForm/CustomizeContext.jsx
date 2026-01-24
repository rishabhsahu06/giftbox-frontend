import { createContext, useContext, useState } from "react";

const BoxContext = createContext();

export const BoxProvider = ({ children }) => {
  const [step, setStep] = useState(1);

  // cached data
  const [boxes, setBoxes] = useState(null);
  const [products, setProducts] = useState(null);
  const [cards, setCards] = useState(null);

  // selections
  const [selectedBox, setSelectedBox] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [personalization, setPersonalization] = useState({});

  return (
    <BoxContext.Provider
      value={{
        step, setStep,
        boxes, setBoxes,
        products, setProducts,
        cards, setCards,
        selectedBox, setSelectedBox,
        selectedProducts, setSelectedProducts,
        selectedCard, setSelectedCard,
        personalization, setPersonalization,
      }}
    >
      {children}
    </BoxContext.Provider>
  );
};

export const useBox = () => useContext(BoxContext);
