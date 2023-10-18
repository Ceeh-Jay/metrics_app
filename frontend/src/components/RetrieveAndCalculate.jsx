const RetrieveAndCalculate = ({ apiUrl, onDataRetrieved }) => {
  const handleRetrieveData = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      // Call the onDataRetrieved callback in the parent component
      onDataRetrieved(data);
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  };

  return (
    <div>
      <button onClick={handleRetrieveData}>Retrieve and Calculate</button>
    </div>
  );
};

export default RetrieveAndCalculate;
