rm repo.zip
rm -rf repo
git clone https://github.com/Duelsik/beatsaber-request-ui repo
cd repo
git fetch --all --tags
git checkout tags/0.0.9
zip -r ../repo.zip .
