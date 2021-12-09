from __future__ import print_function
import time
from os import system
from activity import *
import datetime
import sys
if sys.platform in ['Windows', 'win32', 'cygwin']:
    import win32gui
    import uiautomation as auto
elif sys.platform in ['Mac', 'darwin', 'os2', 'os2emx']:
    from AppKit import NSWorkspace
    from Foundation import *
elif sys.platform in ['linux', 'linux2']:
        import linux as l

from crud import engine
from models import UsageEntry
from sqlalchemy.orm import sessionmaker
Session = sessionmaker(bind=engine)
s = Session()

from aggregated_view import fetch_aggregated_data

active_window_name = ""
activity_name = ""
start_time = datetime.datetime.now()
first_time = True

user = input("Please type in your email adress: ")

def get_active_window():
    _active_window_name = None
    if sys.platform in ['Windows', 'win32', 'cygwin']:
        window = win32gui.GetForegroundWindow()
        _active_window_name = win32gui.GetWindowText(window)
    elif sys.platform in ['Mac', 'darwin', 'os2', 'os2emx']:
        _active_window_name = (NSWorkspace.sharedWorkspace()
                               .activeApplication()['NSApplicationName'])
    else:
        print("sys.platform={platform} is not supported."
              .format(platform=sys.platform))
        print(sys.version)
    return _active_window_name


""" def get_chrome_url():
    if sys.platform in ['Windows', 'win32', 'cygwin']:
        window = win32gui.GetForegroundWindow()
        chromeControl = auto.ControlFromHandle(window)
        edit = chromeControl.EditControl()
        return 'https://' + edit.GetValuePattern().Value
    elif sys.platform in ['Mac', 'darwin', 'os2', 'os2emx']:
        textOfMyScript = "tell app "google chrome" to get the url of the active tab of window 1"
        s = NSAppleScript.initWithSource_(
            NSAppleScript.alloc(), textOfMyScript)
        results, err = s.executeAndReturnError_(None)
        return results.stringValue()
    else:
        print("sys.platform={platform} is not supported."
              .format(platform=sys.platform))
        print(sys.version)
    return _active_window_name """


try:
    while True:
        previous_site = ""
        if sys.platform not in ['linux', 'linux2']:
            new_window_name = get_active_window()
        if sys.platform in ['linux', 'linux2']:
            new_window_name = l.get_active_window_x()
        
        if active_window_name != new_window_name: 
            print(active_window_name)
            activity_name = active_window_name

            if not first_time: 
                end_time = datetime.datetime.now()
                time_entry = TimeEntry(start_time, end_time)
                print(time_entry.serialize())
                # Hier in Datenbank schreiben!
                if activity_name == "Google Chrome": # Hier nach BBG prüfen
                    usage_entry = UsageEntry(
                        user=user,
                        app=activity_name,
                        start_time=start_time,
                        end_time=end_time
                    )
                    s.add(usage_entry)
                start_time = datetime.datetime.now()
            first_time = False
            active_window_name = new_window_name

        time.sleep(1)
    
except KeyboardInterrupt:
    s.commit()
    s.close()
    print(" done")
    print("Here is your data: ")
    fetch_aggregated_data(user)
