from setuptools import setup, find_packages

with open("requirements.txt") as f:
    install_requires = f.read().strip().split("\n")

# get version from __version__ variable in erpnext_kleingartenverein/__init__.py
from erpnext_kleingartenverein import __version__ as version

setup(
    name="erpnext_kleingartenverein",
    version=version,
    description="Club management for a 'Kleingartenverein'",
    author="universalappfactory",
    author_email="info@universalappfactory.de",
    packages=find_packages(),
    zip_safe=False,
    include_package_data=True,
    install_requires=install_requires,
)
