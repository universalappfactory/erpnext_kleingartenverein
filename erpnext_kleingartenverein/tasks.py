
from erpnext_kleingartenverein.utils.tenant_search import TenantSearch

def update_tenant_index():
    ts = TenantSearch(index_name="tenants")
    ts.build()

def hourly():
    update_tenant_index()