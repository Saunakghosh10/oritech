import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica'
  },
  header: {
    marginBottom: 20
  },
  title: {
    fontSize: 24,
    marginBottom: 10
  },
  info: {
    fontSize: 12,
    marginBottom: 5
  },
  table: {
    display: 'table',
    width: '100%',
    marginTop: 20,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf'
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#bfbfbf',
    minHeight: 30,
    alignItems: 'center'
  },
  tableHeader: {
    backgroundColor: '#f3f4f6'
  },
  tableCell: {
    flex: 1,
    padding: 8,
    fontSize: 10
  },
  total: {
    marginTop: 20,
    textAlign: 'right',
    fontSize: 14,
    fontWeight: 'bold'
  }
});

const InvoicePDF = ({ invoice }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Invoice {invoice.id}</Text>
        <Text style={styles.info}>Customer: {invoice.customerName}</Text>
        <Text style={styles.info}>Date: {invoice.createdAt}</Text>
        <Text style={styles.info}>Due Date: {invoice.dueDate}</Text>
      </View>

      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={styles.tableCell}>Description</Text>
          <Text style={styles.tableCell}>Amount</Text>
        </View>
        {invoice.items.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{item.description}</Text>
            <Text style={styles.tableCell}>₹{item.amount.toLocaleString()}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.total}>
        Total Amount: ₹{invoice.amount.toLocaleString()}
      </Text>
    </Page>
  </Document>
);

export default InvoicePDF; 