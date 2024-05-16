import base64
from glob import glob

avatars = { "avatars": [] }

for image in sorted(list(glob("*.png")), key=lambda name: (len(name), name)):
    print(f"avatar(require('./{image}'), '{image}'),")
    with open(image, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
    avatars[image] = { "base64": encoded_string }

import json

with open("surprises.json", "w") as avatars_file:
    json.dump(avatars, avatars_file, indent=2)

