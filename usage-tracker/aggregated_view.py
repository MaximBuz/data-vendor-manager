import sqlalchemy as db
from crud import engine

connection = engine.connect()
metadata = db.MetaData()
usage = db.Table("aggregated usage", metadata, autoload=True, autoload_with=engine)

def fetch_aggregated_data(user):
    query = db.select([usage]).where(usage.columns.user == user)
    ResultProxy = connection.execute(query)
    ResultSet = ResultProxy.fetchall()
    for row in ResultSet:
        print(row)