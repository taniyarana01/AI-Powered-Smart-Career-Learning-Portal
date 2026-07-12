import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 35,
    fontSize: 11,
    fontFamily: "Helvetica",
    color: "#333",
    lineHeight: 1.6,
  },

  header: {
    textAlign: "center",
    marginBottom: 15,
    borderBottom: "2 solid #2563eb",
    paddingBottom: 10,
  },

  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e3a8a",
  },

  role: {
    fontSize: 13,
    color: "#666",
    marginTop: 4,
  },

  contact: {
    marginTop: 8,
    fontSize: 10,
    color: "#555",
  },

  section: {
    marginTop: 15,
  },

  heading: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2563eb",
    marginBottom: 5,
    borderBottom: "1 solid #ddd",
    paddingBottom: 3,
  },

  text: {
    fontSize: 11,
    color: "#444",
  },
});

const ResumePDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.name || "Your Name"}</Text>

        <Text style={styles.role}>
          MERN Stack Developer
        </Text>

        <Text style={styles.contact}>
          {data.email} | {data.phone}
        </Text>

        <Text style={styles.contact}>
          {data.address}
        </Text>
      </View>

      {/* Summary */}
      <View style={styles.section}>
        <Text style={styles.heading}>Professional Summary</Text>
        <Text style={styles.text}>{data.summary}</Text>
      </View>

      {/* Skills */}
      <View style={styles.section}>
        <Text style={styles.heading}>Skills</Text>
        <Text style={styles.text}>{data.skills}</Text>
      </View>

      {/* Education */}
      <View style={styles.section}>
        <Text style={styles.heading}>Education</Text>
        <Text style={styles.text}>{data.education}</Text>
      </View>

      {/* Experience */}
      <View style={styles.section}>
        <Text style={styles.heading}>Experience</Text>
        <Text style={styles.text}>{data.experience}</Text>
      </View>

      {/* Projects */}
      <View style={styles.section}>
        <Text style={styles.heading}>Projects</Text>
        <Text style={styles.text}>{data.projects}</Text>
      </View>

      {/* Certifications */}
      <View style={styles.section}>
        <Text style={styles.heading}>Certifications</Text>
        <Text style={styles.text}>{data.certifications}</Text>
      </View>

      {/* Languages */}
      <View style={styles.section}>
        <Text style={styles.heading}>Languages</Text>
        <Text style={styles.text}>{data.languages}</Text>
      </View>

      {/* Links */}
      <View style={styles.section}>
        <Text style={styles.heading}>Links</Text>

        <Text style={styles.text}>
          LinkedIn: {data.linkedin}
        </Text>

        <Text style={styles.text}>
          GitHub: {data.github}
        </Text>

        <Text style={styles.text}>
          Portfolio: {data.portfolio}
        </Text>
      </View>

    </Page>
  </Document>
);

export default ResumePDF;