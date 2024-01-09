import frappe
import csv


def create_bank_transactions(csv_file, company, bank_account, currency):
    result = []
    with open(csv_file, newline="") as csvfile:
        reader = csv.reader(csvfile, delimiter=",", quotechar='"')

        for row in reader:
            transaction = frappe.get_doc(
                {
                    "doctype": "Bank Transaction",
                    "bank_account": bank_account,
                    "company": company,
                    "currency": currency,
                    "description": row[3],
                    "reference_number": row[4],
                    "deposit": row[1],
                    "withdrawal": row[2],
                }
            )
            transaction.insert()
            result.append(transaction)

    return result
