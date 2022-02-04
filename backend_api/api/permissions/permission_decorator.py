from functools import wraps
from rest_framework.response import Response
from rest_framework import status

actions = {
  "GET": "view",
  "POST": "add",
  "PATCH": "change",
  "DELETE": "delete"
}

def test_permissions(request, modelnames):
  user = request.user
  
  for model in modelnames:
    if not user.has_perm("api." + actions[request.method] + "_" + model):
      return False
  return True

def user_has_permissions(modelnames):
    """
    Decorator for views that checks that the user has the permissions 
    for interacting with the passed models, based on the HTTP method,
    responding with 403 Forbidden status if not.
    
    Allowed methods are: GET, POST, PATCH, DELETE
    Takes modelnames as a list!
    """

    def decorator(view_func):
        @wraps(view_func)
        def _wrapped_view(request, *args, **kwargs):
            if test_permissions(request, modelnames):
                return view_func(request, *args, **kwargs)
            return Response(status=status.HTTP_403_FORBIDDEN)
        return _wrapped_view
    return decorator

