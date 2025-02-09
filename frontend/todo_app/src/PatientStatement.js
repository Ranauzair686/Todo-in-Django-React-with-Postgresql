import React, { useState } from "react";
import { Button, Form, Container, Row, Col, Table } from "react-bootstrap";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "bootstrap/dist/css/bootstrap.min.css";

const PatientStatement = () => {
  const [patientId, setPatientId] = useState("");
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.42:8000/api/manage-patients/patients/${patientId}/statements/`
      );
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const generatePDF = () => {
    const input = document.getElementById("pdf-content");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("patient_statement.pdf");
    });
  };

  return (
    <Container>
      <h2 className="text-center my-4">Generate Patient Statement</h2>
      <Row className="mb-3">
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Enter Patient ID"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
          />
        </Col>
        <Col>
          <Button onClick={fetchData}>Fetch Data</Button>
        </Col>
      </Row>
      {data && (
        <div id="pdf-content" className="p-3 border bg-white">
          {/* HEADER */}
          <div className="text-center border-bottom pb-2 mb-3">
            <h4>WNY MEDICAL, PC</h4>
            <p>PO BOX 8000 DEPT 710, BUFFALO, NY 14267-8000</p>
          </div>

          {/* PATIENT DETAILS */}
          <Row>
            <Col md={6}>
              <h5>Patient Details</h5>
              <p><strong>Account No:</strong> {data.patient.account}</p>
              <p><strong>Name:</strong> {data.patient.name}</p>
              <p><strong>Address:</strong> {data.patient.address}</p>
              <p><strong>City:</strong> {data.patient.city}</p>
              <p><strong>State:</strong> {data.patient.state}</p>
              <p><strong>ZIP Code:</strong> {data.patient.zip_code}</p>
            </Col>
            <Col md={6}>
              <h5>Billing Info</h5>
              <p><strong>Bill Date:</strong> {data.statements[0].date}</p>
              <p><strong>Amount Due:</strong> ${data.statements[0].amount}</p>
              <p><strong>IMB Encode:</strong> {data.patient.imb_encode}</p>
            </Col>
          </Row>

          {/* STATEMENTS TABLE */}
          <Table bordered className="mt-4">
            <thead>
              <tr>
                <th>Date</th>
                <th>Details</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.statements.map((stmt) => (
                <tr key={stmt.id}>
                  <td>{stmt.date}</td>
                  <td>{stmt.statement_data}</td>
                  <td>${stmt.amount}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* FOOTER */}
          <div className="text-center border-top pt-2 mt-3">
            <p>Thank you for choosing WNY Medical, PC</p>
          </div>
        </div>
      )}

      {data && (
        <Button variant="success" className="mt-3" onClick={generatePDF}>
          Download PDF
        </Button>
      )}
    </Container>
  );
};

export default PatientStatement;
