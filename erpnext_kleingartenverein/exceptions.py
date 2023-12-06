class BadRequestError(Exception):
	http_status_code = 417

class UploadBankstatementError(Exception):
	pass