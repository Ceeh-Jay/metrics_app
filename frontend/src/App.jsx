import { createRoot } from "react-dom/client";

import Metrics from "./components/Metrics";
import CampaignForm from "./components/CampaignForm";
import RetrieveAndCalculate from "./components/RetrieveAndCalculate";

const App = () => {
  return (
    <div>
      <h1>Hello, from Marketing Metrics</h1>
      <CampaignForm />
      <Metrics />
      <RetrieveAndCalculate />
    </div>
  );
};

export default App;

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

//if the formData is contained in there it is the css is set attribute is set accordingly
//and the value of the field is set to the error message

//if form error state contains name of the element, we will style the element accordingly
//and set the appropriate state.

{
  /* {formErrors.campaignName && <p className="error">{formErrors.campaignName}</p>}
{formErrors.impressions && <p className="error">{formErrors.impressions}</p>}
{formErrors.clicks && <p className="error">{formErrors.clicks}</p>}
{formErrors.conversions && <p className="error">{formErrors.conversions}</p>}
{formErrors.spend && <p className="error">{formErrors.spend}</p>}
*/
}

//i am thinking the first component makes the request and populate the parent componet
//state and the second componet will use the parent state.

//"retrieve and calculate button will be a form button 
//with a hidden attribute for the input element"
