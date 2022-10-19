gross_income_var = 1092000
GROSS_INCOME = 1092000
import csv
# import pandas as pd


def tax_rate_calculator(GROSS_INCOME, SLAB_RATE_PERCENT=(0, 5, 10, 15, 20, 25, 30)):
    # SLAB_RATE_PERCENT = (0, 5, 10, 15, 20, 25, 30)
    val_list = [
        0,
    ]
    gross_income_var = GROSS_INCOME
    for i in range(0, len(SLAB_RATE_PERCENT)):
        if gross_income_var >= 250000 and len(val_list) < len(SLAB_RATE_PERCENT):
            gross_income_var = gross_income_var - 250000
            val_list.append(gross_income_var)

    tax_slab_amount = []
    tax_before_cess = 0

    for index in range(0, len(val_list)):
        if index < len(val_list) - 1:
            tax_slab_amount.append(250000 * SLAB_RATE_PERCENT[index] / 100)
        elif index == len(val_list) - 1:
            tax_slab_amount.append(val_list[index] * SLAB_RATE_PERCENT[index] / 100)

    tax_before_cess = sum(tax_slab_amount)
    tax_slab_amount.append(tax_before_cess * (4 / 100))

    tax = 0
    tax = sum(tax_slab_amount)
    tax_rate = round((100 * tax) / GROSS_INCOME, 2)

    return [GROSS_INCOME, str(tax_rate), int(tax) ]


with open("result.csv", "w", newline="") as csv_file:
    writer = csv.writer(csv_file)
    for i in range(250_000, 3_000_001, 25_000):
        writer.writerow(tax_rate_calculator(i))

