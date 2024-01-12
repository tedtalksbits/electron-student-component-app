# 1. create a release folder in /release using package.json version. 
# 2. create .icon-ico folder in /release/$version
# 3. create .icon.ico from build/icons/icon.ico in /release/$version/.icon-ico
version=$(node -p "require('./package.json').version")

echo "Creating a release folder for version $version"

mkdir -p release/$version/.icon-ico

echo "Copying icon.ico to release/$version/.icon-ico"

cp build/icons/icon.ico release/$version/.icon-ico

echo "Done!"

exit 0
