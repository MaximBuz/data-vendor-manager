from rest_framework import serializers

"""
This is a custom serializer which allows for the frontend
to specify how deeply nested it wants to have the JSON response
Default depth: 0
(send /?depth=Number in URL)
"""
class DynamicDepthSerializer(serializers.ModelSerializer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.Meta.depth = self.context.get('depth', 0)