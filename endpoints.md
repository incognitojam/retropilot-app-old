# openpilot tools

deviceBootlogs = api.get('v1/devices/' + dongleId + '/bootlogs')
deviceCrashlogs = api.get('v1/devices/' + dongleId + '/crashlogs')
routeFiles = api.get('v1/route/' + routeId + '/files')


# uploader

api.get('v1.4/' + dongleId + '/upload_url/')  # ?path=2019-06-06--11-30-31--9/fcamera.hevc

# TODO: what is upload url returned?


# registration

api.post('v2/pilotauth/')


# offroad home

device = api.get('v1.1/devices/' + dongleId + '/')  # paired, prime info
drivestats = api.get('v1.1/devices/' + dongleId + '/stats')
