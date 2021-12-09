from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, DateTime
from crud import *

Base = declarative_base()

class UsageEntry(Base):
    __tablename__ = 'usage'
    id = Column(Integer, primary_key=True)
    user = Column(String)
    app = Column(String)
    start_time = Column(DateTime)
    end_time = Column(DateTime)
    
    def __repr__(self):
        return "<UsageEntry(user='{}', app='{}', start_time={}, end_time={})>"\
                .format(self.user, self.app, self.start_time, self.end_time)
                
# recreate_database(Base)