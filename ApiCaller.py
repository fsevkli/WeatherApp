import requests

# This function allow the User to call a api of their
# chosing and returns the requested json if the status
# code not 200 it will return False
# Example: caller = APICaller("http://url.com/api")
#          json = caller.Call()
################################

class Caller:
        def __init__(self, api):
             self.api = api
             status_code = 200

        def Call(self):
                  
            r = requests.get(self.api)
            if r.status_code == 200:
                return r.json()
            return False
            

