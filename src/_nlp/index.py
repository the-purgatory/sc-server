import sys
import json
json_string = json.dumps({"output": sys.argv[1]})
print(json_string)