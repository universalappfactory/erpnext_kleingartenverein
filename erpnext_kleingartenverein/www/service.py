from erpnext_kleingartenverein.www.utils import add_default_context_data, ensure_login

no_cache = True

def get_context(context):
    add_default_context_data(context)
