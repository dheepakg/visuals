from nsepython import index_history


symbol = "NIFTY 50"
start_date = "01-Jan-2011"
end_date = "31-Dec-2011"
# print(index_history(symbol, start_date, end_date))


pd_history = index_history(symbol, start_date, end_date)
print("Value extracted from site")

end_of_months = [
    "31 Jan 2011",
    "28 Feb 2011",
    "31 Mar 2011",
    "29 Apr 2011",
    "31 May 2011",
    "30 Jun 2011",
    "29 Jul 2011",
    "30 Aug 2011",
    "30 Sep 2011",
    "31 Oct 2011",
    "30 Nov 2011",
    "30 Dec 2011",
]

pd_history.loc[pd_history["HistoricalDate"].isin(end_of_months)]
print("Filter applied")

pd_year_2011 = pd_history[[ "HistoricalDate", "CLOSE"]].loc[
    pd_history["HistoricalDate"].isin(end_of_months)
]

print("About to print")
print(pd_year_2011)
print("about to write")
csv_file = './nifty-over-years/2011.csv'
pd_year_2011.to_csv(csv_file, sep=',', index=False)
