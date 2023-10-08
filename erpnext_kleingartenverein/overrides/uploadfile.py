import frappe
from frappe.core.doctype.file.file import File

class UploadFile(File):
    # def before_insert(self):
    #     self.set_folder_name()
    #     self.set_file_name()
    #     self.validate_attachment_limit()

    #     if self.is_folder:
    #         return

    #     ignore_existing_file_check = False
    #     if self.flags.ignore_existing_file_check:
    #         ignore_existing_file_check = self.flags.ignore_existing_file_check

    #     if self.is_remote_file:
    #         self.validate_remote_file()
    #     else:
    #         self.save_file(content=self.get_content(), ignore_existing_file_check=ignore_existing_file_check)
    #         self.flags.new_file = True
    #         frappe.local.rollback_observers.append(self)

    def save_file(
		self,
		content: bytes | str | None = None,
		decode=False,
		ignore_existing_file_check=False,
		overwrite=False,
	):
        ignore_existing_file_check = False
        if self.flags.ignore_existing_file_check:
            ignore_existing_file_check = self.flags.ignore_existing_file_check

        super(UploadFile, self).save_file(content, decode,ignore_existing_file_check=ignore_existing_file_check,overwrite=overwrite)