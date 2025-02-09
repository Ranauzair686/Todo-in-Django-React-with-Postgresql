import React, { useState, useEffect } from "react";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";

// Styles
const styles = StyleSheet.create({
  page: { padding: 20, fontSize: 12, fontFamily: "Helvetica" },
  header: { textAlign: "center", fontSize: 16, marginBottom: 10, fontWeight: "bold", color: "#D00" },
  section: { marginBottom: 10 },
  boldText: { fontWeight: "bold" },
  table: { width: "100%", borderWidth: 1, borderColor: "#000", marginTop: 10 },
  tableRow: { flexDirection: "row" },
  tableCellHeader: { flex: 1, padding: 5, backgroundColor: "#ddd", borderRightWidth: 1, borderBottomWidth: 1 },
  tableCell: { flex: 1, padding: 5, borderRightWidth: 1, borderBottomWidth: 1 },
  rightText: { textAlign: "right" },
  blueText: { color: "blue", fontWeight: "bold" }
});

// PDF Component
const PatientStatementPDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <Text style={styles.header}>WNY MEDICAL, PC</Text>
      <Text style={styles.section}>101 Barndsdale Avenue, West Seneca, NY 14224</Text>

      {/* Billing Info */}
      <View style={[styles.section, { borderWidth: 1, padding: 10 }]}>
        <Text><Text style={styles.boldText}>Bill Date:</Text> {data.patient.billing_date || "N/A"}</Text>
        <Text><Text style={styles.boldText}>Account No:</Text> {data.patient.account_no}</Text>
        <Text><Text style={[styles.boldText, styles.blueText]}>Amount Due: ${data.patient.amount_due}</Text></Text>
      </View>

      {/* Statement Table */}
      <Text style={{ textAlign: "center", marginBottom: 5 }}>Statement Details</Text>
      <View style={styles.table}>
        {/* Table Header */}
        <View style={styles.tableRow}>
          <Text style={styles.tableCellHeader}>Date</Text>
          <Text style={styles.tableCellHeader}>Service</Text>
          <Text style={styles.tableCellHeader}>Charge</Text>
          <Text style={styles.tableCellHeader}>Payment</Text>
          <Text style={styles.tableCellHeader}>Adjustment</Text>
          <Text style={styles.tableCellHeader}>Due</Text>
        </View>

        {/* Table Rows */}
        {data.statements.map((statement, index) => (
          <View style={styles.tableRow} key={index}>
            <Text style={styles.tableCell}>{statement.date}</Text>
            <Text style={styles.tableCell}>{statement.statement_data}</Text>
            <Text style={styles.tableCell}>${statement.amount}</Text>
            <Text style={styles.tableCell}>$0.00</Text>
            <Text style={styles.tableCell}>$0.00</Text>
            <Text style={[styles.tableCell, styles.boldText]}>${statement.amount}</Text>
          </View>
        ))}
      </View>

      {/* Total Amount */}
      <View style={[styles.section, { flexDirection: "row", justifyContent: "space-between", marginTop: 10 }]}>
        <Text style={styles.boldText}>Total Due:</Text>
        <Text style={[styles.boldText, styles.blueText]}>${data.patient.amount_due}</Text>
      </View>

      {/* Footer Note */}
      <Text style={{ textAlign: "center", fontSize: 10, marginTop: 10 }}>
        **This bill is applied against your deductible. You are responsible to pay.**
      </Text>
    </Page>
  </Document>
);

// Main Component
const PatientStatement = ({ patientId }) => {
  const [data, setData] = useState(null);
  const apiUrl = `http://192.168.1.42:8000/api/manage-patients/patients/${patientId}/statements/`;

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [apiUrl]);

  if (!data) return <p>Loading...</p>;

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <PDFDownloadLink document={<PatientStatementPDF data={data} />} fileName={`patient_statement_${patientId}.pdf`}>
        {({ loading }) => (
          <button
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              background: "#007BFF",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            {loading ? "Generating PDF..." : "Download PDF"}
          </button>
        )}
      </PDFDownloadLink>
    </div>
  );
};

export default PatientStatement;
