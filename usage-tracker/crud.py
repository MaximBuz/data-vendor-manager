from sqlalchemy import create_engine
from config import DATABASE_URI

engine = create_engine(DATABASE_URI)

def recreate_database(Base):
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)