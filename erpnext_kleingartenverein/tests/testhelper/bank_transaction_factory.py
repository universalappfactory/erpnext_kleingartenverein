import frappe
import csv
from datetime import datetime

def create_bank_transactions(csv_file, company, bank_account, currency):
    result = []
    with open(csv_file, newline="") as csvfile:
        reader = csv.reader(csvfile, delimiter=",", quotechar='"')

        skip = True
        for row in reader:
            if skip:
                skip = False
                continue

            # row[0]
            date = datetime.strptime(row[0],"%d.%m.%Y").strftime("%Y-%m-%d")
            description = f"{row[3]}-{row[4]}"
            transaction = frappe.get_doc(
                {
                    "doctype": "Bank Transaction",
                    "date": date,
                    "bank_account": bank_account,
                    "company": company,
                    "currency": currency,
                    "description": description,
                    "reference_number": row[4],
                    "deposit": float(row[1]),
                    "withdrawal": float(row[2]),
                }
            )
            transaction.insert()
            result.append(transaction)

    return result
