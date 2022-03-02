gross_income = 2092000
slab_rate_pcnt = (0, 5, 10, 15, 20, 25, 30)
val_list = [
    0,
]

for i in range(0, len(slab_rate_pcnt)):
    if gross_income >= 250000 and len(val_list) < len(slab_rate_pcnt):
        gross_income = gross_income - 250000
        val_list.append(gross_income)
print(val_list, slab_rate_pcnt)


tax_slab_amount = []
tax_before_cess = 0
tax_after_cess = 0


for index in range(0, len(val_list)):
    if index < len(val_list) - 1:
        tax_slab_amount.append(250000 * slab_rate_pcnt[index] / 100)
    elif index == len(val_list) - 1:
        tax_slab_amount.append(val_list[index] * slab_rate_pcnt[index] / 100)

print(tax_slab_amount)

for _ in tax_slab_amount:
    tax_before_cess = tax_before_cess + _

tax_slab_amount.append(tax_before_cess * (4 / 100))

print(tax_slab_amount, tax_before_cess)

tax = 0

for i in tax_slab_amount:
    tax = tax + i

print(tax)

