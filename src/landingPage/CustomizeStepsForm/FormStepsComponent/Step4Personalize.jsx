import { useState } from "react";
import { useBox } from "../CustomizeContext";
import { submitCustomizeRequest } from "../../../api/hamper.api";

export default function Step4Personalization() {
  const {
    selectedBox,
    selectedCard,
    selectedProducts,
    personalization,
    setPersonalization,
    setStep, // 👈 make sure CustomizeContext exposes this
  } = useBox();

  const [userDetails, setUserDetails] = useState({
    name: "",
    contactNumber: "",
  });
  const [generalMessage, setGeneralMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");

    if (!userDetails.name || !userDetails.contactNumber) {
      setError("Please enter your Name and Contact Number.");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      name: userDetails.name,
      contactNumber: userDetails.contactNumber,
      box: selectedBox?._id,
      card: selectedCard?._id,
      customGiftMessage: generalMessage,
      products: selectedProducts.map((p) => ({
        product: p._id,
        personalizationText: personalization[p._id] || "",
      })),
    };

    try {
      await submitCustomizeRequest(payload);
      setShowSuccess(true);

      // Reset flow after short delay
      setTimeout(() => {
        setShowSuccess(false);
        setStep(1); // 🔁 back to Step 1
      }, 2500);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* 🔹 HEADER */}
      <div className="text-center">
        <h2 className="text-2xl font-bold">Personalize Your Hamper 🎁</h2>
        <p className="text-gray-500 text-sm mt-1">
          Add finishing touches to make your gift special
        </p>
      </div>

      {/* 🔹 PRODUCT PERSONALIZATION */}
      <div className="space-y-5">
        {selectedProducts.map((p) => (
          <div
            key={p._id}
            className="flex gap-4 bg-white border rounded-xl p-4 shadow-sm"
          >
            <img
              src={p.images?.[0]}
              className="w-20 h-20 rounded-lg object-cover"
            />

            <div className="flex-1">
              <h4 className="font-semibold">{p.name}</h4>
              <textarea
                placeholder="Personal message for this item..."
                value={personalization[p._id] || ""}
                onChange={(e) =>
                  setPersonalization((prev) => ({
                    ...prev,
                    [p._id]: e.target.value,
                  }))
                }
                className="mt-2 w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-red-500 outline-none"
                rows={2}
              />
            </div>
          </div>
        ))}
      </div>

      {/* 🔹 USER DETAILS */}
      <div className="bg-gray-50 border rounded-2xl p-6 space-y-4">
        <h3 className="font-bold text-lg">Your Details</h3>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            placeholder="Your Name *"
            value={userDetails.name}
            onChange={(e) =>
              setUserDetails({ ...userDetails, name: e.target.value })
            }
            className="border p-3 rounded-lg w-full"
          />
          <input
            placeholder="Contact Number *"
            type="number"
            value={userDetails.contactNumber}
            onChange={(e) =>
              setUserDetails({
                ...userDetails,
                contactNumber: e.target.value,
              })
            }
            className="border p-3 rounded-lg w-full"
          />
        </div>

        <textarea
          placeholder="Gift Card Message (optional)"
          value={generalMessage}
          onChange={(e) => setGeneralMessage(e.target.value)}
          className="w-full border rounded-lg p-3"
          rows={3}
        />
      </div>

      {/* 🔹 ERROR */}
      {error && (
        <div className="text-center text-red-600 bg-red-50 p-2 rounded">
          {error}
        </div>
      )}

      {/* 🔹 SUBMIT */}
      <div className="text-center">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="bg-red-600 hover:bg-red-700 text-white px-10 py-3 rounded-full font-semibold md:text-lg transition disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Confirm & Submit"}
        </button>
      </div>

      {/* ✅ SUCCESS POPUP */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 text-center max-w-sm w-full animate-scaleIn">
            <div className="text-4xl mb-3">🎉</div>
            <h3 className="text-xl font-bold mb-2">
              Hamper Request Submitted!
            </h3>
            <p className="text-gray-600 text-sm">
              Thank you for your request. Our team will contact you shortly.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
