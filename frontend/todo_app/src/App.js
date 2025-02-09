import React, { useState } from "react";
import PatientStatement from "./PatientStatement";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [patientId, setPatientId] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div className="container mt-4">
      <h2 className="text-center text-primary mb-4">Generate Patient Statement PDF</h2>

      <div className="d-flex justify-content-center">
        <input
          type="number"
          className="form-control w-25"
          placeholder="Enter Patient ID"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
        />
        <button
          className="btn btn-primary ms-2"
          onClick={() => setSelectedId(patientId)}
          disabled={!patientId}
        >
          Generate PDF
        </button>
      </div>

      {selectedId && <PatientStatement patientId={selectedId} />}
    </div>
  );
};

export default App;
