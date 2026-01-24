import { useBox } from "./CustomizeContext";

export default function FooterBar() {
  const {
    step,
    setStep,
    selectedBox,
    selectedProducts,
    selectedCard,
  } = useBox();

  const total =
    (selectedBox?.price || 0) +
    selectedProducts.reduce(
      (sum, p) => sum + (p.discounted_price || p.price || 0),
      0
    );

  return (
    <div className="mt-10 border-t pt-6 bg-white">
      {/* TOTAL */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-600 font-medium">Total Amount</span>
        <span className="text-xl font-bold text-green-600">
          ₹{total}
        </span>
      </div>

      {/* NAVIGATION */}
      <div className="flex justify-between items-center">
        {/* BACK */}
        {step > 1 ? (
          <button
            onClick={() => setStep(step - 1)}
            className="px-6 py-2 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition"
          >
            ← Back
          </button>
        ) : (
          <div />
        )}

        {/* NEXT (ONLY TILL STEP 3) */}
        {step < 4 && (
          <button
            onClick={() => setStep(step + 1)}
            disabled={
              (step === 1 && !selectedBox) ||
              (step === 2 && selectedProducts.length === 0) ||
              (step === 3 && !selectedCard)
            }
            className="px-8 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition disabled:opacity-50"
          >
            Next →
          </button>
        )}
      </div>
    </div>
  );
}
