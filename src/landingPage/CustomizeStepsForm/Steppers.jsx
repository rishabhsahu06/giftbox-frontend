import { useBox } from "./CustomizeContext";

export default function Stepper() {
  const { step } = useBox();

  const steps = [
    "Select Box",
    "Add Products",
    "Add Card",
    "Personalization",
  ];

  // progress percentage
  const progress =
  step === 1
    ? 0
    : ((step - 1) / (steps.length - 1)) * 80;

  return (
    <div className="w-full mb-10">
      <div className="relative flex items-center justify-between">
        
        {/* FULL GRAY LINE (CENTER TO CENTER) */}
        <div className="absolute top-1/3 left-[12.5%] w-[75%] h-[1px] bg-gray-300 -z-10" />

        {/* ACTIVE RED LINE */}
        <div
          className="absolute top-1/2 left-[12.5%] h-[2px] bg-green-500 -z-10 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />

        {steps.map((label, index) => {
          const active = step >= index + 1;

          return (
            <div
              key={index}
              className="flex flex-col items-center text-center w-full"
            >
              {/* STEP CIRCLE */}
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all
                  ${
                    active
                      ? "bg-red-500 text-white shadow-md"
                      : "bg-white border border-gray-300 text-gray-500"
                  }`}
              >
                {index + 1}
              </div>

              {/* LABEL */}
              <span
                className={`mt-2 text-xs sm:text-sm font-medium ${
                  active ? "text-green-500" : "text-gray-500"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
