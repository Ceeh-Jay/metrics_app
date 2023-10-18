import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const intialState = {
  impressions: "",
  clicks: "",
  conversions: "",
  spend: "",
};
const CampaignForm = ({ apiUrl }) => {
  const [formData, setFormData] = useState(intialState);

  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    const errors = {};
    console.log(errors);

    if (isNaN(parseFloat(formData.impressions))) {
      errors.impressions = "Impressions is required and must be a number";
    }
    if (isNaN(parseFloat(formData.clicks))) {
      errors.clicks = "Clicks is required and must be a number";
    }
    if (isNaN(parseFloat(formData.conversions))) {
      errors.conversions = "Conversions is required and must be a number";
    }
    if (isNaN(parseFloat(formData.spend))) {
      errors.spend = "Spend is required and must be a number";
    }
  

    if (Object.keys(errors).length === 0) {
      // If no validation errors, proceed with form submission
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          console.error(
            "Network response not ok:",
            response.status,
            response.statusText,
          );
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        toast.success(data.message, {
          position: "top-right",
          autoClose: 3000,
        });

        // Clear the form or update UI as needed...
        setFormData(intialState)
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error cases here...
      }
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="campaign-form">
        <h4 className="form-heading">All fields are required.</h4>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="impressions">Impressions:</label>
            <input
              type="text"
              placeholder="Impressions"
              id="impressions"
              value={formData.impressions}
              onChange={(e) =>
                setFormData({ ...formData, impressions: e.target.value })
              }
            />
            {formErrors.impressions && (
              <p className="error">{formErrors.impressions}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="clicks">Clicks:</label>
            <input
              type="text"
              placeholder="Clicks"
              id="clicks"
              value={formData.clicks}
              onChange={(e) =>
                setFormData({ ...formData, clicks: e.target.value })
              }
            />
            {formErrors.clicks && <p className="error">{formErrors.clicks}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="conversions">Conversions:</label>
            <input
              type="text"
              placeholder="Conversions"
              id="conversions"
              value={formData.conversions}
              onChange={(e) =>
                setFormData({ ...formData, conversions: e.target.value })
              }
            />
            {formErrors.conversions && (
              <p className="error">{formErrors.conversions}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="spend">Spend:</label>
            <input
              type="text"
              placeholder="Spend"
              id="spend"
              value={formData.spend}
              onChange={(e) =>
                setFormData({ ...formData, spend: e.target.value })
              }
            />
            {formErrors.spend && <p className="error">{formErrors.spend}</p>}
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default CampaignForm;
