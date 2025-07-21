import argparse
import pandas as pd
import json

# Where to get data and info about the file (these change based on the data provided in different fiscal years)
starting_row_release_reason = 39
ending_row_release_reason = 88
fiscal_year = 25
file_path = f"../data/FY25_detentionStats07172025.xlsx"

# Create a parser for the command line arguments
parser = argparse.ArgumentParser(description='Process command line arguments.')
parser.add_argument('-debug', action='store_true', help='Enable debug mode')
args = parser.parse_args()

excel_data = pd.read_excel(file_path, sheet_name=f"Detention FY{fiscal_year}", header=None)

# Map month abbreviations to YYYY-MM-01 format
starting_year = 2000 + fiscal_year - 1
ending_year = starting_year + 1
month_map = {
    "Oct": f"{starting_year}-10-01",
    "Nov": f"{starting_year}-11-01",
    "Dec": f"{starting_year}-12-01",
    "Jan": f"{ending_year}-01-01",
    "Feb": f"{ending_year}-02-01",
    "Mar": f"{ending_year}-03-01",
    "Apr": f"{ending_year}-04-01",
    "May": f"{ending_year}-05-01",
    "Jun": f"{ending_year}-06-01",
    "Jul": f"{ending_year}-07-01",
    "Aug": f"{ending_year}-08-01",
    "Sep": f"{ending_year}-09-01"
}

# Extract header row with month names
header_row = excel_data.iloc[starting_row_release_reason - 3]
month_columns = {
    month_map[val]: idx
    for idx, val in enumerate(header_row)
    if val in month_map
}

# Helper to safely convert cell to int
def safe_int(val):
    return int(val) if pd.notna(val) else 0

# Collect data per date
data_by_date = {date: {} for date in month_columns}

if args.debug:
    print(data_by_date)

# pandas is 0 indexed, so we need to subtract one from the starting row
i = starting_row_release_reason - 1
while i < ending_row_release_reason:
    row = excel_data.iloc[i]
    release_reason = row[0]
    if pd.isna(release_reason):
        i += 1
        continue

    convicted_row = excel_data.iloc[i + 1]
    pending_row = excel_data.iloc[i + 2]
    other_row = excel_data.iloc[i + 3]

    for date, col in month_columns.items():
        if release_reason not in data_by_date[date]:
            data_by_date[date][release_reason] = {
                "convicted_criminal": safe_int(convicted_row[col]),
                "pending_charges": safe_int(pending_row[col]),
                "other": safe_int(other_row[col])
            }

    i += 4

# Output the raw JSON.  Will need to change this to open the JSON and add to it based on the updated data.
final_json = {
    "book_outs": [
        {
            "date": date,
            **{
                reason.lower().replace(" ", "_"): values
                for reason, values in reasons.items()
            },
        }
        for date, reasons in sorted(data_by_date.items())
    ]
}

# Save to file
with open("updated_book_outs.json", "w") as f:
    json.dump(final_json, f, indent=2)
