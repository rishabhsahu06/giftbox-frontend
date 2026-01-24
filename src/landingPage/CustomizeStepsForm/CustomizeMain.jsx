import { BoxProvider,useBox } from "./CustomizeContext";
import Stepper from "./Steppers";
import Step1SelectBox from "./FormStepsComponent/StepOneSelectBox";
import Step2AddProducts from "./FormStepsComponent/StepTwoAddProduct";
import Step3AddCard from "./FormStepsComponent/StepThreeSelectCard";
import Step4Personalization from "./FormStepsComponent/Step4Personalize";
import FooterBar from "./FooterBar";

const StepRenderer = () => {
  const { step } = useBox();

  switch (step) {
    case 1: return <Step1SelectBox />;
    case 2: return <Step2AddProducts />;
    case 3: return <Step3AddCard />;
    case 4: return <Step4Personalization />;
    default: return null;
  }
};

export default function CustomizedPage() {
  return (
    <BoxProvider>
      <div className=" mx-auto p-2 md:p-6">
        <Stepper />
        <StepRenderer />
        <FooterBar />
      </div>
    </BoxProvider>
  );
}
