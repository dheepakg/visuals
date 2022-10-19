

## Tax Calculation New Regime

Refer this [page](https://incometaxindia.gov.in/pages/tools/income-tax-calculator.aspx) to get the tax amount against your income.


### fetch-data

This folder is used to fetch or synthesize data.

**./ [Taxation-rate.py](fetch-data/taxation-rate.py)**

This contains the calculation to fetch tax amount for given taxable income.

**./ [Taxation-rate.csv](fetch-data/taxation-rate.csv)**

| | | |
|-|-|-|
|**Column** |**Description** | **Calculations if any** |
|taxable_income_in_Rs |Gross Income (in INR) | Input Value|
|tax_in_% |Tax Rate (in %) |$(taxAmount/Income)*100$|
|taxAmount_in_Rs |Tax Amount (in INR) |Refer [Python file](/taxation-rate/fetch-data/tax-data-builder.py) |


### Charting

This folder is used to build chart based on the [synthesized data](/taxation-rate/fetch-data/).
