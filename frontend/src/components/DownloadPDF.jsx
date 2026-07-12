import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ResumePDF from "../pdf/ResumePDF";

const DownloadPDF = ({ resumeData }) => {
  return (
    <PDFDownloadLink
      document={<ResumePDF data={resumeData} />}
      fileName={`${resumeData?.name || "Resume"}.pdf`}
    >
      {({ loading }) =>
        loading ? (
          <button className="btnSecondary">
            Generating PDF...
          </button>
        ) : (
          <button className="btnSecondary">
            📄 Download Professional Resume
          </button>
        )
      }
    </PDFDownloadLink>
  );
};

export default DownloadPDF;