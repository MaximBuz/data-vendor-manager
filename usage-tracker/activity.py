from dateutil import parser


class TimeEntry:
    def __init__(self, start_time, end_time):
        self.start_time = start_time
        self.end_time = end_time
        self.total_time = end_time - start_time

    def serialize(self):
        return {
            'start_time' : str(self.start_time),
            'end_time' : str(self.end_time)
        }