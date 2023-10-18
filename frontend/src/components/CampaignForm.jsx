import { useState } from "react";

const CampaignForm = () => {
  const [formData, setFormData] = useState({
    campaignName: "",
    impressions: "",
    clicks: "",
    conversions: "",
    spend: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation checks
    const errors = {};

    if (
      !(
        typeof parseFloat(formData.impressions) === "number" &&
        !Number.isNaN(formData.impressions)
      )
    ) {
      errors.impressions = "Impressions is required and must be a number";
    }
    if (
      !(
        typeof parseFloat(formData.clicks) === "number" &&
        !Number.isNaN(formData.clicks)
      )
    ) {
      errors.clicks = "Clicks is required and must be a number";
    }
    if (
      !(
        typeof parseFloat(formData.conversions) === "number" &&
        !Number.isNaN(formData.conversions)
      )
    ) {
      errors.conversions = "Conversions is required and must be a number";
    }
    if (
      !(
        typeof parseFloat(formData.spend) === "number" &&
        !Number.isNaN(formData.spend)
      )
    ) {
      errors.spend = "Spend is required and must be a number";
    }

    if (Object.keys(errors).length === 0) {
      // If no validation errors, proceed with form submission
      // You can add code here to send data to the backend API
      // Use the fetch API or Axios for making API requests.
    } else {
      // If there are validation errors, update the formErrors state
      setFormErrors(errors);
    }
  };

  return (
    <>
      <h4>All fields are required.</h4>
      <form onSubmit={handleSubmit}>
        <label htmlFor="impressions">Impressions:</label>
        <input
          type="number"
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

        <label htmlFor="clicks">Clicks:</label>
        <input
          type="number"
          placeholder="Clicks"
          id="clicks"
          value={formData.clicks}
          onChange={(e) => setFormData({ ...formData, clicks: e.target.value })}
        />
        {formErrors.clicks && <p className="error">{formErrors.clicks}</p>}

        <label htmlFor="conversions">Conversions:</label>
        <input
          type="number"
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

        <label htmlFor="spend">Spend:</label>
        <input
          type="text"
          placeholder="Spend"
          id="spend"
          value={formData.spend}
          onChange={(e) => setFormData({ ...formData, spend: e.target.value })}
        />
        {formErrors.spend && <p className="error">{formErrors.spend}</p>}

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default CampaignForm;
