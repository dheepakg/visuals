from nsepython import index_history
import pandas as pd

symbol = "NIFTY 50"
start_date = "01-Jan-2011"
end_date = "31-Dec-2012"

pd_history = index_history(symbol,start_date,end_date)

print(pd_history)

pd_history['HistoricalDate'] = pd.to_datetime(pd_history['HistoricalDate'])

pd_history['HistoricalDate_year'] = pd.DatetimeIndex(pd_history['HistoricalDate']).year
pd_history['HistoricalDate_month'] = pd.DatetimeIndex(pd_history['HistoricalDate']).month
pd_history['HistoricalDate_day'] = pd.DatetimeIndex(pd_history['HistoricalDate']).day
print(pd_history)

pd_end_of_month = pd_history.groupby(['HistoricalDate_year',	'HistoricalDate_month']).agg({ 'HistoricalDate_day':'max'}).reset_index()
pd_history = pd_history.drop(columns=['HistoricalDate_year', 'HistoricalDate_month','HistoricalDate_day'])

pd_end_of_month['year'] = pd_end_of_month['HistoricalDate_year'].astype(str)
pd_end_of_month['month'] = pd_end_of_month['HistoricalDate_month'].astype(str)
pd_end_of_month['day'] = pd_end_of_month['HistoricalDate_day'].astype(str)

pd_end_of_month['end_date_of_month'] = pd.to_datetime(pd_end_of_month[['year', 'month', 'day']])

pd_end_of_month = pd_end_of_month.drop(columns=['HistoricalDate_year', 'HistoricalDate_month','HistoricalDate_day','month','day'])

print(pd_end_of_month)


a = pd_end_of_month['end_date_of_month']
end_of_months = a.dt.strftime('%Y-%m-%d').tolist()

print(end_of_months)


pd_history.loc[pd_history['HistoricalDate'].isin(end_of_months)]


pd_year_2011 = pd_history[['INDEX_NAME','HistoricalDate', 'CLOSE']].loc[pd_history['HistoricalDate'].isin(end_of_months)]

print(pd_year_2011)

csv_file = './nifty-over-years/2011_v1.csv'

pd_year_2011.reset_index().drop(columns=['index','INDEX_NAME']).to_csv(csv_file, sep=',', index=False)

