import { GoSearch } from "react-icons/go";

// InputForm component for entering city name and submitting the form
const InputForm = ({ city, setCity, handleSubmit, loading }) => {
  return (
    // Form for submitting city name
    <form onSubmit={handleSubmit} className="d-flex">
      {/* Input field for entering city name */}
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
        style={{
          marginTop: loading ? "150px" : "100px", // Adjust margin top based on loading state
          marginRight: "5px",
          border: "none",
          borderRadius: "20px",
          padding: "10px",
          width: "500px",
          textAlign: "center",
        }}
      />
      {/* Button for submitting the form */}
      <button
        style={{
          padding: "0px 15px",
          marginTop: loading ? "150px" : "100px", // Adjust margin top based on loading state
          backgroundColor: "white",
          border: "none",
          borderRadius: "50%",
        }}
        type="submit"
      >
        {/* Search icon */}
        <GoSearch />
      </button>
    </form>
  );
};

export default InputForm;
